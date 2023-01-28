import { Pool, Token } from "./types";

export const tokens: { [key: string]: Token } = {
  usdc: {
    name: "USDC",
    imgUrl: "src/assets/usdc.svg",
  },
  dai: {
    name: "DAI",
    imgUrl: "src/assets/dai.svg",
  },
};

export const pools: Pool[] = [
  {
    id: "9aaac509-3a5e-4b95-976f-5c0c99f41a45",
    token: tokens.usdc,
    yieldProvider: "Lushly",
    apy: 17.0,
    tvl: 124000,
  },
  {
    id: "975f85d6-f917-4525-9962-0efd22131dd9",
    token: tokens.usdc,
    yieldProvider: "Anvil",
    apy: 22.3,
    tvl: 97000,
  },
  {
    id: "4ec3c33e-a04d-47d2-8f91-ccc8cfce972e",
    token: tokens.dai,
    yieldProvider: "Scenic",
    apy: 8.5,
    tvl: 4532000,
  },
];
