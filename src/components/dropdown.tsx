'use client';

import { useEffect, useState } from 'react';
import Modal from './modal';
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
  const [currentChain, setCurrentChain] = useState(11155111);
  const { chainId, chain } = useAccount();

  useEffect(() => {
    sessionStorage.setItem('current_chain_id', JSON.stringify(11155111));
  }, []);

  useEffect(() => {
    if (chainId) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [value]);

  useEffect(() => {
    if (!chainId) {
      console.log('called');
    }
  }, [chainId]);

  const handleSwitch = async () => {
    await switchChainAsync({ chainId: value });
    setIsOpen(false);
    sessionStorage.setItem('current_chain_id', JSON.stringify(value));
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
              src="/images/dropdownIcons/Ethereum.svg"
              alt="Flag"
              width={25}
              height={25}
              className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
            />
            {coinValues[value]}
          </div>
          <ArrowDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="relative min-w-[230px] p-[10px] bg-white rounded-lg border-2 border-pink-10 mt-3">
        <DropdownMenuItem
            onClick={() => setValue(97)}
            className="rounded font-extrabold uppercase p-2 text-black hover:text-pink-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 "
          >
            <Image
              src="/images/dropdownIcons/Binance.svg"
              alt="Flag"
              width={25}
              height={25}
              className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
            />
            Binance
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setValue(11155111)}
            className="rounded font-extrabold uppercase p-2 text-black hover:text-pink-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 "
          >
            <Image
              src="/images/dropdownIcons/Ethereum.svg"
              alt="Flag"
              width={25}
              height={25}
              className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
            />
            Ethereum
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setValue(84532)}
            className="rounded font-extrabold uppercase p-2 text-black hover:text-pink-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 "
          >
            <Image
              src="/images/dropdownIcons/Coinbase.svg"
              alt="Flag"
              width={25}
              height={25}
              className="mr-2 border-2 border-white rounded-full overflow-hidden object-cover h-[25px]"
            />
            Coinbase
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
    </div>
  );
};

export default Dropdown;
