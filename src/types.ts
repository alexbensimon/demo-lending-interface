export type Token = {
  name: "USDC" | "DAI";
  imgUrl: string;
};

export type Pool = {
  id: string;
  token: Token;
  yieldProvider: string;
  apy: number;
  tvl: number;
};
