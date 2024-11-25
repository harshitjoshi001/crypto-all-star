'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import WalletIcon from '../../../../public/icon/Wallet';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-purple-100 p-6 rounded-lg shadow-lg max-w-sm w-full">
          <div className="flex justify-center items-center mb-4">
            <h3 className="text-center text-white w-full m-auto font-semibold font-lg">
              Connect Wallet
            </h3>
            <button onClick={onClose} className="text-black m-3 ml-auto">
              <Image
                src="/images/close-white.svg"
                alt="Close"
                width="25"
                height="25"
                className=""
                priority
              />
            </button>
          </div>
          <div>{children}</div>
          <Link
            href="/"
            className="group border border-white/[.3] text-white flex items-center justify-center w-full mt-4 px-3 pt-2 py-3 font-bold uppercase"
          >
            <WalletIcon className="mr-2 mt-1 text-transparent  group-hover:text-white transition-colors duration-300" />
            I don’t have a wallet
          </Link>
        </div>
      </div>
    </>
  );
};

export default Modal;
