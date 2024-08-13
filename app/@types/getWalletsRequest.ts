export interface GetUsers {
  walletAddress: string;
  networkId: string;
  winRate: number;
  netProfit: number;
  avgHoldingTime: number;
  buyAmountLabel: string;
  totalScore: number;
  age: number;
  dayActive: number;
  SwapTime: string[]; // array of strings representing ISO date strings
  TotalFee: number | null;
  BotActivity: string;
  details: string;
  totalnumPartiallyClosedData: number;
  totalNumofFullyOpenedData: number;
  totalTransactions: number;
  HotTokenHolders: any[]; // assuming it's an array but the type isn't clear from the data
  firstTopTokenHolder: string;
  rank: number;
}

export type GetWalletsRequest = GetUsers[];


