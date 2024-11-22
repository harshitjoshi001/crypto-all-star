'use client';

import { useEffect, useState } from 'react';
import Modal from './Modal';
import { Button } from './ui/button';
import { useAccount, useSwitchChain } from 'wagmi';

interface DropdowmInterface {
  options?: {
    value: string;
  };
}

const Dropdown: React.FC<DropdowmInterface> = ({ options }) => {
  const [dropdownOpen, setToggleDropdown] = useState(false);
  const [value, setValue] = useState<any>(11155111);
  const [isOpen, setIsOpen] = useState(false);
  const { switchChain, switchChainAsync } = useSwitchChain();
  const { chain, chainId } = useAccount();

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
      <button
        onClick={() => setToggleDropdown((prev) => !prev)}
        className="py-2 px-4 text-lg font-semibold text-gray-500 hover:text-gray-700"
      >
        Dropdown
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          <ul>
            <li
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => setValue(11155111)}
            >
              Ethereum
            </li>
            <li
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => setValue(84531)}
            >
              Base
            </li>
            <li
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => setValue(97)}
            >
              Binance
            </li>
          </ul>
        </div>
      )}
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
