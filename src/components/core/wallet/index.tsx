import { Wallet } from '@/app/constants/const';
import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import {
  detectDevice,
  getBrowserName,
  getParamWithoutCookie,
} from '@/lib/utils';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import React, { useEffect, useState } from 'react';
import {
  Connector,
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from 'wagmi';

function WalletOption({
  connector,
  onClick,
  name,
}: {
  connector: Connector;
  onClick: () => void;
  name: string;
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
      className="relative text-xl min-w-[140px] z-[1] uppercase font-extrabold cursor-pointer text-white px-4 min-h-[60px] flex items-center"
      onClick={onClick}
    >
      <Image
        src="/images/pink-btn.png"
        alt="Button Image"
        layout="fill"
        priority
        className="absolute inset-0 z-[-1]"
      />
      <span className="mb-3 text-lg">{name}</span>
      <Image
        // src={`/images/connectWallet/${item?.id}.svg`}
        src="/images/metamask.svg"
        alt="logo"
        width="24"
        height="24"
        className="mb-3 ml-auto mr-3"
      />
    </button>
  );
}

export const WalletOptions = ({
  setIsOpen,
}: {
  setIsOpen: (boolean: boolean) => void;
}) => {
  const { connectors, connect, connectAsync } = useConnect();
  const isMobile = detectDevice();
  const isSafari = getBrowserName() === 'safari';
  const [isBestWalletOpen, setIsBestWalletOpen] = useState(false);
  const [showBestWalletQR, setShowBestWalletQR] = useState(false);
  const [qrGeneratorUri, setQrGeneratorUri] = useState('');
  const { chainId } = useAccount();
  const { disconnect, disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const [isOpen, setIsOpen] = useState(false);
  const currentSelectedChain = sessionStorage.getItem('current_chain_id');

  useEffect(() => {
    if (!isBestWalletOpen) return;

    const getListenWalletConnectEvent = async () => {
      const provider: any = await connectors[3]?.getProvider();
      connect({ connector: connectors[3] });
      if (provider) {
        provider.on('display_uri', (walletUri: string) => {
          const bwUrl = getParamWithoutCookie('bwUrl');
          const link = document.createElement('a');
          setIsBestWalletOpen(false);
          setShowBestWalletQR(true);
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
      connector: connectors[2],
    },
    {
      id: 'bestwallet',
      name: Wallet.BEST_WALLET,
      connector: connectors[3],
    },
  ].filter(
    (connector) => !(isSafari && !isMobile && connector.id === 'MetaMask')
  );

  if (chainId) {
    return (
      <>
        <h3>Do you want to disconnect ?</h3>
        <div className="flex justify-around">
          <Button label="Cancel" onClick={() => setIsOpen(false)} />
          <Button
            label="Ok"
            onClick={() => {
              disconnect();
            }}
          />
        </div>
      </>
    );
  }

  const handleWalletConnection = async (wallet: Connector) => {
    try {
      const provider = await wallet.getProvider();
      if (isConnected) {
        await disconnectAsync();
      }

      if (!provider && isMobile && typeof window !== 'undefined') {
        const metaMaskDeepLink = `https://metamask.app.link/dapp/${window.origin}`;
        window.location.href = metaMaskDeepLink;
        return;
      }

    

      const response = await connectAsync({
        connector: wallet,
      });
    } catch (error) {
      // handleError(error);
      console.log(error, 'errorrrrr');
    }
  };

  return (
    <>
      {supportedConnectors.map(({ connector, name, id }) => (
        <WalletOption
          connector={connector}
          key={id}
          onClick={() => {
            if (name === Wallet.BEST_WALLET) {
              setIsBestWalletOpen(true);
            } else {
              // connect({ connector });
              handleWalletConnection(connector);
            }
          }}
          name={name}
        />
      ))}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <></>
      </Modal>
      {qrGeneratorUri && (
        <Modal
          isOpen={showBestWalletQR}
          onClose={() => setShowBestWalletQR(false)}
        >
          <QRCodeSVG
            value={qrGeneratorUri ? qrGeneratorUri : ''}
            width="100%"
            height="100%"
            level="M"
            fgColor={'black'}
            id="qrCodeEl"
            imageSettings={{
              src: '/images/connectWallet/BestWallet.svg',
              height: 33,
              width: 33,
              excavate: false,
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default WalletOption;
