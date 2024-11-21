'use client';
import Dropdown from '@/components/dropdown';
import Modal from '@/components/Modal';
import Tabs from '@/components/tabs';
import React, { ReactNode, useEffect, useState } from 'react';
import {
  Connector,
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi';
import { Providers } from '../providers';
import { Button } from '@/components/ui/button';
import { detectDevice, getBrowserName, getParamWithoutCookie } from '@/lib/utils';
import {Wallet} from '../constants/const';
import { QRCodeSVG } from 'qrcode.react';

interface MyComponentProps {
  children: ReactNode;
}

function WalletOption({
  connector,
  onClick,
  name
}: {
  connector: Connector;
  onClick: () => void;
  name: string
}) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button
      disabled={!ready}
      className="rounded bg-gray-400 p-4"
      onClick={onClick}
    >
      {name}
    </button>
  );
}



const RootLayout: React.FC<MyComponentProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { connectors, connect, status, error } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  const [isBestWalletOpen , setIsBestWalletOpen] = useState(false);
  const [qrGeneratorUri, setQrGeneratorUri] = useState('');

  const isMobile = detectDevice();
  const isSafari = getBrowserName() === 'safari'

  

  useEffect(() => {
    if (!isBestWalletOpen) return;

    const getListenWalletConnectEvent = async () => {
      const provider: any = await connectors[3]?.getProvider();
      connect({connector: connectors[3]})
      if (provider) {
        debugger
        provider.on('display_uri', (walletUri: string) => {
          const bwUrl = getParamWithoutCookie('bwUrl');
          const link = document.createElement('a');
          setIsOpen(false);
          setIsBestWalletOpen(false)
          const urlParams = `${walletUri}&callbackUrl=${
            window.location.href
          }&browser=${getBrowserName()}`;
          link.href = `${process.env.NEXT_PUBLIC_BWDEEPLINK}${urlParams}`;
          if (!isMobile) {
            setQrGeneratorUri(walletUri);
          } else if (bwUrl && bwUrl !== '') {
            link.href = `${bwUrl}${urlParams}`;
            link.click();
          } else {
            link.click();
          }
        });
      }
    };

    getListenWalletConnectEvent();
  }, [isMobile, isBestWalletOpen, connectors]);

  console.log(connectors , "connectors")

  const supportedConnectors = [
    {
      id: 'metamask',
      name: Wallet.META_MASK,
      connector: connectors[0],
    },
    {
      id: 'walletconnect',
      name: Wallet.WALLET_CONNECT,
      connector: connectors[1],
    },
    {
      id: 'coinbase',
      name: Wallet.COINBASE,
      connector: connectors[2]
    },{
      id: 'bestwallet',
      name: Wallet.BEST_WALLET,
      connector: connectors[3],
    }
  ].filter(
    connector => !(isSafari && !isMobile && connector.id === 'MetaMask'),
  );

  console.log(supportedConnectors , "supportedddd")

  const walletOptions = () => {
    return supportedConnectors.map(({ connector , name , id}) => (
      <WalletOption
        connector={connector}
        key={id}
        onClick={() => {
          if (name === Wallet.BEST_WALLET) {
            setIsBestWalletOpen(true);
          } else{connect({ connector })
          }}
          }
        name={name}
      />
    ));
  };

  const walletConnect = () => {
    if (isConnected) {
      return (
        <Providers>
          {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
          {address && (
            <div>{ensName ? `${ensName} (${address})` : address}</div>
          )}
          <button onClick={() => disconnect()} className="bg-red-500 p-3 m-2">
            Disconnect
          </button>
        </Providers>
      );
    }
  };

  return (
    <>
      <div>
        {children}
      </div>
    </>
  );
};
export default RootLayout;
