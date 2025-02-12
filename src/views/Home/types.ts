export interface Agent {
  id: string;
  img: string;
  name: string;
  mcap: number;
  twitter: string;
  telegram: string;
  discord: string;
  token: string;
  created: number;
  verify: boolean;
  creditUsed: number;
  creditRemaining: number;
}