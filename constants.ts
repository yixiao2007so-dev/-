export const APP_TITLE = "⚡ 趣味电路实验室 ⚡";

export const SERIES_INFO = {
  title: "串联电路 (Series Circuit)",
  description: "就像这群小灯泡在排队过独木桥，只有一条路可以走！",
  analogy: "想象一下水流在一根管子里流，如果管子中间堵住了（开关断开），水就流不过去了。",
  features: [
    "电流只有一条路径",
    "开关控制所有电器",
    "如果一个灯泡坏了，其他的都不亮",
    "灯泡越多，分到的电压越少，灯越暗"
  ],
  formula: "I = I₁ = I₂ (电流处处相等)\nU = U₁ + U₂ (总电压等于各分电压之和)"
};

export const PARALLEL_INFO = {
  title: "并联电路 (Parallel Circuit)",
  description: "就像有很多条车道的高速公路，这条堵了可以走那条！",
  analogy: "想象几根水管并排接在大水管上，关掉其中一根水龙头，不影响其他水管出水。",
  features: [
    "电流有多条路径（支路）",
    "各支路互不影响",
    "家里的电灯、电视全是并联的",
    "每个支路两端的电压都相等"
  ],
  formula: "U = U₁ = U₂ (各支路电压相等)\nI = I₁ + I₂ (干路电流等于各支路电流之和)"
};

export const AI_SYSTEM_INSTRUCTION = `
你是一位幽默风趣、富有耐心的物理老师，专门给12岁的中国孩子讲解电路知识。
你的名字叫“爱因斯坦喵”。
请用简单、形象的比喻（比如水流、交通）来解释复杂的物理概念。
回答要简短精炼，多用emoji，语气要鼓励和夸奖。
只回答与物理、电路、科学相关的问题。
`;
