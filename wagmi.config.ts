import { defineConfig } from "@wagmi/cli";
import { hardhat, react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [],
  plugins: [
    react(),
    hardhat({
      project: "../smart-contract",
      commands: {
        build: "yarn hardhat compile",
      },
    }),
  ],
});
