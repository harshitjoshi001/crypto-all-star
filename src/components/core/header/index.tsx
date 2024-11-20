import Dropdown from '@/components/dropdown';
import Tabs from '@/components/tabs';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

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
                    <li className="uppercase font-extrabold text-white hover:text-green-100"><Link href="">RoadMap</Link></li>
                    <li className="uppercase font-extrabold text-white hover:text-green-100"><Link href="">Tokenomics</Link></li>
                    <li className="uppercase font-extrabold text-white hover:text-green-100"><Link href="">How To Buy</Link></li>
                    <li className="uppercase font-extrabold text-white hover:text-green-100"><Link href="">FAQ</Link></li>
                    <li className="uppercase font-extrabold text-white hover:text-green-100"><Link href="">White Paper</Link></li>
                    <li className="uppercase font-extrabold text-white hover:text-green-100"><Link href="">Audit</Link></li>
                    <li className="uppercase font-extrabold text-white hover:text-green-100"><Link href="">All Memes</Link></li>
                    <li><Button label="Connect Wallet"></Button></li>
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
    </header>
  )
}

export default Header