'use client';

import Modal from './Modal';
import Tabs from '@/components/tabs';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useAccount, useDisconnect, useEnsName } from 'wagmi';
import { WalletOptions } from './core/wallet';
import { Providers } from '@/app/providers';
import Dropdown from '@/components/dropdown';
import { LanguagesSelector } from '@/components/LanguageSelector';
import { useTranslations } from 'next-intl';
import { ChainContext } from '@/app/[locale]';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { chain, chainId } = useAccount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChainSwitch, setIsChainSwitch] = useState(false);
  const t = useTranslations('Header');
  const modal = useTranslations('Modals');
  const { currentChain, setCurrentChain } = useContext(ChainContext);

  useEffect(() => {
    if (isConnected) {
      setIsOpen(false);
    }
  }, [isConnected]);

  useEffect(() => {
    if (chainId && chain) {
      setIsChainSwitch(true);
    }
  }, [chainId]);

  const shouldModalOpen = !!chainId && isChainSwitch;

  const walletConnect = () => {
    if (isConnected) {
      return (
        <Providers>
          {address && (
            <div>{ensName ? `${ensName} (${address})` : address}</div>
          )}
          <button onClick={() => disconnect()} className="bg-red-500 p-3 m-2">
            {modal('Disconnect')}
          </button>
        </Providers>
      );
    }
  };

  const renderSwitchModal = () => {
    if (!chain && chainId) {
      return (
        <>
          <h3>
            You connected to unsupported chain , do you want to disconnect ?
          </h3>
          <div className="flex justify-around">
            <Button
              label="Ok"
              onClick={async () => {
                disconnect();
                setIsChainSwitch(false);
              }}
            />
            <Button label="Cancel" onClick={() => setIsChainSwitch(false)} />
          </div>
        </>
      );
    } else if (chainId) {
      return (
        <>
          <h3>{modal('SwitchChain')}</h3>
          <div className="flex justify-around">
            <Button label="Ok" onClick={async () => {}} />
            <Button label="Cancel" />
          </div>
        </>
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
              className={`left-0 top-[70px] bg-pink-100 duration-500 absolute md:static md:w-auto w-full md:h-auto h-[89vh] md:items-center px-5 md:py-0 py-5  
              lg:flex lg:w-auto lg:order-1 justify-between items-center space-x-5 cursor-pointer flex md:hidden ${isMobileMenuOpen ? 'left-0' : 'left-[-100%]'}`}
              id="mobile-menu-2"
            >
              <ul className="flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-8 mt-4 font-medium lg:mt-0">
                <li className="uppercase font-extrabold text-white hover:text-green-100">
                  <Link href="">{t('RoadMap')}</Link>
                </li>
                <li className="uppercase font-extrabold text-white hover:text-green-100">
                  <Link href="">{t('Tokenomics')}</Link>
                </li>
                <li className="uppercase font-extrabold text-white hover:text-green-100">
                  <Link href="">{t('HowToBuy')}</Link>
                </li>
                <li className="uppercase font-extrabold text-white hover:text-green-100">
                  <Link href="">{t('FAQ')}</Link>
                </li>
                <li className="uppercase font-extrabold text-white hover:text-green-100">
                  <Link href="">{t('WhitePaper')}</Link>
                </li>
                <li className="uppercase font-extrabold text-white hover:text-green-100">
                  <Link href="">{t('Audit')}</Link>
                </li>
                <li className="uppercase font-extrabold text-white hover:text-green-100">
                  <Link href="">{t('AllMemes')}</Link>
                </li>
                <li>
                  <Button
                    label={
                      address
                        ? `${address.slice(0, 4)}...${address.slice(-4)}`
                        : t('ConnectWallet')
                    }
                    onClick={() => setIsOpen(true)}
                    className="px-4 py-2 text-white rounded transition"
                  />
                </li>
                <LanguagesSelector />
              </ul>
            </div>
          </nav>
          <div className="md:flex items-center justify-between border-t border-gray-300/[.5] pt-5 hidden">
            <div className="mb-[-9px]">
              <Tabs />
            </div>
            <Dropdown />
          </div>
        </div>
      </div>
      {walletConnect()}
      <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <div className="flex flex-col space-y-5">
          <WalletOptions />
        </div>
      </Modal>
      <Modal isOpen={false} onClose={() => setIsChainSwitch(false)}>
        {renderSwitchModal()}
      </Modal>
    </header>
  );
};

export default Header;
