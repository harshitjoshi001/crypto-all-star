'use client';

import { useEffect, useState } from 'react';
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

interface DropdowmInterface {
  options?: {
    value: string;
  };
}

const coinValues: any = {
  11155111: 'Ethereum',
  84531: 'Base',
  97: 'Binance',
};

const Dropdown: React.FC<DropdowmInterface> = ({ options }) => {
  const [value, setValue] = useState<any>(11155111);
  const [isOpen, setIsOpen] = useState(false);
  const { switchChain, switchChainAsync } = useSwitchChain();
  const { chainId } = useAccount();

  useEffect(() => {
    if (chainId) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [value]);

  const handleSwitch = async () => {
    await switchChain({ chainId: value });
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
            {coinValues[value]}
          </div>
          <ArrowDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="relative min-w-[230px] p-[10px] bg-white rounded-lg border-2 border-pink-100">
          <DropdownMenuItem
            onClick={() => setValue(11155111)}
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
            onClick={() => setValue(84531)}
            className="rounded font-extrabold text-black-100 p-2 text-pink-100 hover:outline-0 flex items-center focus-visible:ring-transparent focus-visible:ring-0 capitalize"
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
            onClick={() => setValue(97)}
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
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          <h1>You will have to switch the chain , want to switch ?</h1>
          <div className="flex justify-around">
            <Button label="Cancel" onClick={() => setIsOpen(false)} />
            <Button label="Switch" onClick={handleSwitch} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dropdown;
