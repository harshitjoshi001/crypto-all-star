'use client'

import { Wallet } from '@/app/constants/const';
import Dropdown from '@/components/dropdown';
import Modal from '@/components/Modal';
import Tabs from '@/components/tabs';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import WalletOption from '../wallet';
import { detectDevice, getBrowserName, getParamWithoutCookie } from '@/lib/utils';
import { QRCodeSVG } from 'qrcode.react';
import { Providers } from '@/app/providers';

const Header = () => {

  const [isOpen , setIsOpen] = useState(false);
  const { connectors , connect } = useConnect();
  const [isBestWalletOpen , setIsBestWalletOpen] = useState(false);
  const isMobile = detectDevice();
  const isSafari = getBrowserName() === 'safari';
  const [qrGeneratorUri,setQrGeneratorUri] = useState('');
  const [showBestWalletQR , setShowBestWalletQR] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });


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

  useEffect(() => {
    if(isConnected){
      setIsOpen(false)
    }
  }, [isConnected])

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
          setShowBestWalletQR(true)
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
    <header className="header bg-pink-100">
      <div className="container mx-auto">
        <div className="row">
          <nav className="flex md:flex-wrap justify-between items-center py-4">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo.gif"
                  alt="Logo"
                  width="110"
                  height="46"
                  className=""
                  priority
                />
              </Link>
              {/* mobile header  */}
                {/* <MobileAuthHeader /> */}
              {/* desktop header  */}
              <div
                className="hidden w-full lg:flex lg:w-auto lg:order-1 justify-between items-center space-x-5 cursor-pointer"
                id="mobile-menu-2"
              >
                <ul className="flex flex-col items-center mt-4 font-medium lg:flex-row lg:space-x-4 lg:mt-0">
                    <li className="uppercase font-extrabold text-white hover:text-green-100"><Link href="">RoadMap</Link></li>
                    <li className="uppercase font-extrabold text-white hover:text-green-100"><Link href="">Tokenomics</Link></li>
                    <li className="uppercase font-extrabold text-white hover:text-green-100"><Link href="">How To Buy</Link></li>
                    <li className="uppercase font-extrabold text-white hover:text-green-100"><Link href="">FAQ</Link></li>
                    <li className="uppercase font-extrabold text-white hover:text-green-100"><Link href="">White Paper</Link></li>
                    <li className="uppercase font-extrabold text-white hover:text-green-100"><Link href="">Audit</Link></li>
                    <li className="uppercase font-extrabold text-white hover:text-green-100"><Link href="">All Memes</Link></li>
                    <li><Button label="Connect Wallet" onClick={() => setIsOpen(true)}></Button></li>
                    <li className="uppercase font-extrabold text-white hover:text-green-100"><Link href="">Language</Link></li>
                </ul>
              </div>
          </nav>
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
    
          <Tabs />
          <Dropdown />
        </div>
        </div>
      </div>
      {qrGeneratorUri && (
            <Modal isOpen={showBestWalletQR} onClose={() => setShowBestWalletQR(false)}>
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
         {walletConnect()} 
      <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
          <div className="flex flex-col space-y-5">{walletOptions()}</div>
        </Modal>
    </header>
  )
}

export default Header;
