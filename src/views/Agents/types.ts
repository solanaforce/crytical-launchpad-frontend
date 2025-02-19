export enum CreateFormView {
  Prompt,
  Tokens
}

export interface AgentPrompt {
  agentType: "Safe" | "Neutral" | "Wild";
  name: string;
  description: string;
  personality: string;
  instruction: string;
}

export interface AgentEditPrompt extends AgentPrompt {
  id: string
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
  agentType: string;
  description: string;
  personality: string;
  instruction: string;
  knowledge: string;
  knowledgeLink: string;
  token: string;
  owner: string;
  status: string;
  logo: string;
  isVerified: false;
  social: {
    twitter: string;
    telegram: string;
    discord: string;
    website: string;
  }
  createdAt: number;
  settings: {
    twitter?: {
      agentType?: string,
      accessToken?: string,
      refreshToken?: string,
      profileId?: string,
      profileName?: string,
      profileUserName?: string
    },
    telegram?: {
      botType?: string,
      botName?: string,
      botUserName?: string,
      goal?: string,
      botFatherAPIKey?: string
    },
    discord?: {
      apiKey?: string
    }
  },
  creditUsed: number;
  creditRemaining: number;
}