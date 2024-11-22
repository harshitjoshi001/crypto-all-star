import { Wallet } from '@/app/constants/const';
import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import {
  detectDevice,
  getBrowserName,
  getParamWithoutCookie,
} from '@/lib/utils';
import { QRCodeSVG } from 'qrcode.react';
import React, { useEffect, useState } from 'react';
import { Connector, useAccount, useConnect, useDisconnect } from 'wagmi';

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
      className="rounded bg-gray-400 p-4"
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export const WalletOptions = () => {
  const { connectors, connect } = useConnect();
  const isMobile = detectDevice();
  const isSafari = getBrowserName() === 'safari';
  const [isBestWalletOpen, setIsBestWalletOpen] = useState(false);
  const [showBestWalletQR, setShowBestWalletQR] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [qrGeneratorUri, setQrGeneratorUri] = useState('');
  const { chainId } = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (!isBestWalletOpen) return;

    const getListenWalletConnectEvent = async () => {
      console.log('called');
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
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h3>Do you want to disconnect ?</h3>
        <Button label="Cancel" onClick={() => setIsOpen(false)} />
        <Button label="Disconnect" onClick={() => disconnect()} />
      </Modal>
    );
  }

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
              connect({ connector });
            }
          }}
          name={name}
        />
      ))}
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
