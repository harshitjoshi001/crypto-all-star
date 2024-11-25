'use client';

import Modal from '../Common/Modal';
import Tabs from '@/components/tabs';
import { Button } from '@/components/UI/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useAccount, useDisconnect, useEnsName, useSwitchChain } from 'wagmi';
import { WalletOptions } from '../Core/wallet';
import Dropdown from '../Common/Dropdown';
import { LanguagesSelector } from '@/components/LanguageSelector';
import { useTranslations } from 'next-intl';
import { ChainContext } from '@/app/[locale]';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { chain, chainId } = useAccount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { switchChainAsync } = useSwitchChain();
  const t = useTranslations('Header');
  const modal = useTranslations('Modals');
  const [isChainSupported, setIsChainSupported] = useState(false);
  const { currentChain, setCurrentChain } = useContext(ChainContext);

  useEffect(() => {
    if (isConnected && !chain) {
      setIsChainSupported(true);
    } else if (isConnected && chain) {
      setIsChainSupported(true);
    }
  }, [chain]);

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
                setIsChainSupported(false);
                await switchChainAsync({ chainId: currentChain });
              }}
            />
            <Button
              label="Cancel"
              onClick={async () => {
                await switchChainAsync({ chainId: currentChain });
                setIsChainSupported(false);
              }}
            />
          </div>
        </>
      );
    } else if (chainId) {
      return (
        <>
          <h3>{modal('SwitchChain')}</h3>
          <div className="flex justify-around">
            <Button label="Ok" onClick={async () => setCurrentChain(chainId)} />
            <Button label="Cancel" onClick={() => setIsChainSupported(false)} />
          </div>
        </>
      );
    }
  };

  return (
    <header className="header bg-pink-100">
      <div className="container mx-auto">
        <div className="row">
          <nav className="flex lg:flex-wrap justify-between items-center py-4 px-4 md:px-0">
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
              className="text-[30px] cursor-pointer lg:hidden"
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
              className={`left-0 top-[70px] bg-pink-100 duration-500 absolute lg:static w-full lg:h-auto h-[89vh] lg:items-center px-5 lg:py-0 py-5  
              lg:w-auto lg:order-1 justify-between items-center space-x-5 cursor-pointer flex ${isMobileMenuOpen ? 'left-0' : 'left-[-100%]'}`}
              id="mobile-menu-2"
            >
              <ul className="flex lg:flex-row flex-col lg:items-center lg:gap-[2vw] gap-8 mt-4 font-medium lg:mt-0">
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
                    className="px-4 py-2 text-white rounded transition "
                  />
                </li>
                <LanguagesSelector />
              </ul>
            </div>
          </nav>
          <div className="md:flex items-center justify-between border-t border-gray-300/[.5] pt-5 hidden">
            <div className="mb-[-10px]">
              <Tabs />
            </div>
            <Dropdown />
          </div>
        </div>
      </div>
      <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <div className="flex flex-col space-y-5">
          <WalletOptions />
        </div>
      </Modal>
      <Modal
        isOpen={isChainSupported}
        onClose={async () => {
          setIsChainSupported(false);
          await switchChainAsync({ chainId: currentChain });
        }}
      >
        {renderSwitchModal()}
      </Modal>
    </header>
  );
};

export default Header;
