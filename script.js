const DIMENSIONS = [
  { key: "CONTROL", label: "控制力" },
  { key: "LOGIC", label: "逻辑力" },
  { key: "EXEC", label: "执行力" },
  { key: "SOCIAL", label: "社交能量" },
  { key: "CREATE", label: "创造力" },
  { key: "RELAX", label: "松弛指数" },
];

const MATCH_WEIGHTS = {
  dimensions: 0.34,
  axes: 0.34,
  choices: 0,
  votes: 0.32,
};

const PERSONALITY_AXES = [
  {
    key: "ORDER",
    label: "秩序倾向",
    get: (s) => average(s.CONTROL, s.EXEC) - average(s.CREATE, s.RELAX),
  },
  {
    key: "ANALYSIS",
    label: "分析倾向",
    get: (s) => s.LOGIC - s.SOCIAL,
  },
  {
    key: "ACTION",
    label: "行动倾向",
    get: (s) => s.EXEC - s.RELAX,
  },
  {
    key: "EXPRESSION",
    label: "表达倾向",
    get: (s) => average(s.SOCIAL, s.CREATE) - average(s.LOGIC, s.CONTROL),
  },
  {
    key: "NOVELTY",
    label: "创新倾向",
    get: (s) => s.CREATE - average(s.CONTROL, s.EXEC),
  },
];

const QUESTIONS = [
  q("早八闹钟响了，你的第一反应？", [
    ["立刻起，别给机会", { EXEC: 3, CONTROL: 2 }],
    ["再眯五分钟回血", { RELAX: 3, CREATE: 1 }],
    ["看眼课表再决定", { LOGIC: 3, CONTROL: 1 }],
    ["问室友走不走", { SOCIAL: 3, RELAX: 1 }],
  ]),
  q("小组作业刚建群，你通常会？", [
    ["先潜水观察阵容", { LOGIC: 2, RELAX: 3 }],
    ["发个消息暖场", { SOCIAL: 3, CREATE: 1 }],
    ["直接拉表格分工", { CONTROL: 3, EXEC: 2 }],
    ["先丢几个新点子", { CREATE: 3, SOCIAL: 1 }],
  ]),
  q("食堂窗口排长队，你会？", [
    ["果断换一家", { EXEC: 3, RELAX: 2 }],
    ["研究哪队走得快", { LOGIC: 3, CONTROL: 1 }],
    ["边排边和朋友聊", { SOCIAL: 3, RELAX: 2 }],
    ["稳住，就吃这口", { CONTROL: 3, EXEC: 1 }],
  ]),
  q("周末突然空出一天，你更想？", [
    ["临时约人出去玩", { SOCIAL: 3, CREATE: 2 }],
    ["宅着彻底充电", { RELAX: 4 }],
    ["完成一件拖很久的事", { EXEC: 3, CONTROL: 2 }],
    ["随便逛逛找灵感", { CREATE: 3, RELAX: 2 }],
  ]),
  q("群聊消息突然 99+，你会？", [
    ["直接问：结论是啥", { EXEC: 2, SOCIAL: 2 }],
    ["从头爬楼吃瓜", { LOGIC: 3, SOCIAL: 1 }],
    ["先看置顶和重点", { CONTROL: 3, LOGIC: 2 }],
    ["当作没看见", { RELAX: 4 }],
  ]),
  q("DDL 就在今晚，你现在才想起来？", [
    ["先做能交的版本", { EXEC: 4, CONTROL: 1 }],
    ["先盘一下最优解", { LOGIC: 3, EXEC: 2 }],
    ["找队友紧急联动", { SOCIAL: 3, EXEC: 2 }],
    ["灵感爆发，极限出片", { CREATE: 4, EXEC: 1 }],
  ]),
  q("朋友临时放你鸽子，你会？", [
    ["马上安排自己的局", { RELAX: 3, EXEC: 2 }],
    ["问清楚发生了什么", { LOGIC: 2, SOCIAL: 2 }],
    ["嘴上吐槽但没事", { SOCIAL: 3, RELAX: 2 }],
    ["下次提前确认好", { CONTROL: 3, LOGIC: 1 }],
  ]),
  q("选一门完全陌生的选修课，你更看重？", [
    ["老师给分稳不稳", { LOGIC: 3, CONTROL: 2 }],
    ["有没有朋友一起", { SOCIAL: 3, RELAX: 1 }],
    ["内容听着就有趣", { CREATE: 3, RELAX: 2 }],
    ["能不能学到真东西", { EXEC: 3, LOGIC: 2 }],
  ]),
  q("宿舍要一起大扫除，你通常？", [
    ["先分区域，速战速决", { CONTROL: 3, EXEC: 3 }],
    ["看到哪收拾到哪", { RELAX: 3, EXEC: 1 }],
    ["放歌聊天带气氛", { SOCIAL: 3, CREATE: 1 }],
    ["研究最省力的办法", { LOGIC: 3, CREATE: 1 }],
  ]),
  q("看到一个很火的新梗，你会？", [
    ["先围观，不急着跟", { LOGIC: 2, RELAX: 2 }],
    ["立刻发给朋友", { SOCIAL: 3, EXEC: 1 }],
    ["二创一下才好玩", { CREATE: 4, SOCIAL: 1 }],
    ["三分钟热度，划走", { RELAX: 3, EXEC: 1 }],
  ]),
  q("旅行前一天，你更像哪种人？", [
    ["攻略表格全配齐", { CONTROL: 4, LOGIC: 2 }],
    ["只定车票，其他随缘", { RELAX: 4, CREATE: 1 }],
    ["拉群问大家想去哪", { SOCIAL: 3, CONTROL: 1 }],
    ["专找小众隐藏玩法", { CREATE: 3, LOGIC: 2 }],
  ]),
  q("课堂上老师突然点你回答？", [
    ["先说起来再调整", { EXEC: 3, SOCIAL: 2 }],
    ["脑内快速组织逻辑", { LOGIC: 4, CONTROL: 1 }],
    ["用轻松方式化解", { SOCIAL: 3, RELAX: 2 }],
    ["给个不一样的角度", { CREATE: 3, LOGIC: 2 }],
  ]),
  q("社团活动现场有点乱，你会？", [
    ["先把关键流程稳住", { CONTROL: 4, EXEC: 2 }],
    ["哪里缺人就补哪里", { EXEC: 4, SOCIAL: 1 }],
    ["招呼大家别紧张", { SOCIAL: 3, RELAX: 2 }],
    ["临场加点新玩法", { CREATE: 3, RELAX: 1 }],
  ]),
  q("朋友说自己最近很焦虑，你会？", [
    ["陪着聊，先接住情绪", { SOCIAL: 4, RELAX: 1 }],
    ["一起分析问题在哪", { LOGIC: 3, SOCIAL: 2 }],
    ["帮他列个行动清单", { CONTROL: 3, EXEC: 2 }],
    ["拉他出去散散心", { RELAX: 3, CREATE: 1 }],
  ]),
  q("买一件稍贵的东西前，你会？", [
    ["做攻略比参数", { LOGIC: 4, CONTROL: 1 }],
    ["问朋友真实体验", { SOCIAL: 3, LOGIC: 1 }],
    ["喜欢就冲，快乐重要", { RELAX: 3, EXEC: 2 }],
    ["等等活动价再下手", { CONTROL: 3, RELAX: 1 }],
  ]),
  q("别人对你的方案提出质疑，你会？", [
    ["先听完再回应", { RELAX: 2, LOGIC: 2 }],
    ["拿事实把逻辑讲清", { LOGIC: 4, CONTROL: 1 }],
    ["马上改出更好版本", { EXEC: 3, CREATE: 2 }],
    ["拉大家一起讨论", { SOCIAL: 3, CREATE: 1 }],
  ]),
  q("你发朋友圈更像哪种状态？", [
    ["想到就发，随缘营业", { RELAX: 3, SOCIAL: 1 }],
    ["认真挑图和文案", { CREATE: 3, CONTROL: 2 }],
    ["记录值得纪念的事", { CONTROL: 2, SOCIAL: 2 }],
    ["很少发，默默围观", { LOGIC: 2, RELAX: 3 }],
  ]),
  q("一件事迟迟没有进展，你会？", [
    ["直接开干，边做边说", { EXEC: 4, CREATE: 1 }],
    ["找出真正卡点", { LOGIC: 4, CONTROL: 1 }],
    ["拉人一起推进", { SOCIAL: 3, EXEC: 2 }],
    ["先缓缓，换个状态", { RELAX: 4 }],
  ]),
  q("老师给了一个很自由的作业，你会？", [
    ["先确认边界和要求", { CONTROL: 3, LOGIC: 2 }],
    ["搞个别人没做过的", { CREATE: 4, EXEC: 1 }],
    ["找搭子一起整活", { SOCIAL: 3, CREATE: 2 }],
    ["选个简单稳妥的", { RELAX: 2, EXEC: 2 }],
  ]),
  q("陌生人很多的聚会里，你通常？", [
    ["主动认识新朋友", { SOCIAL: 4, EXEC: 1 }],
    ["和熟人待在一起", { RELAX: 3, SOCIAL: 1 }],
    ["先观察谁比较有趣", { LOGIC: 3, CREATE: 1 }],
    ["帮忙张罗现场", { CONTROL: 3, EXEC: 2 }],
  ]),
  q("学习一个新软件时，你会？", [
    ["跟着教程快速做一遍", { EXEC: 4, CONTROL: 1 }],
    ["先搞懂它怎么运作", { LOGIC: 4, CREATE: 1 }],
    ["边点边试，主打探索", { CREATE: 3, RELAX: 2 }],
    ["找会的人带一下", { SOCIAL: 3, EXEC: 1 }],
  ]),
  q("计划被临时打乱，你的反应？", [
    ["马上重新安排", { CONTROL: 4, EXEC: 2 }],
    ["问题不大，随机应变", { RELAX: 4, CREATE: 1 }],
    ["先确认对大家的影响", { SOCIAL: 3, CONTROL: 2 }],
    ["趁机换个更好的方案", { CREATE: 3, LOGIC: 2 }],
  ]),
  q("团队里出现两种意见，你会？", [
    ["分析利弊再选", { LOGIC: 4, CONTROL: 1 }],
    ["投票，少内耗", { CONTROL: 3, EXEC: 2 }],
    ["想办法融合一下", { CREATE: 3, SOCIAL: 2 }],
    ["先让双方都说舒服", { SOCIAL: 4, RELAX: 1 }],
  ]),
  q("连续忙了很久，你最需要？", [
    ["独处放空，暂停营业", { RELAX: 4 }],
    ["和朋友狠狠吐槽", { SOCIAL: 3, RELAX: 2 }],
    ["完成收尾再休息", { EXEC: 4, CONTROL: 1 }],
    ["换件新鲜的事做", { CREATE: 3, RELAX: 2 }],
  ]),
  q("看到别人做出很厉害的作品，你会？", [
    ["拆解它为什么厉害", { LOGIC: 4, CREATE: 1 }],
    ["收藏，改天也做一个", { CONTROL: 2, EXEC: 2 }],
    ["真诚夸夸并求交流", { SOCIAL: 4, CREATE: 1 }],
    ["被激发出一个新脑洞", { CREATE: 4, RELAX: 1 }],
  ]),
  q("你接手一个烂摊子时，通常？", [
    ["先救最急的部分", { EXEC: 4, CONTROL: 2 }],
    ["先搞清楚怎么烂的", { LOGIC: 4, CONTROL: 1 }],
    ["找齐人和资源", { SOCIAL: 3, EXEC: 2 }],
    ["干脆换个新解法", { CREATE: 4, RELAX: 1 }],
  ]),
  q("朋友临时喊你出门，你更可能？", [
    ["说走就走", { RELAX: 3, EXEC: 2 }],
    ["先问都有谁", { SOCIAL: 3, LOGIC: 1 }],
    ["看完今天安排再说", { CONTROL: 3, LOGIC: 2 }],
    ["顺便提个有趣去处", { CREATE: 3, SOCIAL: 2 }],
  ]),
  q("做完一件大事后，你会？", [
    ["马上开启下一件", { EXEC: 4, CONTROL: 1 }],
    ["复盘哪里还能更好", { LOGIC: 4, CONTROL: 2 }],
    ["找大家庆祝一下", { SOCIAL: 4, RELAX: 1 }],
    ["彻底躺平几天", { RELAX: 4 }],
  ]),
  q("大家最常因为什么来找你？", [
    ["帮忙把事情落地", { EXEC: 4, CONTROL: 1 }],
    ["帮忙分析和判断", { LOGIC: 4, CONTROL: 1 }],
    ["帮忙沟通和组局", { SOCIAL: 4, EXEC: 1 }],
    ["帮忙想点新花样", { CREATE: 4, SOCIAL: 1 }],
  ]),
  q("哪句话最像你的生活态度？", [
    ["先把局面稳住", { CONTROL: 4, EXEC: 2 }],
    ["想清楚再行动", { LOGIC: 4, CONTROL: 1 }],
    ["人对了事就顺了", { SOCIAL: 4, RELAX: 1 }],
    ["人生需要一点抽象", { CREATE: 4, RELAX: 2 }],
  ]),
];

const PERSONAS = {
  CTRL: {
    name: "控制人格 CTRL",
    tagline: "你擅长建立秩序和边界，把复杂局面收束成稳定流程。",
    profile: { CONTROL: 96, LOGIC: 72, EXEC: 82, SOCIAL: 34, CREATE: 28, RELAX: 18 },
    direction: "秩序推进型",
  },
  PROMPT: {
    name: "提示词人格 PROMPT",
    tagline: "你善于提出关键问题，把模糊想法转化成清晰表达。",
    profile: { CONTROL: 56, LOGIC: 86, EXEC: 48, SOCIAL: 62, CREATE: 90, RELAX: 44 },
    direction: "提问转译型",
  },
  DEBUG: {
    name: "调试人格 DEBUG",
    tagline: "你总能发现哪里不对，并把问题拆到可以修复的粒度。",
    profile: { CONTROL: 66, LOGIC: 98, EXEC: 74, SOCIAL: 22, CREATE: 34, RELAX: 24 },
    direction: "逻辑修复型",
  },
  AFK: {
    name: "离线人格 AFK",
    tagline: "你知道什么时候该暂停，恢复能量后再重新上线。",
    profile: { CONTROL: 24, LOGIC: 46, EXEC: 22, SOCIAL: 20, CREATE: 50, RELAX: 98 },
    direction: "离线恢复型",
  },
  NODE: {
    name: "节点人格 NODE",
    tagline: "你是信息与资源的连接点，能让团队协作顺畅起来。",
    profile: { CONTROL: 50, LOGIC: 54, EXEC: 64, SOCIAL: 96, CREATE: 42, RELAX: 48 },
    direction: "协作连接型",
  },
  GHOST: {
    name: "幽灵人格 GHOST",
    tagline: "你安静观察、低调判断，常在关键时刻给出清醒答案。",
    profile: { CONTROL: 42, LOGIC: 90, EXEC: 30, SOCIAL: 12, CREATE: 58, RELAX: 78 },
    direction: "内省观察型",
  },
  CLOUD: {
    name: "云端人格 CLOUD",
    tagline: "你的想法轻盈而有弹性，能在变化中保存灵感和可能性。",
    profile: { CONTROL: 18, LOGIC: 42, EXEC: 24, SOCIAL: 58, CREATE: 88, RELAX: 94 },
    direction: "弹性灵感型",
  },
  GLITCH: {
    name: "故障人格 GLITCH",
    tagline: "你不按常规出牌，偏航时反而能制造新的解法。",
    profile: { CONTROL: 14, LOGIC: 62, EXEC: 36, SOCIAL: 36, CREATE: 98, RELAX: 64 },
    direction: "破格创造型",
  },
  MINER: {
    name: "矿工人格 MINER",
    tagline: "你愿意深入挖掘，把隐藏在线索背后的价值一点点采出来。",
    profile: { CONTROL: 62, LOGIC: 88, EXEC: 84, SOCIAL: 18, CREATE: 44, RELAX: 20 },
    direction: "深挖研究型",
  },
  PATCH: {
    name: "补丁人格 PATCH",
    tagline: "你擅长快速补位、修复流程，让事情继续向前跑。",
    profile: { CONTROL: 74, LOGIC: 58, EXEC: 96, SOCIAL: 46, CREATE: 28, RELAX: 22 },
    direction: "补位交付型",
  },
  SIGNAL: {
    name: "信号人格 SIGNAL",
    tagline: "你能捕捉氛围和信息流，帮助团队找到共同频率。",
    profile: { CONTROL: 36, LOGIC: 64, EXEC: 42, SOCIAL: 94, CREATE: 66, RELAX: 58 },
    direction: "氛围感知型",
  },
  STREAM: {
    name: "直播人格 STREAM",
    tagline: "你表达欲和现场感很强，能把想法变成有感染力的内容。",
    profile: { CONTROL: 22, LOGIC: 32, EXEC: 62, SOCIAL: 98, CREATE: 94, RELAX: 36 },
    direction: "表达传播型",
  },
  LOWBAT: {
    name: "低电量人格 LOWBAT",
    tagline: "你对能量消耗很敏感，懂得用更低内耗的方式完成任务。",
    profile: { CONTROL: 40, LOGIC: 56, EXEC: 28, SOCIAL: 24, CREATE: 38, RELAX: 96 },
    direction: "低耗续航型",
  },
  OVERCLK: {
    name: "超频人格 OVERCLK",
    tagline: "一旦进入状态，你会高速推进，在压力下爆发强执行力。",
    profile: { CONTROL: 58, LOGIC: 48, EXEC: 100, SOCIAL: 42, CREATE: 64, RELAX: 8 },
    direction: "高速冲刺型",
  },
  ALT: {
    name: "平行人格 ALT",
    tagline: "你喜欢保留替代路径，总能从另一个角度打开问题。",
    profile: { CONTROL: 28, LOGIC: 70, EXEC: 24, SOCIAL: 44, CREATE: 94, RELAX: 82 },
    direction: "替代路径型",
  },
  AGENT: {
    name: "智能体人格 AGENT",
    tagline: "你能理解目标、协调资源并自主推进，适合项目制协作。",
    profile: { CONTROL: 82, LOGIC: 76, EXEC: 88, SOCIAL: 72, CREATE: 58, RELAX: 30 },
    direction: "自主协同型",
  },
};

const PERSONA_AXES = {
  CTRL: axes(92, 70, 78, -42, -76),
  PROMPT: axes(12, 58, -8, 42, 72),
  DEBUG: axes(62, 96, 48, -84, -38),
  AFK: axes(-82, 18, -94, -68, 22),
  NODE: axes(24, -22, 38, 88, -18),
  GHOST: axes(-36, 86, -72, -96, 34),
  CLOUD: axes(-92, -18, -82, 32, 86),
  GLITCH: axes(-96, 24, -28, 12, 98),
  MINER: axes(42, 88, 62, -92, -12),
  PATCH: axes(86, 16, 96, 18, -72),
  SIGNAL: axes(-18, 8, -12, 92, 38),
  STREAM: axes(-42, -64, 42, 96, 82),
  LOWBAT: axes(-56, 42, -98, -74, -28),
  OVERCLK: axes(58, -12, 100, 2, 28),
  ALT: axes(-88, 52, -78, -18, 94),
  AGENT: axes(72, 52, 84, 58, -8),
};

const PERSONA_CHOICE_PATTERNS = {
  CTRL: choices(70, 20, 5, 5),
  PROMPT: choices(10, 45, 20, 25),
  DEBUG: choices(15, 75, 0, 10),
  AFK: choices(5, 10, 5, 80),
  NODE: choices(10, 5, 75, 10),
  GHOST: choices(10, 55, 0, 35),
  CLOUD: choices(0, 5, 25, 70),
  GLITCH: choices(0, 30, 5, 65),
  MINER: choices(25, 65, 0, 10),
  PATCH: choices(55, 10, 30, 5),
  SIGNAL: choices(5, 25, 55, 15),
  STREAM: choices(5, 0, 55, 40),
  LOWBAT: choices(15, 25, 0, 60),
  OVERCLK: choices(60, 5, 25, 10),
  ALT: choices(5, 35, 10, 50),
  AGENT: choices(35, 25, 35, 5),
};

const PERSONA_OPTION_MAP = [
  [["OVERCLK", "PATCH"], ["LOWBAT", "AFK"], ["DEBUG", "CTRL"], ["NODE", "SIGNAL"]],
  [["GHOST", "AFK"], ["SIGNAL", "NODE"], ["CTRL", "AGENT"], ["PROMPT", "STREAM"]],
  [["PATCH", "LOWBAT"], ["MINER", "DEBUG"], ["NODE", "SIGNAL"], ["CTRL", "PATCH"]],
  [["STREAM", "NODE"], ["AFK", "LOWBAT"], ["PATCH", "AGENT"], ["CLOUD", "ALT"]],
  [["AGENT", "NODE"], ["MINER", "GHOST"], ["CTRL", "DEBUG"], ["AFK", "LOWBAT"]],
  [["PATCH", "OVERCLK"], ["DEBUG", "MINER"], ["AGENT", "NODE"], ["STREAM", "GLITCH"]],
  [["ALT", "LOWBAT"], ["PROMPT", "SIGNAL"], ["SIGNAL", "NODE"], ["CTRL", "DEBUG"]],
  [["DEBUG", "CTRL"], ["NODE", "SIGNAL"], ["CLOUD", "GLITCH"], ["MINER", "PATCH"]],
  [["CTRL", "AGENT"], ["AFK", "CLOUD"], ["STREAM", "SIGNAL"], ["DEBUG", "PROMPT"]],
  [["GHOST", "DEBUG"], ["SIGNAL", "NODE"], ["GLITCH", "STREAM"], ["CLOUD", "AFK"]],
  [["CTRL", "DEBUG"], ["CLOUD", "AFK"], ["NODE", "SIGNAL"], ["ALT", "MINER"]],
  [["AGENT", "OVERCLK"], ["DEBUG", "MINER"], ["SIGNAL", "STREAM"], ["PROMPT", "ALT"]],
  [["CTRL", "AGENT"], ["PATCH", "OVERCLK"], ["SIGNAL", "NODE"], ["GLITCH", "STREAM"]],
  [["SIGNAL", "NODE"], ["DEBUG", "PROMPT"], ["CTRL", "AGENT"], ["LOWBAT", "CLOUD"]],
  [["DEBUG", "MINER"], ["NODE", "SIGNAL"], ["OVERCLK", "STREAM"], ["CTRL", "LOWBAT"]],
  [["GHOST", "DEBUG"], ["DEBUG", "MINER"], ["PATCH", "AGENT"], ["PROMPT", "NODE"]],
  [["CLOUD", "AFK"], ["STREAM", "GLITCH"], ["CTRL", "SIGNAL"], ["GHOST", "LOWBAT"]],
  [["OVERCLK", "PATCH"], ["DEBUG", "MINER"], ["AGENT", "NODE"], ["AFK", "LOWBAT"]],
  [["CTRL", "DEBUG"], ["GLITCH", "ALT"], ["STREAM", "NODE"], ["LOWBAT", "PATCH"]],
  [["STREAM", "NODE"], ["LOWBAT", "AFK"], ["GHOST", "MINER"], ["AGENT", "CTRL"]],
  [["PATCH", "AGENT"], ["DEBUG", "MINER"], ["GLITCH", "CLOUD"], ["NODE", "SIGNAL"]],
  [["CTRL", "AGENT"], ["CLOUD", "AFK"], ["SIGNAL", "NODE"], ["ALT", "GLITCH"]],
  [["DEBUG", "MINER"], ["CTRL", "PATCH"], ["PROMPT", "NODE"], ["SIGNAL", "AFK"]],
  [["AFK", "LOWBAT"], ["SIGNAL", "NODE"], ["OVERCLK", "PATCH"], ["CLOUD", "GLITCH"]],
  [["DEBUG", "MINER"], ["CTRL", "PATCH"], ["SIGNAL", "STREAM"], ["PROMPT", "GLITCH"]],
  [["PATCH", "AGENT"], ["DEBUG", "MINER"], ["NODE", "SIGNAL"], ["ALT", "GLITCH"]],
  [["OVERCLK", "CLOUD"], ["NODE", "SIGNAL"], ["CTRL", "DEBUG"], ["PROMPT", "STREAM"]],
  [["OVERCLK", "PATCH"], ["DEBUG", "MINER"], ["STREAM", "NODE"], ["AFK", "LOWBAT"]],
  [["PATCH", "AGENT"], ["DEBUG", "MINER"], ["NODE", "SIGNAL"], ["PROMPT", "GLITCH"]],
  [["CTRL", "AGENT"], ["DEBUG", "MINER"], ["NODE", "SIGNAL"], ["GLITCH", "CLOUD"]],
];

const state = {
  currentIndex: 0,
  answers: Array(QUESTIONS.length).fill(null),
};

const els = {
  homePage: document.querySelector("#homePage"),
  quizPage: document.querySelector("#quizPage"),
  resultPage: document.querySelector("#resultPage"),
  startBtn: document.querySelector("#startBtn"),
  homeBtn: document.querySelector("#homeBtn"),
  prevBtn: document.querySelector("#prevBtn"),
  nextBtn: document.querySelector("#nextBtn"),
  questionCounter: document.querySelector("#questionCounter"),
  questionText: document.querySelector("#questionText"),
  optionsList: document.querySelector("#optionsList"),
  progressBar: document.querySelector("#progressBar"),
  resultName: document.querySelector("#resultName"),
  resultTagline: document.querySelector("#resultTagline"),
  matchValue: document.querySelector("#matchValue"),
  resultImage: document.querySelector("#resultImage"),
  saveBtn: document.querySelector("#saveBtn"),
  shareBtn: document.querySelector("#shareBtn"),
  restartBtn: document.querySelector("#restartBtn"),
  toast: document.querySelector("#toast"),
  heroParticles: document.querySelector("#heroParticles"),
  dynamicHeroText: document.querySelector("#dynamicHeroText"),
};

const maxScores = getMaxScores();
let latestResult = null;

initMotion();
initHeroExperience();

els.startBtn.addEventListener("click", () => {
  showPage("quiz");
  renderQuestion();
});

els.homeBtn.addEventListener("click", () => showPage("home"));
els.prevBtn.addEventListener("click", goPrev);
els.nextBtn.addEventListener("click", goNext);
els.restartBtn.addEventListener("click", restart);
els.saveBtn.addEventListener("click", saveResultImage);
els.shareBtn.addEventListener("click", shareResult);

function q(text, optionPairs) {
  return {
    text,
    options: optionPairs.map(([label, score], index) => ({
      key: ["A", "B", "C", "D"][index],
      label,
      score,
    })),
  };
}

function showPage(page) {
  els.homePage.classList.toggle("is-active", page === "home");
  els.quizPage.classList.toggle("is-active", page === "quiz");
  els.resultPage.classList.toggle("is-active", page === "result");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
  const question = QUESTIONS[state.currentIndex];
  const selected = state.answers[state.currentIndex];
  els.questionCounter.textContent = `第 ${state.currentIndex + 1} / ${QUESTIONS.length} 题`;
  els.questionText.textContent = question.text;
  els.progressBar.style.width = `${((state.currentIndex + 1) / QUESTIONS.length) * 100}%`;
  els.prevBtn.disabled = state.currentIndex === 0;
  els.prevBtn.style.opacity = state.currentIndex === 0 ? "0.45" : "1";
  els.nextBtn.textContent = state.currentIndex === QUESTIONS.length - 1 ? "查看结果" : "下一题";
  els.optionsList.innerHTML = question.options
    .map(
      (option, index) => `
        <button class="option-btn ${selected === index ? "is-selected" : ""}" type="button" data-index="${index}">
          <span class="option-key">${option.key}</span>
          <span>${option.label}</span>
        </button>
      `
    )
    .join("");

  els.optionsList.querySelectorAll(".option-btn").forEach((button) => {
    button.addEventListener("click", () => {
      state.answers[state.currentIndex] = Number(button.dataset.index);
      renderQuestion();
    });
  });

  animateQuestionCard();
}

function goPrev() {
  if (state.currentIndex > 0) {
    state.currentIndex -= 1;
    renderQuestion();
  }
}

function goNext() {
  if (state.answers[state.currentIndex] === null) {
    showToast("请先选择一个选项");
    return;
  }

  if (state.currentIndex < QUESTIONS.length - 1) {
    state.currentIndex += 1;
    renderQuestion();
    return;
  }

  renderResult();
}

function renderResult() {
  const rawScores = calculateRawScores();
  const normalizedScores = normalizeScores(rawScores);
  const answerPattern = calculateAnswerPattern();
  const personaVotes = calculatePersonaVotes();
  const matched = matchPersona(normalizedScores, answerPattern, personaVotes);
  latestResult = { rawScores, normalizedScores, ...matched };

  els.resultName.textContent = matched.persona.name;
  els.resultTagline.textContent = matched.persona.tagline;
  els.matchValue.textContent = `${matched.match}%`;
  els.resultImage.src = `images/${matched.code}.png`;
  els.resultImage.alt = matched.persona.name;

  showPage("result");
}

function calculateRawScores() {
  const scores = emptyScores();
  state.answers.forEach((answerIndex, questionIndex) => {
    const score = QUESTIONS[questionIndex].options[answerIndex].score;
    Object.entries(score).forEach(([key, value]) => {
      scores[key] += value;
    });
  });
  return scores;
}

function calculateAnswerPattern() {
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  state.answers.forEach((answerIndex, questionIndex) => {
    const option = QUESTIONS[questionIndex].options[answerIndex];
    if (option) counts[option.key] += 1;
  });

  return Object.fromEntries(
    Object.entries(counts).map(([key, count]) => [key, Math.round((count / QUESTIONS.length) * 100)])
  );
}

function calculatePersonaVotes() {
  const votes = Object.fromEntries(Object.keys(PERSONAS).map((code) => [code, 0]));
  const opportunities = Object.fromEntries(Object.keys(PERSONAS).map((code) => [code, 0]));

  PERSONA_OPTION_MAP.forEach((options) => {
    Object.keys(PERSONAS).forEach((code) => {
      const bestAffinity = Math.max(
        ...options.map((affinities) => {
          const rank = affinities.indexOf(code);
          return rank === 0 ? 1 : rank === 1 ? 0.55 : 0;
        })
      );
      opportunities[code] += bestAffinity;
    });
  });

  state.answers.forEach((answerIndex, questionIndex) => {
    const affinities = PERSONA_OPTION_MAP[questionIndex]?.[answerIndex] || [];
    affinities.forEach((code, rank) => {
      votes[code] += rank === 0 ? 1 : 0.55;
    });
  });

  return Object.fromEntries(
    Object.entries(votes).map(([code, count]) => [
      code,
      Math.round((count / Math.max(opportunities[code], 1)) * 100),
    ])
  );
}

function normalizeScores(rawScores) {
  return Object.fromEntries(
    DIMENSIONS.map(({ key }) => [key, Math.round((rawScores[key] / maxScores[key]) * 100)])
  );
}

function matchPersona(
  scores,
  answerPattern = calculateAnswerPattern(),
  personaVotes = calculatePersonaVotes()
) {
  let best = null;
  const userAxes = buildAxisVector(scores);
  Object.entries(PERSONAS).forEach(([code, persona]) => {
    const dimensionDistance = normalizedDistance(
      DIMENSIONS.map(({ key }) => scores[key] - persona.profile[key]),
      100
    );
    const personaAxes = PERSONA_AXES[code] || buildAxisVector(persona.profile);
    const axisDistance = normalizedDistance(
      PERSONALITY_AXES.map(({ key }) => userAxes[key] - personaAxes[key]),
      200
    );
    const choiceDistance = normalizedDistance(
      ["A", "B", "C", "D"].map((key) => answerPattern[key] - PERSONA_CHOICE_PATTERNS[code][key]),
      100
    );
    const voteDistance = 1 - (personaVotes[code] || 0) / 100;
    const distance =
      dimensionDistance * MATCH_WEIGHTS.dimensions +
      axisDistance * MATCH_WEIGHTS.axes +
      choiceDistance * MATCH_WEIGHTS.choices +
      voteDistance * MATCH_WEIGHTS.votes;

    if (!best || distance < best.distance) {
      best = {
        code,
        persona,
        distance,
        dimensionDistance,
        axisDistance,
        choiceDistance,
        voteDistance,
      };
    }
  });

  const match = Math.max(58, Math.round(100 - best.distance * 44));
  return { ...best, match };
}

function buildAxisVector(scores) {
  return Object.fromEntries(
    PERSONALITY_AXES.map(({ key, get }) => [key, clamp(get(scores), -100, 100)])
  );
}

function axes(order, analysis, action, expression, novelty) {
  return { ORDER: order, ANALYSIS: analysis, ACTION: action, EXPRESSION: expression, NOVELTY: novelty };
}

function choices(A, B, C, D) {
  return { A, B, C, D };
}

function normalizedDistance(deltas, range) {
  const rms = Math.sqrt(deltas.reduce((sum, delta) => sum + delta ** 2, 0) / deltas.length);
  return clamp(rms / range, 0, 1);
}

function getMaxScores() {
  const max = emptyScores();
  QUESTIONS.forEach((question) => {
    DIMENSIONS.forEach(({ key }) => {
      max[key] += Math.max(...question.options.map((option) => option.score[key] || 0));
    });
  });
  return max;
}

function emptyScores() {
  return Object.fromEntries(DIMENSIONS.map(({ key }) => [key, 0]));
}

function average(...values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function saveResultImage() {
  if (!latestResult) return;
  const link = document.createElement("a");
  link.href = `images/${latestResult.code}.png`;
  link.download = `NXT-${latestResult.code}-人格结果.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  showToast("结果图已开始下载");
}

async function shareResult() {
  if (!latestResult) return;
  const text = `我的 NXT 数智人格是：${latestResult.persona.name}，匹配度 ${latestResult.match}%。加入农芯数智社，一起解锁数智校园实践！`;
  if (navigator.share) {
    try {
      await navigator.share({
        title: "NXT 数智人格测试",
        text,
        url: location.href,
      });
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }

  await navigator.clipboard?.writeText(text);
  showToast("分享文案已复制");
}

function restart() {
  state.currentIndex = 0;
  state.answers = Array(QUESTIONS.length).fill(null);
  latestResult = null;
  showPage("home");
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    els.toast.classList.remove("is-visible");
  }, 1800);
}

function initMotion() {
  if (!window.gsap) return;

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduceMotion) return;

  gsap.set([".eyebrow", "h1", ".hero-subtitle", ".hero-copy", ".club-panel", "#startBtn"], {
    y: 18,
    opacity: 0,
  });
  gsap.set([".floating-island", ".hud-card", ".center-core"], { opacity: 0, y: 18 });

  gsap
    .timeline({ defaults: { ease: "power3.out" } })
    .to(".hero-bg", { opacity: 1, duration: 0.01 })
    .to(".hud-card", { y: 0, opacity: 1, duration: 0.42, stagger: 0.08 })
    .to(".floating-island", { y: 0, opacity: 1, duration: 0.48, stagger: 0.1 }, "-=0.2")
    .to(".center-core", { y: 0, opacity: 1, duration: 0.4 }, "-=0.18")
    .to(".eyebrow", { y: 0, opacity: 1, duration: 0.45 })
    .to("h1", { y: 0, opacity: 1, duration: 0.58 }, "-=0.2")
    .to(".hero-subtitle", { y: 0, opacity: 1, duration: 0.36 }, "-=0.28")
    .to(".hero-copy", { y: 0, opacity: 1, duration: 0.48 }, "-=0.18")
    .to(".club-panel", { y: 0, opacity: 1, duration: 0.48 }, "-=0.2")
    .to("#startBtn", { y: 0, opacity: 1, duration: 0.42 }, "-=0.18");

  gsap.to(".floating-island", {
    y: -8,
    duration: 2.6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: 0.28,
  });

  gsap.to(".bot", {
    y: -4,
    duration: 1.4,
    repeat: -1,
    yoyo: true,
    ease: "steps(4)",
    stagger: 0.2,
  });

  gsap.to(".center-core", {
    filter: "drop-shadow(0 0 18px rgba(156, 255, 87, 0.95))",
    scale: 1.04,
    duration: 1.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".circuit-lines", {
    opacity: 0.32,
    duration: 1.1,
    repeat: -1,
    yoyo: true,
    ease: "steps(4)",
  });

  gsap.to(".pixel-fx span", {
    y: "random(-14, 14)",
    x: "random(-10, 10)",
    opacity: "random(0.35, 1)",
    scale: "random(0.7, 1.25)",
    duration: "random(1.2, 2.4)",
    repeat: -1,
    yoyo: true,
    ease: "steps(5)",
    stagger: 0.12,
  });

  gsap.to("#startBtn", {
    y: -3,
    duration: 1.3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

function animateQuestionCard() {
  if (!window.gsap) return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;

  gsap.fromTo(
    ".question-card",
    { y: 8, opacity: 0.72 },
    { y: 0, opacity: 1, duration: 0.22, ease: "power2.out" }
  );

  gsap.fromTo(
    ".option-btn",
    { x: -8, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.22, stagger: 0.04, ease: "power2.out" }
  );
}

function initHeroExperience() {
  const home = els.homePage;
  const canvas = els.heroParticles;
  const dynamicText = els.dynamicHeroText;
  if (!home || !canvas || !dynamicText) return;

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const phrases = [
    "正在连接你的数智人格...",
    "捕捉校园里的隐藏信号",
    "你的脑回路，准备加载",
    "CTRL、STREAM，还是隐藏款？",
    "扫描完成前，保持一点好奇",
  ];
  let phraseIndex = 0;
  let textTimer = null;
  const pointer = { x: 0, y: 0, active: false };

  const rotateText = () => {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    dynamicText.classList.remove("is-changing");
    requestAnimationFrame(() => {
      dynamicText.classList.add("is-changing");
      dynamicText.textContent = phrases[phraseIndex];
    });
    textTimer = window.setTimeout(rotateText, 2600);
  };

  if (!reduceMotion) textTimer = window.setTimeout(rotateText, 2200);

  home.addEventListener("pointermove", (event) => {
    if (reduceMotion || !home.classList.contains("is-active")) return;
    const rect = home.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.active = true;
    home.style.setProperty("--hero-shift-x", `${x * -10}px`);
    home.style.setProperty("--hero-shift-y", `${y * -7}px`);
  });

  home.addEventListener("pointerleave", () => {
    pointer.active = false;
    home.style.setProperty("--hero-shift-x", "0px");
    home.style.setProperty("--hero-shift-y", "0px");
  });

  home.addEventListener("pointerdown", (event) => {
    const rect = home.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    particles.forEach((particle) => {
      const dx = particle.x - clickX;
      const dy = particle.y - clickY;
      const distance = Math.max(Math.hypot(dx, dy), 1);
      if (distance < 260) {
        particle.x += (dx / distance) * (260 - distance) * 0.09;
        particle.y += (dy / distance) * (260 - distance) * 0.09;
      }
    });
  });

  els.startBtn.addEventListener("pointerdown", () => home.classList.add("is-interacting"));
  window.addEventListener("pointerup", () => home.classList.remove("is-interacting"));

  if (reduceMotion) return;

  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return;

  let width = 0;
  let height = 0;
  let particles = [];
  let lastFrame = 0;
  let animationFrame = 0;

  const createParticle = () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() > 0.78 ? 3 : 2,
    speed: 0.12 + Math.random() * 0.32,
    drift: (Math.random() - 0.5) * 0.12,
    alpha: 0.25 + Math.random() * 0.55,
    tone: Math.random() > 0.35 ? "223,255,98" : "114,245,208",
  });

  const resizeParticles = () => {
    const rect = home.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = width < 600 ? 20 : 42;
    particles = Array.from({ length: count }, createParticle);
  };

  const drawParticles = (time) => {
    animationFrame = requestAnimationFrame(drawParticles);
    if (!home.classList.contains("is-active") || document.hidden || time - lastFrame < 33) return;
    lastFrame = time;
    context.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.y -= particle.speed;
      particle.x += particle.drift;
      if (pointer.active) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.max(Math.hypot(dx, dy), 1);
        if (distance < 92) {
          particle.x += (dx / distance) * 0.65;
          particle.y += (dy / distance) * 0.65;
        }
      }
      if (particle.y < -8) {
        particle.y = height + 8;
        particle.x = Math.random() * width;
      }

      context.fillStyle = `rgba(${particle.tone},${particle.alpha})`;
      context.fillRect(Math.round(particle.x), Math.round(particle.y), particle.size, particle.size);
      if (particle.size > 2) {
        context.fillRect(Math.round(particle.x - 3), Math.round(particle.y + 1), 2, 1);
        context.fillRect(Math.round(particle.x + 4), Math.round(particle.y + 1), 2, 1);
      }
    });
  };

  resizeParticles();
  window.addEventListener("resize", resizeParticles, { passive: true });
  animationFrame = requestAnimationFrame(drawParticles);

  window.addEventListener("beforeunload", () => {
    window.clearTimeout(textTimer);
    cancelAnimationFrame(animationFrame);
  });
}
