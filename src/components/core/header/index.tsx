'use client';
import Dropdown from '@/components/dropdown';
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
import React from 'react';

const Header = () => {
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
                  <Button label="Connect Wallet" className="py-3"></Button>
                </li>
                <li className="uppercase font-extrabold text-white hover:text-green-100">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <span className="flex items-center gap-2">
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
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              </ul>
            </div>
          </nav>
          <div className="flex items-center justify-between border-t border-gray-300/[.5] pt-5">
            <Tabs />
            <Dropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
