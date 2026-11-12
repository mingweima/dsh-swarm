# dsh-swarm · 鱼群雷达

DeepSeek Harness（DSH）桌面版的子智能体实时监控面板。

右下角一条「鱼群 N 活跃」悬浮条：只看**正在工作**或**刚完成 60 秒内**的 subagent；点开是卡片列表，每张卡显示任务名、运行时长、当前动作和 **token 消耗进度条**，进度条末端挂一只蓝毛小女仆大肥鱼，跟着进度往前游。

## 功能

- **只显示活跃**：正在跑 + 刚完成 60 秒内的子智能体，完成的自动灰掉淡出
- **token 进度条**：以本屏消耗最多的那个为满格基准，最长的就是最费的，直观对比
- **双主题**：肥鱼（鱼群 + 女仆形象）/ 极简（纯进度条 + 圆点）
- **四档字号**：特小 / 小 / 中 / 大（弱视友好）
- **五套色系**：蓝 / 青 / 紫 / 绿 / 橙，进度条、边框、鱼群整体联动
- **动画开关** + **完成卡显隐**，设置存本机 localStorage
- **自动降载**：≤10 条全动画，11–20 条关动画，>20 条静态渲染，最多渲染 60 条
- **会话绑定**：数据跟随当前主视图会话

## 安装

要求 DSH `>=0.2.2-rc.2 <0.3.0`（见 `package.json` 的 `engines.dsh`）。

### 方式一：直接从 GitHub 安装（推荐）

DSH 的安装框与命令行都接受 Git 规格，仓库根就是包根，clone 下来即用，无需构建：

- **图形界面**：Plugins → Add plugin → 填 `github:mingweima/dsh-swarm`
- **命令行**（Desktop 需先在应用菜单里装好 `dsh` 命令）：

```bash
dsh plugin --profile desktop add github:mingweima/dsh-swarm   # dsh web 用户把 desktop 换成 web
```

装完即可用：依赖、`dsh.profile.bundles` 由 CLI 自动写入，`cordis.patch.yml` 由包内自带，无需手改；包名是 `@local/bigfish-swarm`。要锁定某个提交，在规格末尾加 `#<40 位 commit sha>`。

### 方式二：本地目录（开发自用，改文件即生效）

```bash
dsh plugin --profile desktop add link:/path/to/dsh-swarm
```

或在「设置 → 插件 → 添加本地插件」选择本目录。

## 使用

- 悬浮条固定在右下角（产物插件悬浮条上方，窄窗口自动上移避让）
- 点胶囊展开卡片列表；点「设置」调主题/字号/色系/动画/完成态
- 只读插件：不写任何文件、不联网

## 数据来源

- 子代理目录：当前会话投影 `subagentCatalog`
- 运行状态：`useSessionStatus`（官方同源）
- token：子会话投影 `tokenUsage` 四项求和
- 时长：子会话投影 `subagentTiming`
- 当前动作：`turnOutline.draft`

## 许可

MIT
