const DIMENSIONS = [
  { key: "CONTROL", label: "控制力" },
  { key: "LOGIC", label: "逻辑力" },
  { key: "EXEC", label: "执行力" },
  { key: "SOCIAL", label: "社交能量" },
  { key: "CREATE", label: "创造力" },
  { key: "RELAX", label: "松弛指数" },
];

const MATCH_WEIGHTS = {
  dimensions: 0.22,
  axes: 0.36,
  choices: 0.18,
  votes: 0.24,
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
  q("课程作业刚布置，你会先？", [
    ["看要求和截止时间", { CONTROL: 2, EXEC: 1 }],
    ["搞懂评分逻辑", { LOGIC: 2, CONTROL: 1 }],
    ["找同学组队", { SOCIAL: 2, EXEC: 1 }],
    ["先想个新主题", { CREATE: 2, RELAX: 1 }],
  ]),
  q("明天交小组汇报，你通常？", [
    ["先赶出初稿", { EXEC: 2, CONTROL: 1 }],
    ["保住核心内容", { LOGIC: 2, EXEC: 1 }],
    ["群里同步进度", { SOCIAL: 2, EXEC: 1 }],
    ["先稳住状态", { RELAX: 2, CONTROL: 1 }],
  ]),
  q("小组讨论跑偏时，你会？", [
    ["拉回主题", { CONTROL: 2, SOCIAL: 1 }],
    ["指出漏洞", { LOGIC: 2, CONTROL: 1 }],
    ["cue 队友发言", { SOCIAL: 2, RELAX: 1 }],
    ["补个新脑洞", { CREATE: 2, SOCIAL: 1 }],
  ]),
  q("活动安排临时变了，你先？", [
    ["重排流程", { CONTROL: 2, EXEC: 1 }],
    ["判断影响", { LOGIC: 2, CONTROL: 1 }],
    ["问大家状态", { SOCIAL: 2, CONTROL: 1 }],
    ["顺势换玩法", { RELAX: 2, CREATE: 1 }],
  ]),
  q("做一个课程小项目，你喜欢？", [
    ["分工清楚", { CONTROL: 2, EXEC: 1 }],
    ["逻辑扎实", { LOGIC: 2, CREATE: 1 }],
    ["边聊边改", { SOCIAL: 2, CREATE: 1 }],
    ["自由探索", { RELAX: 2, CREATE: 1 }],
  ]),
  q("资料很多很乱时，你会？", [
    ["先分类整理", { CONTROL: 2, LOGIC: 1 }],
    ["找关键规律", { LOGIC: 2, CONTROL: 1 }],
    ["问懂的人", { SOCIAL: 2, LOGIC: 1 }],
    ["换个角度看", { CREATE: 2, LOGIC: 1 }],
  ]),
  q("社团群突然没人推进，你会？", [
    ["发待办清单", { CONTROL: 2, EXEC: 1 }],
    ["找卡点", { LOGIC: 2, EXEC: 1 }],
    ["活跃一下", { SOCIAL: 2, EXEC: 1 }],
    ["晚点再说", { RELAX: 2, SOCIAL: 1 }],
  ]),
  q("你觉得高效是？", [
    ["少返工", { CONTROL: 2, EXEC: 1 }],
    ["方法对", { LOGIC: 2, CONTROL: 1 }],
    ["同步快", { SOCIAL: 2, EXEC: 1 }],
    ["不内耗", { RELAX: 2, EXEC: 1 }],
  ]),
  q("第一次用新工具，你会？", [
    ["看教程", { EXEC: 2, CONTROL: 1 }],
    ["研究原理", { LOGIC: 2, CREATE: 1 }],
    ["问同学", { SOCIAL: 2, EXEC: 1 }],
    ["直接试", { CREATE: 2, RELAX: 1 }],
  ]),
  q("最让你难受的是？", [
    ["没人负责", { CONTROL: 2, EXEC: 1 }],
    ["逻辑不通", { LOGIC: 2, CONTROL: 1 }],
    ["信息不同步", { SOCIAL: 2, CONTROL: 1 }],
    ["一直被催", { RELAX: 2, CONTROL: 1 }],
  ]),
  q("做完一个作品，你最看重？", [
    ["过程稳", { CONTROL: 2, LOGIC: 1 }],
    ["结论硬", { LOGIC: 2, EXEC: 1 }],
    ["合作舒服", { SOCIAL: 2, RELAX: 1 }],
    ["有亮点", { CREATE: 2, EXEC: 1 }],
  ]),
  q("同学最可能说你？", [
    ["很靠谱", { EXEC: 2, CONTROL: 1 }],
    ["很清醒", { LOGIC: 2, CONTROL: 1 }],
    ["很好相处", { SOCIAL: 2, RELAX: 1 }],
    ["点子很多", { CREATE: 2, LOGIC: 1 }],
  ]),
  q("负责社团招新，你先做？", [
    ["排流程", { CONTROL: 2, EXEC: 1 }],
    ["定人群", { LOGIC: 2, CONTROL: 1 }],
    ["拉队友", { SOCIAL: 2, EXEC: 1 }],
    ["想爆点", { CREATE: 2, SOCIAL: 1 }],
  ]),
  q("压力上来时，你会？", [
    ["整理待办", { CONTROL: 2, EXEC: 1 }],
    ["复盘原因", { LOGIC: 2, CONTROL: 1 }],
    ["找人聊聊", { SOCIAL: 2, RELAX: 1 }],
    ["先离线", { RELAX: 2, CONTROL: 1 }],
  ]),
  q("四个任务里，你想接？", [
    ["现场统筹", { CONTROL: 2, EXEC: 1 }],
    ["数据分析", { LOGIC: 2, CREATE: 1 }],
    ["对外联络", { SOCIAL: 2, EXEC: 1 }],
    ["海报文案", { CREATE: 2, RELAX: 1 }],
  ]),
  q("团队卡住时，你更常补哪一块？", [
    ["整理流程", { CONTROL: 2, LOGIC: 1 }],
    ["理清问题", { LOGIC: 2, CONTROL: 1 }],
    ["协调资源", { SOCIAL: 2, CREATE: 1 }],
    ["增加亮点", { CREATE: 2, SOCIAL: 1 }],
  ]),
  q("低电量还要交作业，你会？", [
    ["先交再说", { EXEC: 2, CONTROL: 1 }],
    ["分析卡点", { LOGIC: 2, RELAX: 1 }],
    ["找人吐槽", { SOCIAL: 2, RELAX: 1 }],
    ["休息回血", { RELAX: 2, EXEC: 1 }],
  ]),
  q("队友提出新点子，你会？", [
    ["想怎么落地", { EXEC: 2, CONTROL: 1 }],
    ["判断可不可行", { LOGIC: 2, CONTROL: 1 }],
    ["一起聊开", { SOCIAL: 2, CREATE: 1 }],
    ["先别收束", { CREATE: 2, RELAX: 1 }],
  ]),
  q("如果你是一个系统部件，你像？", [
    ["控制台", { CONTROL: 2, EXEC: 1 }],
    ["分析核", { LOGIC: 2, CREATE: 1 }],
    ["连接节点", { SOCIAL: 2, LOGIC: 1 }],
    ["云端草稿箱", { CREATE: 2, RELAX: 1 }],
  ]),
  q("听到离谱方案，你会？", [
    ["拉回现实", { CONTROL: 2, EXEC: 1 }],
    ["指出风险", { LOGIC: 2, CONTROL: 1 }],
    ["听听大家", { SOCIAL: 2, LOGIC: 1 }],
    ["先保留", { CREATE: 2, RELAX: 1 }],
  ]),
  q("学一个新方向，你先？", [
    ["列路线", { CONTROL: 2, EXEC: 1 }],
    ["看知识图谱", { LOGIC: 2, CONTROL: 1 }],
    ["找同伴学", { SOCIAL: 2, EXEC: 1 }],
    ["从案例入手", { CREATE: 2, RELAX: 1 }],
  ]),
  q("做测试网页，你先管？", [
    ["页面流程", { CONTROL: 2, LOGIC: 1 }],
    ["计分规则", { LOGIC: 2, EXEC: 1 }],
    ["人员分工", { SOCIAL: 2, CONTROL: 1 }],
    ["视觉风格", { CREATE: 2, SOCIAL: 1 }],
  ]),
  q("你觉得项目稳定是？", [
    ["步骤清楚", { CONTROL: 2, EXEC: 1 }],
    ["逻辑闭环", { LOGIC: 2, CONTROL: 1 }],
    ["沟通顺畅", { SOCIAL: 2, RELAX: 1 }],
    ["能灵活改", { RELAX: 2, CREATE: 1 }],
  ]),
  q("刷到哪类内容会停下？", [
    ["效率工具", { CONTROL: 2, EXEC: 1 }],
    ["工具原理", { LOGIC: 2, CREATE: 1 }],
    ["社团故事", { SOCIAL: 2, EXEC: 1 }],
    ["创意作品", { CREATE: 2, RELAX: 1 }],
  ]),
  q("同类问题反复出现，你会？", [
    ["做模板", { CONTROL: 2, EXEC: 1 }],
    ["找根因", { LOGIC: 2, EXEC: 1 }],
    ["同步大家", { SOCIAL: 2, CONTROL: 1 }],
    ["换方法", { CREATE: 2, RELAX: 1 }],
  ]),
  q("你的隐藏优势更像？", [
    ["收拾局面", { CONTROL: 2, EXEC: 1 }],
    ["讲清问题", { LOGIC: 2, CONTROL: 1 }],
    ["连接人脉", { SOCIAL: 2, CREATE: 1 }],
    ["制造趣味", { CREATE: 2, RELAX: 1 }],
  ]),
  q("团队有冲突时，你会？", [
    ["定边界", { CONTROL: 2, LOGIC: 1 }],
    ["拆原因", { LOGIC: 2, SOCIAL: 1 }],
    ["缓气氛", { SOCIAL: 2, RELAX: 1 }],
    ["先暂停", { RELAX: 2, SOCIAL: 1 }],
  ]),
  q("合作后，你希望别人记住？", [
    ["靠得住", { CONTROL: 2, EXEC: 1 }],
    ["判断准", { LOGIC: 2, CONTROL: 1 }],
    ["好沟通", { SOCIAL: 2, RELAX: 1 }],
    ["有想法", { CREATE: 2, RELAX: 1 }],
  ]),
  q("遇到陌生概念，你会？", [
    ["查路线", { CONTROL: 2, EXEC: 1 }],
    ["看概念关系", { LOGIC: 2, CONTROL: 1 }],
    ["问学长学姐", { SOCIAL: 2, EXEC: 1 }],
    ["先试个案例", { CREATE: 2, RELAX: 1 }],
  ]),
  q("你的做事台词更像？", [
    ["先摆正局面", { CONTROL: 2, EXEC: 1 }],
    ["先想清楚", { LOGIC: 2, CONTROL: 1 }],
    ["先对上频", { SOCIAL: 2, EXEC: 1 }],
    ["先留可能", { CREATE: 2, RELAX: 1 }],
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
  ["CTRL", "PROMPT", "NODE", "GLITCH"],
  ["OVERCLK", "DEBUG", "PATCH", "LOWBAT"],
  ["CTRL", "DEBUG", "SIGNAL", "STREAM"],
  ["PATCH", "MINER", "AGENT", "CLOUD"],
  ["CTRL", "PROMPT", "SIGNAL", "ALT"],
  ["CTRL", "MINER", "NODE", "ALT"],
  ["PATCH", "DEBUG", "NODE", "AFK"],
  ["PATCH", "MINER", "AGENT", "LOWBAT"],
  ["PATCH", "PROMPT", "NODE", "GLITCH"],
  ["CTRL", "DEBUG", "SIGNAL", "AFK"],
  ["CTRL", "MINER", "NODE", "STREAM"],
  ["PATCH", "DEBUG", "SIGNAL", "GLITCH"],
  ["CTRL", "PROMPT", "NODE", "STREAM"],
  ["CTRL", "DEBUG", "SIGNAL", "LOWBAT"],
  ["PATCH", "MINER", "NODE", "STREAM"],
  ["CTRL", "DEBUG", "AGENT", "GLITCH"],
  ["OVERCLK", "GHOST", "SIGNAL", "AFK"],
  ["PATCH", "DEBUG", "PROMPT", "CLOUD"],
  ["CTRL", "PROMPT", "NODE", "CLOUD"],
  ["PATCH", "DEBUG", "SIGNAL", "ALT"],
  ["CTRL", "MINER", "NODE", "CLOUD"],
  ["CTRL", "PROMPT", "AGENT", "STREAM"],
  ["CTRL", "DEBUG", "SIGNAL", "CLOUD"],
  ["PATCH", "PROMPT", "NODE", "STREAM"],
  ["CTRL", "MINER", "AGENT", "ALT"],
  ["CTRL", "DEBUG", "NODE", "GLITCH"],
  ["CTRL", "GHOST", "SIGNAL", "AFK"],
  ["PATCH", "DEBUG", "NODE", "STREAM"],
  ["CTRL", "MINER", "SIGNAL", "CLOUD"],
  ["CTRL", "DEBUG", "NODE", "ALT"],
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
};

const maxScores = getMaxScores();
let latestResult = null;

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
  state.answers.forEach((answerIndex, questionIndex) => {
    const code = PERSONA_OPTION_MAP[questionIndex]?.[answerIndex];
    if (code) votes[code] += 1;
  });

  return Object.fromEntries(
    Object.entries(votes).map(([code, count]) => [code, Math.round((count / QUESTIONS.length) * 100)])
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
