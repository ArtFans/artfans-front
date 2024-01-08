import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42]
});

const walletconnect = new WalletConnectConnector({
    rpcUrl: `https://mainnet.infura.io/v3/dd46b125e3554d7a8112da223e6a062d`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true
});

const walletlink = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/dd46b125e3554d7a8112da223e6a062d`,
    appName: "web3-react-demo"
});

export const connectors = {
    injected: injected,
    walletConnect: walletconnect,
    coinbaseWallet: walletlink
};
