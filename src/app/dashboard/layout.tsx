import Dropdown from '@/components/dropdown';
import Tabs from '@/components/tabs';
import { ReactNode } from 'react';

interface MyComponentProps {
  children: ReactNode;
}

const RootLayout: React.FC<MyComponentProps> = ({ children }) => {
  return (
    <>
      <div>
        <nav className="flex justify-between items-center h-11 bg-custom-pink">
          <div className="ml-9 text-white font-bold">Logo</div>
          <ul className="flex justify-between items-center space-x-5 p-10 cursor-pointer">
            <li className="text-white">RoadMap</li>
            <li className="text-white">Tokenomics</li>
            <li className="text-white">How To Buy</li>
            <li className="text-white">FAQ</li>
            <li className="text-white">White Paper</li>
            <li className="text-white">Audit</li>
            <li className="text-white">All Memes</li>
            <li className="text-white">Wallet</li>
            <li className="text-white">Language</li>
          </ul>
        </nav>
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <Tabs />
          <Dropdown />
        </div>
        {children}
      </div>
    </>
  );
};
export default RootLayout;
