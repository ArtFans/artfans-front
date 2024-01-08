import  {useContext, useEffect, useState} from "react";
import {
    VStack,
    Button,
    Text,
    HStack,
    Image
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { networkParams } from "./networks";
import { connectors } from "./connectors";
import { toHex, truncateAddress } from "./utils";
import ApiService from 'src/services/ApiService';
import { UserContext } from 'src/providers/UserProvider';
export default function Home(any) {
    const {
        library,
        chainId,
        account,
        activate,
        deactivate,
        active
    } = useWeb3React();
    const { setLoggedIn} = useContext<any>(UserContext);
    const [signature, setSignature] = useState("");
    const [error, setError] = useState("");
    const [network, setNetwork] = useState(undefined);
    const [setMessage] = useState("");
    const [signedMessage, setSignedMessage] = useState("");
    const [verified, setVerified] = useState();

    useEffect(() => {
        const provider = window.localStorage.getItem("provider");
        if (provider) activate(connectors[provider]);
    }, []);
    useEffect( () => {
        const provider = window.localStorage.getItem("pre_provider");
        if (provider && !verified && active) {
            connectors[provider]
                .isAuthorized()
                .then(async(isAuthorized) => {
                    let signature = await signMessage('artfans_signature_key');
                    if (signature && signature.length > 0) {
                        let result = await ApiService.login(account, signature);
                        if (result && result.id != undefined) {
                            setVerified(true);
                            switchNetwork(1);
                            if (window.userAddress.toLowerCase() != account.toLowerCase()) {
                                setTimeout(() => {
                                    document.location.href = '/';
                                }, 200);
                            }
                            window.userAddress = account;
                            window.localStorage.setItem("provider", window.localStorage.getItem("pre_provider"));

                        }
                    }
                });
        }
    });

    const handleNetwork = (e) => {
        const id = e.target.value;
        setNetwork(Number(id));
    };

    const handleInput = (e) => {
        const msg = e.target.value;
        setMessage(msg);
    };

    const switchNetwork = async () => {
        try {
            await library.provider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: toHex(network) }]
            });
        } catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    await library.provider.request({
                        method: "wallet_addEthereumChain",
                        params: [networkParams[toHex(network)]]
                    });
                } catch (error) {
                    setError(error);
                }
            }
        }
    };

    const signMessage = async (message) => {
        if (!library) return;
        try {
            if (localStorage.getItem(account+'_'+message)) {
                return localStorage.getItem(account+'_'+message);
            }
            const signature = await library.provider.request({
                method: "personal_sign",
                params: [message, account]
            });
            setSignedMessage(message);
            setSignature(signature);
            localStorage.setItem(account+'_'+message, signature);
            return signature;
        } catch (error) {
            setError(error);
        }
    };

    const verifyMessage = async () => {
        if (!library) return;
        try {
            const verify = await library.provider.request({
                method: "personal_ecRecover",
                params: [signedMessage, signature]
            });
            setVerified(verify === account.toLowerCase());

        } catch (error) {
            setError(error);
        }
    };

    const refreshState = () => {
        window.localStorage.setItem("provider", undefined);
        setNetwork("");
        setMessage("");
        setSignature("");
        setVerified(undefined);
    };
    const setProvider = (type) => {
        setNetwork(1);
        window.localStorage.setItem("pre_provider", type);
    };
    const disconnect = () => {
        refreshState();
        deactivate();
    };


    return (
        <>

            <VStack justifyContent="center" alignItems="center">
                Let's connect with
                <HStack>
                    {!active ? (
                        <div>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    activate(connectors.coinbaseWallet);
                                    setProvider("coinbaseWallet");
                                }}
                                w="100%"
                            >
                                <HStack w="100%" justifyContent="center">
                                    <Image
                                        src="/images/cbw.png"
                                        alt="Coinbase Wallet Logo"
                                        width={25}
                                        height={25}
                                        borderRadius="3px"
                                    />
                                    <Text>Coinbase Wallet</Text>
                                </HStack>
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    activate(connectors.walletConnect);
                                    setProvider("walletConnect");
                                }}
                                w="100%"
                            >
                                <HStack w="100%" justifyContent="center">
                                    <Image
                                        src="/images/wc.png"
                                        alt="Wallet Connect Logo"
                                        width={26}
                                        height={26}
                                        borderRadius="3px"
                                    />
                                    <Text>Wallet Connect</Text>
                                </HStack>
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    activate(connectors.injected);
                                    setProvider("injected");
                                }}
                                w="100%"
                            >
                                <HStack w="100%" justifyContent="center">
                                    <Image
                                        src="/images/mm.png"
                                        alt="Metamask Logo"
                                        width={25}
                                        height={25}
                                        borderRadius="3px"
                                    />
                                    <Text>Metamask</Text>
                                </HStack>
                            </Button>
                        </div>
                    ) : (
                        <Button onClick={disconnect}>Disconnect</Button>
                    )}
                </HStack>
                <VStack justifyContent="center" alignItems="center" padding="10px 0">
                    <HStack>
                        <Text>{`Connection Status: `}</Text>
                        {active ? (
                            <CheckCircleIcon color="green" />
                        ) : (
                            <WarningIcon color="#cd5700" />
                        )}
                    </HStack>

                    <Tooltip label={account} placement="right">
                        <Text>{`Account: ${truncateAddress(account)}`}</Text>
                    </Tooltip>
                    <Text>{`Network ID: ${chainId ? chainId : "No Network"}`}</Text>
                </VStack>
                <Text>{error ? error.message : null}</Text>
            </VStack>
        </>
    );
}
