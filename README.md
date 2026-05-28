# NXT 数智人格测试

一个手机端优先的静态人格测试网页。用户完成 30 道选择题后，系统会根据六个维度得分，与 16 种 NXT 数智人格标准画像做相似度匹配，并展示对应人格结果图。

## 项目文件

- `index.html`：页面结构，包含首页、答题页、结果页。
- `style.css`：移动端优先样式，绿色、白色、科技感与校园社团招新风格。
- `script.js`：30 题题库、计分规则、六维度归一化、16 种人格标准画像、结果匹配与分享逻辑。
- `images/`：16 张人格结果图片，按人格代码命名。

## 六个维度

- 控制力
- 逻辑力
- 执行力
- 社交能量
- 创造力
- 松弛指数

## 本地运行

这是纯静态项目，不需要安装后端依赖。

方式一：直接双击打开 `index.html`。

方式二：使用本地静态服务器预览：

```bash
npx serve .
```

或：

```bash
python -m http.server 8080
```

然后在浏览器打开 `http://localhost:8080`。

## 部署到 GitHub Pages

1. 新建 GitHub 仓库，并上传以下内容：`index.html`、`style.css`、`script.js`、`README.md`、`images/`。
2. 进入仓库的 `Settings`。
3. 打开 `Pages`。
4. `Source` 选择 `Deploy from a branch`。
5. 分支选择 `main`，目录选择 `/root`。
6. 保存后等待 GitHub Pages 生成访问地址。

## 部署到 Vercel

1. 登录 Vercel。
2. 选择 `Add New Project`。
3. 导入 GitHub 仓库。
4. Framework Preset 选择 `Other` 或保持自动识别。
5. Build Command 留空。
6. Output Directory 留空或填写 `.`。
7. 点击 Deploy。

## 调整人格画像

16 种人格的标准画像写在 `script.js` 的 `PERSONAS` 对象中，每个维度为 0 到 100 分。正式招新前建议找 20 到 30 名同学试测，如果某些人格过度集中，可以微调对应画像分数。
