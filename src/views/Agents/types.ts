export enum CreateFormView {
  Prompt,
  Tokens
}

export interface AgentPrompt {
  mode: 0 | 1 | 2;
  name: string;
  description: string;
  personality: string;
  instruction: string;
}

export interface AgentToken {
  address: string;
}

export enum AgentView {
  Telegram,
  Discord,
  Twitter,
  Tiktok,
  Twitch,
  BindToken,
  CreateToken,
  Knowledge,
  Webpage,
  API,
  Prompt,
  Scenario
}

export interface Agent {
  id: string;
  name: string;
  src: string;
  isVerified: false;
  telegram: string;
  discord: string;
  twitter: string;
  token: string;
  description: string;
  personality: string;
  Instruction: string;
}