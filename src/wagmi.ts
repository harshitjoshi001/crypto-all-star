import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { mainnet, sepolia , baseSepolia , base , bsc , bscTestnet} from 'wagmi/chains';
import {
  coinbaseWallet,
  metaMask,
  walletConnect,
} from 'wagmi/connectors';

let chains : any = [];

chains = process.env.NODE_ENV === 'production' ? [...chains , mainnet , base ] : [...chains , baseSepolia , sepolia ]  ;
 
export function getConfig() {
  return createConfig({
    chains: [sepolia , baseSepolia],
    connectors: [
      metaMask(),
      walletConnect({
        projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string,
      }),
      coinbaseWallet(),
      walletConnect({
        showQrModal: false,
        projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string,
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http(process.env.NEXT_PUBLIC_ETHEREUM_ALCHEMY_MAIN_RPC_ENDPOINT),
      [sepolia.id]: http( process.env.NEXT_PUBLIC_ETHEREUM_ALCHEMY_TEST_RPC_ENDPOINT ),
      [base.id]: http(process.env.NEXT_PUBLIC_BASE_ALCHEMY_MAIN_RPC_ENDPOINT),
      [baseSepolia.id]: http(process.env.NEXT_PUBLIC_BASE_ALCHEMY_RPC_TEST_ENDPOINT),
      // [opBNB.id]: http(process.env.NEXT_PUBLIC_BNB_ALCHEMY_MAIN_RPC_ENDPOINT),
      // [opBNBTestnet.id]: http(process.env.NEXT_PUBLIC_BNB_ALCHEMY_RPC_TEST_ENDPOINT)
    },
  });
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
