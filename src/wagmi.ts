import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import {
  coinbaseWallet,
  metaMask,
  walletConnect,
} from 'wagmi/connectors';

export const uriConnector  = () =>  walletConnect({
  showQrModal: false,
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string,
})



export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia],
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
      [mainnet.id]: http(
        'https://eth-mainnet.g.alchemy.com/v2/RrHqwHBQgmEyVTjR-rDBp4rTwNSfeMgi'
      ),
      [sepolia.id]: http(
        'https://eth-sepolia.g.alchemy.com/v2/RrHqwHBQgmEyVTjR-rDBp4rTwNSfeMgi'
      ),
    },
  });
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
