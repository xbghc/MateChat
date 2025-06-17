import type { LLMModelsConfig } from "./types";

export const MODEL_CONFIGS = {
  stream: true,
  enableMock: true,
};

export enum LLMProviders {
  SILICON_FLOW = "siliconflow",
  DEEP_SEEK = "deepseek",
  QWEN = "qwen",
}

export enum LLMClientKey {
  openai = "openai",
}

export const LLM_MODELS: LLMModelsConfig[] = [
  {
    // 硅基流动
    providerKey: LLMProviders.SILICON_FLOW,
    apiPath: "https://api.siliconflow.cn/v1",
    apiKey: "",
    models: [
      { name: "deepseek-ai/DeepSeek-R1", iconPath: "/deepseek-color.svg" },
      { name: "Qwen/Qwen3-8B", iconPath: "/qwen.svg" },
    ],
    available: true,
    clientKey: LLMClientKey.openai,
  },
  {
    // deepseek
    providerKey: LLMProviders.DEEP_SEEK,
    apiPath: "https://api.deepseek.com",
    apiKey: "",
    models: [
      { name: "deepseek-chat", iconPath: "/deepseek-color.svg" },
      { name: "deepseek-reasoner", iconPath: "/deepseek-color.svg" },
    ],
    available: true,
    clientKey: LLMClientKey.openai,
  },
];
