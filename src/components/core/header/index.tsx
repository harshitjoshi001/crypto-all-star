'use client';

import { Wallet } from '@/app/constants/const';
import Modal from '@/components/Modal';
import Tabs from '@/components/tabs';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItemProps,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi';
import WalletOption from '../wallet';
import {
  detectDevice,
  getBrowserName,
  getParamWithoutCookie,
} from '@/lib/utils';
import { QRCodeSVG } from 'qrcode.react';
import { Providers } from '@/app/providers';
import Dropdown from '@/components/dropdown';
import ArrowDown from '../../../../public/icon/ArrowDown';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { connectors, connect } = useConnect();
  const [isBestWalletOpen, setIsBestWalletOpen] = useState(false);
  const isMobile = detectDevice();
  const isSafari = getBrowserName() === 'safari';
  const [qrGeneratorUri, setQrGeneratorUri] = useState('');
  const [showBestWalletQR, setShowBestWalletQR] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    if (isConnected) {
      setIsOpen(false);
    }
  }, [isConnected]);

  useEffect(() => {
    if (!isBestWalletOpen) return;

    const getListenWalletConnectEvent = async () => {
      const provider: any = await connectors[3]?.getProvider();
      connect({ connector: connectors[3] });
      if (provider) {
        debugger;
        provider.on('display_uri', (walletUri: string) => {
          const bwUrl = getParamWithoutCookie('bwUrl');
          const link = document.createElement('a');
          setIsOpen(false);
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

  const walletOptions = () => {
    return supportedConnectors.map(({ connector, name, id }) => (
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
          <nav className="flex md:flex-wrap justify-between items-center py-4 px-4 md:px-0">
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

            <button
              onClick={() => {
                setIsMobileMenuOpen((prev) => !prev);
              }}
              className="text-[30px] cursor-pointer md:hidden"
            >
              <Image
                src="/images/menu.png"
                alt="Menu"
                width={40}
                height={40}
                priority
              />
            </button>

            <div
              className={`top-[70px] bg-pink-100 left-0 duration-500 absolute md:static md:w-auto w-full md:h-auto h-[85vh] md:items-center px-5 md:py-0 py-5  
              lg:flex lg:w-auto lg:order-1 justify-between items-center space-x-5 cursor-pointer ${isMobileMenuOpen ? 'flex' : 'hidden'}`}
              id="mobile-menu-2"
            >
              <ul className="flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-8 mt-4 font-medium lg:mt-0">
                <li className="uppercase font-extrabold text-white hover:text-green-100">
                  <Link href="">RoadMap</Link>
                </li>
                <li className="uppercase font-extrabold text-white hover:text-green-100">
                  <Link href="">Tokenomics</Link>
                </li>
                <li className="uppercase font-extrabold text-white hover:text-green-100">
                  <Link href="">How To Buy</Link>
                </li>
                <li className="uppercase font-extrabold text-white hover:text-green-100">
                  <Link href="">FAQ</Link>
                </li>
                <li className="uppercase font-extrabold text-white hover:text-green-100">
                  <Link href="">White Paper</Link>
                </li>
                <li className="uppercase font-extrabold text-white hover:text-green-100">
                  <Link href="">Audit</Link>
                </li>
                <li className="uppercase font-extrabold text-white hover:text-green-100">
                  <Link href="">All Memes</Link>
                </li>
                <li>
                  <Button
                    label="Connect Wallet"
                    onClick={() => setIsOpen(true)}
                    className="py-3"
                  ></Button>
                </li>
                <li className="uppercase font-extrabold relative z-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <span className="flex items-center gap-2 text-white">
                        {' '}
                        EN{' '}
                        <Image
                          src="/images/en-img.svg"
                          alt="Language"
                          width={24}
                          height={24}
                          priority
                        />
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <div className="w-[220px] max-h-[270px] overflow-y-auto p-0 bg-pink-100 z-[2] mt-5 rounded border border-white">
                        <DropdownMenuItem className="rounded text-white p-2 hover:text-green-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize">
                          <Image
                            src="/images/ar.svg"
                            alt="Flag"
                            width={25}
                            height={25}
                            className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
                          />
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded text-white p-2 hover:text-green-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize">
                          <Image
                            src="/images/ar.svg"
                            alt="Flag"
                            width={25}
                            height={25}
                            className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
                          />
                          Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded text-white p-2 hover:text-green-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize">
                          <Image
                            src="/images/ar.svg"
                            alt="Flag"
                            width={25}
                            height={25}
                            className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
                          />
                          Team
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded text-white p-2 hover:text-green-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize">
                          <Image
                            src="/images/ar.svg"
                            alt="Flag"
                            width={25}
                            height={25}
                            className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
                          />
                          Subscription
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded text-white p-2 hover:text-green-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize">
                          <Image
                            src="/images/ar.svg"
                            alt="Flag"
                            width={25}
                            height={25}
                            className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
                          />
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded text-white p-2 hover:text-green-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize">
                          <Image
                            src="/images/ar.svg"
                            alt="Flag"
                            width={25}
                            height={25}
                            className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
                          />
                          Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded text-white p-2 hover:text-green-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize">
                          <Image
                            src="/images/ar.svg"
                            alt="Flag"
                            width={25}
                            height={25}
                            className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
                          />
                          Team
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded text-white p-2 hover:text-green-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize">
                          <Image
                            src="/images/ar.svg"
                            alt="Flag"
                            width={25}
                            height={25}
                            className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
                          />
                          Subscription
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              </ul>
            </div>
          </nav>
          <div className="md:flex items-center justify-between border-t border-gray-300/[.5] pt-5 hidden">
            <div className="mb-[-9px]">
              <Tabs />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="mb-[14px] text-black relative text-xl min-w-[230px] z-[1] uppercase font-extrabold cursor-pointer px-4 flex items-center justify-between">
                <Image
                  src="/images/dropdown.png"
                  alt="Button Logo"
                  layout="fill"
                  priority
                  className="absolute inset-0 z-[-1]"
                />
                <div className="flex items-center my-2 text-black-100">
                  <Image
                    src="/images/ar.svg"
                    alt="Flag"
                    width={25}
                    height={25}
                    className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
                  />
                  BASE
                </div>
                <ArrowDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="relative min-w-[230px] p-[10px] bg-green-50 rounded-lg border-2 border-green-100">
                {/* <Image
                  src="/images/dropdown.png"
                  alt="Button Logo"
                  layout="fill"
                  priority
                  className="absolute inset-0 z-[-1]"
                /> */}
                <DropdownMenuItem className="rounded font-extrabold text-black-100 p-2 hover:text-pink-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize">
                  <Image
                    src="/images/ar.svg"
                    alt="Flag"
                    width={25}
                    height={25}
                    className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
                  />
                  Subscription
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded font-extrabold text-black-100 p-2 hover:text-pink-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize">
                  <Image
                    src="/images/ar.svg"
                    alt="Flag"
                    width={25}
                    height={25}
                    className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
                  />
                  Subscription
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded font-extrabold text-black-100 p-2 hover:text-pink-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize">
                  <Image
                    src="/images/ar.svg"
                    alt="Flag"
                    width={25}
                    height={25}
                    className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
                  />
                  Subscription
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
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
      {walletConnect()}
      <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <div className="flex flex-col space-y-5">{walletOptions()}</div>
      </Modal>
    </header>
  );
};

export default Header;
