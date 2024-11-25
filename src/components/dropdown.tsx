'use client';

import { useContext, useEffect, useState } from 'react';
import Modal from './Modal';
import { Button } from './ui/button';
import { useAccount, useSwitchChain } from 'wagmi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import ArrowDown from '../../public/icon/ArrowDown';
import { ChainContext } from '@/app/[locale]';

interface DropdowmInterface {
  options?: {
    value: string;
  };
}

const coinValues: any = {
  11155111: 'Ethereum',
  84532: 'Base',
  97: 'Binance',
};

const Dropdown: React.FC<DropdowmInterface> = ({ options }) => {
  const [value, setValue] = useState<any>(11155111);
  const [isOpen, setIsOpen] = useState(false);
  const { switchChainAsync } = useSwitchChain();
  const { currentChain, setCurrentChain } = useContext(ChainContext);
  const { isConnected } = useAccount();

  const handleSwitch = async () => {
    console.log('entered');
    await switchChainAsync({ chainId: value });
    setCurrentChain(value);
    setIsOpen(false);
  };

  const handleChange = (id: string | number | null) => {
    if (!isConnected) {
      setCurrentChain(Number(id));
    } else {
      setIsOpen(true);
      setValue(id);
    }
  };

  return (
    <div className="relative">
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
            {coinValues[`${currentChain}`]}
          </div>
          <ArrowDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="relative min-w-[230px] p-[10px] bg-white rounded-lg border-2 border-pink-100">
          <DropdownMenuItem
            onClick={() => handleChange(11155111)}
            className="rounded font-extrabold text-black-100 p-2 text-pink-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize"
          >
            <Image
              src="/images/ar.svg"
              alt="Flag"
              width={25}
              height={25}
              className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
            />
            Ethereum
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleChange(84532)}
            className="rounded font-extrabold text-black-100 p-2 hover:text-pink-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize"
          >
            <Image
              src="/images/ar.svg"
              alt="Flag"
              width={25}
              height={25}
              className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
            />
            Base
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleChange(97)}
            className="rounded font-extrabold text-black-100 p-2 text-pink-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize"
          >
            <Image
              src="/images/ar.svg"
              alt="Flag"
              width={25}
              height={25}
              className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
            />
            Binance
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isConnected && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div>
            <h1>You will have to switch the chain , want to switch ?</h1>
            <div className="flex justify-around">
              <Button
                label="Cancel"
                onClick={() => {
                  setValue(currentChain);
                  setIsOpen(false);
                }}
              />
              <Button label="Ok" onClick={handleSwitch} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dropdown;
