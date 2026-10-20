const $ = (s) => document.querySelector(s);

const directions = [
  {
    name: "进终端",
    existing: "与智谱合作的 AI 编程本、INMO AI 眼镜、家庭屏与摄像头、UniClaw；已有终端应用测试实验室。",
    gap: "现有评测覆盖到哪一步？真实任务、弱网和持续使用，还可以补充什么证据？",
    method: "选 2–3 款终端，比较任务成功率、用户修改量、弱网表现和使用成本。",
    output: "真实任务评测报告 ＋ 可复用测试集",
    resources: "同济交互团队、iDVx；马钧相关端侧研究、王昊奋知识与记忆研究；浙江清华长三角研究院真实场景 AI 评测方向。",
    detail: "先与华盛测试团队对齐已有测试范围，再补充真实任务与失败恢复评测。样机、型号、版本及接口获准后才进入测试。",
    steps: [
      "明确一个使用者和一个任务，锁定 2–3 款可用样机。",
      "建立相同任务、噪声、弱网与纠错条件，保留人工接管。",
      "交付按版本记录的结果、失败样例与可重复执行的测试集。"
    ]
  },
  {
    name: "进工具",
    existing: "云智 AI Pad 展业版、FTTR 产品专家，服务营业员、代理商与外勤工作。",
    gap: "套餐推荐与客户需求预判仍在迭代。哪一步最费时间，需要跟着一线走一遍。",
    method: "跟办新、老员工的完整业务办理，找到最值得改善的一步，设计 AI 介入点。",
    output: "办理流程诊断 ＋ 改进方案原型",
    resources: "同济交互团队、CDI 相关交互研究方向。",
    detail: "先记录当前流程，不预设必须开发新智能体。比较流程优化、现成工具和 AI 辅助，优先复用华盛已有系统与模型。",
    steps: [
      "在获准范围内观察新员工与熟练员工，记录工作而非评价个人。",
      "区分等待、录入、求助、复核与返工，核实最主要的时间损耗。",
      "用脱敏或合成任务比较方案，记录收益和额外核对成本。"
    ]
  },
  {
    name: "进服务",
    existing: "欢乐 FDE 的培训、部署与 iLab 社区；eSIM 智能受理、Apple 商务管理。",
    gap: "哪些应用已被持续使用？哪些效果可以形成经业务确认、适合对外讲的案例？",
    method: "与欢乐 FDE 一起选 2–3 个已上线应用，整理真实使用情况和节省的工作量，形成对外可讲的案例。",
    output: "2–3 个有数字、有口径的效果案例",
    resources: "联合工作组与华盛业务负责人；按案例邀请方法与评测研究力量。",
    detail: "案例由华盛确认事实和披露边界。把使用人数、实际使用周期、业务基线、异常情况和核对成本放在同一口径中。",
    steps: [
      "与欢乐 FDE 共同选择有真实使用记录的应用。",
      "比较使用前后的完整工作量，扣除复核与维护成本。",
      "由业务负责人确认成效；对外发布前另行审批。"
    ]
  },
  {
    name: "进运营",
    existing: "新品上市、库存周转与商机看板；串码追踪、数据仓库、价格监控与收入快报。",
    gap: "设备编号、退货调拨口径、出库签收时间，是否足以支撑想做的分析？",
    method: "先看一个地区、一类产品。我们提供检查方法，由华盛人员在内部执行。",
    output: "数据可用性报告 ＋ 可做分析清单",
    resources: "iDVx 的数据分析、可视分析与过程研究方向。",
    detail: "数据不出华盛。未经批准，不导出业务明细或记录截图；外部团队仅研究获准的检查结果，留下一份可在内部复用的检查方法。",
    steps: [
      "统一字段、状态、时间与关联键的定义。",
      "内部检查缺失、重复、关联失败及更新滞后。",
      "明确现在能做、补数据后能做、暂不适合做的分析。"
    ]
  }
];

const flow = [
  { name: "客户说需求", work: "员工反复追问用途、预算和已有套餐，并在纸上与系统里分别记录。", help: "把客户表达整理为结构化需求，提示缺项；由员工确认后使用。", metric: "重复追问次数", measure: "记录需求补问、漏项与员工修改量；不存留未经许可的客户原声。" },
  { name: "查条件", work: "跨页面查资费、活动资格和产品说明；遇到组合条件时向同事求助。", help: "只检索获准的最新资料，附原文与生效日期；资料不足时提示人工核实。", metric: "查找时长 · 求助次数", measure: "同类任务对照原流程；核对引用正确率、过期资料和错误推荐。" },
  { name: "核验", work: "核对身份、材料与办理条件，补充不清晰或缺失的资料。", help: "提示清单与材料缺项；正式核验仍沿用既有系统和人工责任。", metric: "漏项率 · 重复核验", measure: "先用合成资料验证；不采集客户证件、人脸或真实身份信息。" },
  { name: "录入", work: "把已确认的信息重复填入多个字段，之后逐项检查。", help: "生成字段草稿和来源提示，由员工检查后录入；不自动提交。", metric: "录入时长 · 修改量", measure: "同时记录填写与复核时间，不能只统计生成速度。" },
  { name: "解释方案", work: "把复杂资费、限制和办理规则翻译成客户听得懂的话。", help: "生成带依据的简明说明，突出限制、费用和待确认条件。", metric: "解释时长 · 关键项遗漏", measure: "核对费用和限制是否讲全，用理解测试验证；不承诺自动推荐最优套餐。" },
  { name: "确认", work: "员工与客户再核对套餐内容、费用和业务材料。", help: "汇总待确认清单，标出与最初需求的差异；保留人工确认。", metric: "确认返工率", measure: "统计错项、漏项及返工原因；不让 AI 替客户授权或签署。" },
  { name: "归档", work: "整理办理回执、附件和记录，检查是否归入正确位置。", help: "按规则生成归档清单与命名建议，检查缺少的材料。", metric: "归档时长 · 材料返工率", measure: "由内部人员核查完整性，不把业务资料导出到外部研究环境。" }
];

const phases = [
  ["第 1–3 周", "到一线观察", "建立业务事实与基线", "输出获准的流程记录、问题清单与基线口径。先确认业务责任人、校方承载路径及数据边界。"],
  ["第 4–6 周", "筛出 3 个场景", "比较价值与实施条件", "每个场景都有业务负责人、替代方案、数据条件和停止条件；共同选择一个最小验证场景。"],
  ["第 7–10 周", "验证 1 个场景", "用真实任务检验假设", "在获准环境中比较原流程、流程改进和 AI 辅助，保留失败记录、人工复核与实际投入。"],
  ["第 11–13 周", "交付决策包", "继续、调整或停止", "提交研究结论、方法与移交资料；由华盛书面确认决策价值。匿名案例另行批准。"]
];

// 前期调研经验：只写行业大类、规律与方法，不写企业、数量、地点、系统与预算
const experiences = [
  {
    industry: "能源行业",
    topic: "施工安全视频识别",
    stage: "方案设计中",
    lesson: "先盘点已有设备，再决定加不加硬件",
    use: "进终端",
    seen: "需求方希望复用现场已有摄像头识别违章行为。真正决定方案的，是现有设备能否接入、现场能提供多少算力，以及识别之后由谁处理。",
    method: "一张设备与算力盘点清单；误报、漏报和人工复核的成本一起算；识别结果必须接到工单和处置流程，不停在“识别准不准”。",
    huasheng: "研究华盛的摄像头、行业终端与端云协同时，先用同一张清单看现有设备能做什么、缺什么，再判断是否需要新硬件。"
  },
  {
    industry: "高端制造",
    topic: "技术资料与报价",
    stage: "方案设计中",
    lesson: "同一份资料反复处理，最该先改",
    use: "进工具 · 进运营",
    seen: "同一份技术资料在报价、接单等多个环节被重复读取和录入，结果分散在个人表格里，最后都要人工审核。",
    method: "按环节记录输入、来源、修改与返工；AI 的输出必须附原文依据，由业务确认；先核对编号与版本，再谈自动化。",
    huasheng: "AI Pad 的“采集、核对、录入、确认”是同一类问题；串码、订单与出库签收的编号核对，也用这套方法。"
  },
  {
    industry: "多家央国企",
    topic: "知识库与内部工具",
    stage: "走访与现场考察",
    lesson: "工具做出来，不等于有人在用",
    use: "进服务",
    seen: "走访中多次看到：知识库和内部工具上线后，推广卡在迁移成本、资料上传意愿和上手门槛上，而不在技术上。",
    method: "把使用人数、使用频率和“不用的原因”放进评估口径；优先沿员工现有的工作入口增加能力，而不是另起一个平台。",
    huasheng: "与欢乐 FDE 一起整理上线成效时，同时看谁在用、怎么用、为什么不用，让对外案例经得起追问。"
  }
];
const directionExperience = [0, 1, 2, 1];

let page = "overview", step = 1, phase = 0, decisionTab = 0;
const pageIds = ["overview", "method", "delivery"];
const pageNames = ["研究方向", "研究示例", "90 天交付"];
const nextLabels = ["看我们怎么研究", "看 90 天交付", "回到研究方向"];

function render() {
  const hash = location.hash.slice(1);
  page = pageIds.includes(hash) ? hash : "overview";
  const i = pageIds.indexOf(page);
  $("main").innerHTML = `<section class="page page-${page}" aria-label="${pageNames[i]}">${page === "overview" ? overview() : page === "method" ? method() : delivery()}</section>`;
  document.querySelectorAll("[data-go]").forEach((b) => {
    b.classList.toggle("active", b.dataset.go === page);
    b.setAttribute("aria-current", b.dataset.go === page ? "step" : "false");
  });
  $("#page-count").textContent = `0${i + 1} / 03`;
  $("#prev").disabled = i === 0;
  $("#next").innerHTML = `${nextLabels[i]} <span>→</span>`;
  bindPage();
}

function overview() {
  const briefs = [
    { existing: "AI 编程本 · AI 眼镜<br>家庭屏 · 摄像头", question: "真实任务，<br>好不好用？", method: "2–3 款终端，同题实测", output: "评测报告 + 测试集" },
    { existing: "云智 AI Pad 展业版<br>FTTR 产品专家", question: "业务办理，<br>卡在哪一步？", method: "跟办新老员工，找卡点", output: "流程诊断 + 改进原型", example: true },
    { existing: "欢乐 FDE · iLab<br>eSIM 智能受理", question: "上线成效，<br>怎么讲给客户？", method: "整理 2–3 个应用案例", output: "可对外讲的效果案例" },
    { existing: "库存与商机看板<br>串码追踪 · 数据仓库", question: "现有数据，<br>能支持什么决策？", method: "一个地区、一类产品检查", output: "数据可用性报告" }
  ];
  return `<div class="hero centered"><h1>沿着 AI 四进，<em>把问题研究清楚。</em></h1><p class="lede">立足华盛已有业务，补充真实场景证据。</p></div>
  <div class="research-board">${briefs.map((b, i) => `<article class="research-column">
    <h2>${directions[i].name}</h2>
    <p class="existing">${b.existing}</p>
    <h3>${b.question}</h3>
    <p class="research-method">${b.method}</p>
    <div class="research-output"><span>交付</span><strong>${b.output}</strong></div>
    <div class="column-links"><button class="text-btn" data-direction="${i}">方法与科研力量 ↗</button>${b.example ? `<button class="text-btn strong" data-go-inline="method">看研究示例 →</button>` : ""}</div>
  </article>`).join("")}</div>
  <div class="experience">
    <div class="experience-intro"><p>前期企业调研</p><strong>十余家央国企走访</strong><span>能源、制造、零售、物流等行业</span></div>
    ${experiences.map((x, i) => `<button class="experience-item" data-experience="${i}"><span class="experience-meta">${x.industry} · ${x.topic}<em>${x.stage}</em></span><strong>${x.lesson}</strong><span class="experience-use">可用于 ${x.use} <b aria-hidden="true">↗</b></span></button>`).join("")}
  </div>
  <div class="proposer">
    <p class="proposer-label">提案方</p>
    <div class="proposer-main"><strong>项目发起团队</strong><span>拟与同济大学、浙江清华长三角研究院共同论证 AI 应用研究院</span></div>
    <ul class="proposer-terms"><li>数据不出华盛</li><li>不销售指定产品</li><li>每个阶段都可以停</li></ul>
  </div>`;
}

function method() {
  const briefs = [
    ["反复追问，重复记录", "整理需求，提示缺项"],
    ["跨页面找资料，向同事求助", "带出处检索，员工确认"],
    ["核对材料，来回补件", "提示缺项，保留人工核验"],
    ["多处填写，逐项检查", "生成字段草稿，人工确认"],
    ["反复解释资费和限制", "简明说明，附原文依据"],
    ["重复核对费用与材料", "汇总清单，标出差异"],
    ["整理附件，检查缺件", "辅助命名，提示缺件"]
  ];
  return `<div class="hero method-hero"><div><p class="scene-label">研究示例 · 进工具 · 云智 AI Pad 展业版</p><h1>新员工，能否<br><em>更快独立办业务？</em></h1></div><p class="method-thesis">跟完一次办理，<br>找到最值得改的那一步。</p></div>
  <div class="process"><div class="process-caption">一次业务办理 <span>点选步骤，查看研究切口</span></div><div class="steps">${flow.map((s, i) => `<button class="step ${i === step ? "selected" : ""}" data-step="${i}" aria-pressed="${i === step}"><small>${i + 1}</small>${s.name}</button>`).join("")}</div></div>
  <article class="step-detail"><div class="detail-heading"><span>正在研究</span><h2>${flow[step].name}</h2><button class="text-btn" id="step-research">展开研究设计 ↗</button></div><div class="work-contrast"><div><span>现在的重复工作</span><p>${briefs[step][0]}</p></div><div><span>AI 可以帮在哪</span><p>${briefs[step][1]}</p></div></div><div class="metric-focus"><span>用什么验证</span><strong>${flow[step].metric.split(" · ").join("<br>")}</strong></div></article>
  <div class="research-sequence"><span>先记基线</span><i aria-hidden="true">→</i><span>同题对照</span><i aria-hidden="true">→</i><span>算入复核与返工</span></div>
  <div class="below-note"><span>以上为研究假设，进场观察后逐项核实。</span><button class="text-btn" id="protocol">观察记录样张 ↗</button></div>`;
}

function delivery() {
  const outputs = ["流程记录、问题清单、业务基线", "3 个候选场景，选定 1 个验证", "同题比较，记录收益与失败", "问题、方案、证据、下一步建议"];
  return `<div class="hero centered"><h1>约 90 天后，<em>决定下一步怎么投。</em></h1><p class="lede">筛选三个场景，验证一个，交付决策依据。</p></div>
  <div class="timeline">${phases.map((p, i) => `<button class="phase ${i === phase ? "selected" : ""}" data-phase="${i}" aria-pressed="${i === phase}"><small>${p[0]}</small><strong>${p[1]}</strong></button>`).join("")}</div>
  <div class="phase-output"><span>阶段产出</span><strong>${outputs[phase]}</strong><button class="text-btn" id="phase-detail">展开 ↗</button></div>
  <div class="delivery-grid">
    <article class="decision"><div class="decision-top"><h2>决策包样张</h2><span>以「AI Pad · 新员工独立办理」为例</span></div>
      <div class="tabs" role="tablist" aria-label="决策包内容">${["问题与方案", "指标与门槛", "边界与交付"].map((t, i) => `<button role="tab" aria-selected="${i === decisionTab}" data-decision="${i}" class="${i === decisionTab ? "active" : ""}">${t}</button>`).join("")}</div>
      <div class="decision-content">${decisionContent()}</div>
      <div class="decision-footer"><span>样张为示例，具体内容按选定场景确定。</span></div>
    </article>
    <aside class="asks"><h2>这次，先确认三件事</h2><ol><li><b>1</b>认可研究方向</li><li><b>2</b>指定一名对接人</li><li><b>3</b>允许两次一线观察</li></ol><p>会后一周内提交《90 天首期研究方案》</p></aside>
  </div>
  <div class="below-note"><span>结论可以是继续、调整，也可以是停止。</span></div>`;
}

function decisionContent() {
  if (decisionTab === 0) return `<p class="decision-question">少求助、少用时，且不增加错误。</p><div class="comparison"><div><strong>原流程</strong><span>建立业务基线</span></div><div><strong>流程优化</strong><span>整理资料与清单</span></div><div><strong>AI 辅助</strong><span>检索有出处，人来确认</span></div></div>`;
  if (decisionTab === 1) return `<div class="thresholds"><div><span>完整办理用时</span><strong>缩短</strong></div><div><span>求助次数</span><strong>下降</strong></div><div><span>返工率</span><strong>不增加</strong></div></div><p class="decision-note">具体改善幅度在基线确定后共同设定。收益被复核抵消，或出现关键错误，就调整或停止。</p>`;
  return `<div class="boundary-summary"><div><strong>内部验证</strong><p>脱敏或合成任务，资料不外传</p></div><div><strong>交付与移交</strong><p>评测记录、成本风险、决策建议</p></div></div><p class="decision-note">业务负责人确认；对外案例另行审批。</p>`;
}

function go(id) {
  if (location.hash.slice(1) === id) render(); else location.hash = id;
  window.scrollTo({ top: 0, behavior: "instant" });
}

function bindPage() {
  document.querySelectorAll("[data-direction]").forEach((b) => (b.onclick = () => directionModal(+b.dataset.direction)));
  document.querySelectorAll("[data-experience]").forEach((b) => (b.onclick = () => experience(+b.dataset.experience)));
  document.querySelectorAll("[data-go-inline]").forEach((b) => (b.onclick = () => { step = 1; go(b.dataset.goInline); }));
  document.querySelectorAll("[data-step]").forEach((b) => (b.onclick = () => { step = +b.dataset.step; render(); }));
  document.querySelectorAll("[data-phase]").forEach((b) => (b.onclick = () => { phase = +b.dataset.phase; render(); }));
  document.querySelectorAll("[data-decision]").forEach((b) => (b.onclick = () => { decisionTab = +b.dataset.decision; render(); }));
  if ($("#protocol")) $("#protocol").onclick = protocol;
  if ($("#step-research")) $("#step-research").onclick = () => modal("研究示例 / 观察与验证", `<h2>${flow[step].name}</h2><h3>员工还在重复做什么</h3><p>${flow[step].work}</p><h3>AI 可以在哪里帮忙</h3><p>${flow[step].help}</p><h3>如何验证：${flow[step].metric}</h3><p>${flow[step].measure}</p><div class="source-item">跟办新员工与熟练员工，使用相同任务进行对照。<span>样本量、观察安排和指标门槛与华盛共同确定。</span></div>`);
  if ($("#phase-detail")) $("#phase-detail").onclick = () => modal(`${phases[phase][0]} / 阶段安排`, `<h2>${phases[phase][1]}</h2><p>${phases[phase][3]}</p>`);
}

function modal(kicker, html) {
  $("#dialog-kicker").textContent = kicker;
  $("#dialog-body").innerHTML = html;
  if (!$("#dialog").open) $("#dialog").showModal();
  $("#dialog").scrollTop = 0;
  $("#close-dialog").focus();
}

function directionModal(i) {
  const d = directions[i];
  modal(`${d.name} / 研究展开`, `<h2>${d.output}</h2><h3>华盛已有业务</h3><p>${d.existing}</p><h3>待验证的问题</h3><p>${d.gap}</p><h3>我们怎么研究</h3><p>${d.method}${d.detail}</p><ol>${d.steps.map((x) => `<li>${x}</li>`).join("")}</ol><h3>候选科研力量</h3><p>${d.resources}</p><h3>进入研究前需确认</h3><p>业务负责人、现有工作与资料、可接触的人员或样机、获准数据范围，以及华盛希望用结果做什么决定。</p><button class="dialog-action" id="related-experience">相关的前期调研经验 ↗</button>`);
  $("#related-experience").onclick = () => experience(directionExperience[i]);
}

function experience(i) {
  const x = experiences[i];
  modal("前期企业调研 / 可复用经验", `<span class="tag">${x.industry} · ${x.topic}</span><span class="tag muted">${x.stage}</span><h2 class="with-tag">${x.lesson}。</h2><h3>我们看到的情况</h3><p>${x.seen}</p><h3>沉淀下来的方法</h3><p>${x.method}</p><h3>用在华盛的${x.use}</h3><p>${x.huasheng}</p><div class="source-item">行业与细节均已脱敏。<span>具体项目可在双方签署保密约定后另行介绍。</span></div>`);
}

function protocol() {
  modal("研究工具 / 可复用模板", `<h2>一次办理，留下可核对的记录。</h2><p>按以下字段记录一次完整办理过程。</p><table class="metric-table"><tbody>${["任务编号 / 观察日期", "员工经验组别（不记录个人评价）", "开始 / 结束 / 等待时间", "发生在哪一步 / 求助与返工次数", "AI 建议 / 人工修改 / 原文依据", "失败情况 / 人工接管 / 处理结果", "研究判断 / 业务人员复核意见"].map((x) => `<tr><td>${x}</td><td>待现场记录</td></tr>`).join("")}</tbody></table><p class="table-note">相同任务、统一口径。不能把页面打开次数当成业务成功率。</p>`);
}

function sources() {
  modal("资料依据", `<h2>从已有业务出发。</h2><p>依据华盛官网公开资料与前期交流整理，进场后逐项核实。</p>
  <div class="source-item"><a href="https://www.vsens.com/newDetail?id=2000112" target="_blank" rel="noopener">华盛官网 · 云智 AI Pad 展业版 ↗</a><span>云智 AI Pad 功能资料。</span></div>
  <div class="source-item"><a href="https://www.vsens.com/newDetail?id=2000111" target="_blank" rel="noopener">华盛官网 · 终端应用测试实验室 ↗</a><span>已有质量、体验与安全评测；先对齐范围，再研究补充项。</span></div>
  <div class="source-item"><a href="https://www.vsens.com/aiapp/index.html" target="_blank" rel="noopener">华盛官网 · 人工智能应用服务 ↗</a><span>欢乐 FDE、iLab 与部署服务。</span></div>
  <div class="source-item"><a href="https://www.vsens.com/abity?index=2" target="_blank" rel="noopener">华盛官网 · 数智运营 ↗</a><span>看板、供应链与串码能力。</span></div>`);
}

function materials() {
  modal("补充资料 / 按需打开", `<h2>主线之外，按需展开。</h2><div class="supplement"><button id="open-sources">资料依据 ↗<small>华盛官网公开来源。</small></button><button id="open-backup">备用页：外部 AI 服务需求 ↗<small>只在讨论对外服务时打开。行业与场景均已匿名。</small></button></div>`);
  $("#open-sources").onclick = sources;
  $("#open-backup").onclick = backup;
}

function backup() {
  const rows = [
    ["工业与能源", "安全违章识别", "摄像头与边缘终端 + 连接 + 人工复核工单。先验证误报、漏报及现场适应。"],
    ["高端制造", "图纸辅助报价", "终端采集 + 企业内部资料 + 规则核价。模型只做辅助，正式报价由业务确认。"],
    ["企业财务", "报销材料预审", "材料识别 + 内部规则 + FDE 流程适配。权限、原文证据与人工确认贯穿流程。"],
    ["企业法务", "合同条款辅助检查", "企业知识 + 模型服务 + 引用核查。保留专业人员审查，不替代正式法律判断。"]
  ];
  modal("备用页 / 外部服务需求", `<h2>把外部需求，对应到华盛已有能力。</h2><p>以下为前期调研中接触到的需求类型，行业与场景均已匿名。</p><div class="backup-grid">${rows.map((x) => `<div><span class="tag">${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></div>`).join("")}</div>`);
}

document.querySelectorAll("[data-go]").forEach((b) => (b.onclick = () => go(b.dataset.go)));
$("#prev").onclick = () => go(pageIds[Math.max(0, pageIds.indexOf(page) - 1)]);
$("#next").onclick = () => go(pageIds[(pageIds.indexOf(page) + 1) % 3]);
$("#materials").onclick = materials;
$("#close-dialog").onclick = () => $("#dialog").close();
$("#dialog").addEventListener("click", (e) => {
  if (e.target !== $("#dialog")) return;
  const r = $("#dialog").getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) $("#dialog").close();
});
window.addEventListener("hashchange", render);
document.addEventListener("keydown", (e) => {
  if ($("#dialog").open || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
  if (e.key === "ArrowRight") { e.preventDefault(); go(pageIds[Math.min(2, pageIds.indexOf(page) + 1)]); }
  if (e.key === "ArrowLeft") { e.preventDefault(); go(pageIds[Math.max(0, pageIds.indexOf(page) - 1)]); }
});
render();
