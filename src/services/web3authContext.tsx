import { UX_MODE } from "@toruslabs/openlogin-utils";
import { WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";

import { chain } from "../config/chainConfig";

const clientId = "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig: chain.ethereum,
  },
});

const web3AuthOptions: Web3AuthOptions = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
};

const openloginAdapter = new OpenloginAdapter({
  loginSettings: {
    mfaLevel: "optional",
  },
  adapterSettings: {
    uxMode: UX_MODE.REDIRECT, // "redirect" | "popup"
    // mfaSettings: {
    //   deviceShareFactor: {
    //     enable: true,
    //     priority: 1,
    //     mandatory: true,
    //   },
    //   backUpShareFactor: {
    //     enable: true,
    //     priority: 2,
    //     mandatory: false,
    //   },
    //   socialBackupFactor: {
    //     enable: true,
    //     priority: 3,
    //     mandatory: false,
    //   },
    //   passwordFactor: {
    //     enable: true,
    //     priority: 4,
    //     mandatory: false,
    //   },
    // },
  },
});

const walletServicesPlugin = new WalletServicesPlugin({
  wsEmbedOpts: {},
  walletInitOptions: { whiteLabel: { showWidgetButton: true, buttonPosition: "bottom-right" } },
});

const web3AuthContextConfig = {
  web3AuthOptions,
  adapters: [openloginAdapter],
  plugins: [walletServicesPlugin],
};

export default web3AuthContextConfig;
