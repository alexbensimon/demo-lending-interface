import "./polyfills";

import { ConnectKitProvider, getDefaultClient } from "connectkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { createClient, WagmiConfig } from "wagmi";
import App from "./App";
import { contractInfo } from "./contractInfo";
import "./index.css";

const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY as string;

const client = createClient(
  getDefaultClient({
    appName: "Lending protocol",
    alchemyId: ALCHEMY_API_KEY,
    chains: [contractInfo.chain],
  }),
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="soft">
        <App />
      </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
);
