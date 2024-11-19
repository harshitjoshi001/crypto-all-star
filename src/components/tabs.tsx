'use client';

import { useState } from 'react';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="flex space-x-8">
      <button
        className={`py-2 px-4 text-lg font-semibold ${activeTab === 1 ? 'text-white' : 'text-white/[.5] hover:text-white'}`}
        onClick={() => setActiveTab(1)}
      >
        Stake
      </button>
      <button
        className={`py-2 px-4 text-lg font-semibold ${activeTab === 2 ? 'text-white' : 'text-white/[.5] hover:text-white'}`}
        onClick={() => setActiveTab(2)}
      >
        Last Meme Standing
      </button>
      <button
        className={`py-2 px-4 text-lg font-semibold ${activeTab === 3 ? 'text-white' : 'text-white/[.5] hover:text-white'}`}
        onClick={() => setActiveTab(3)}
      >
        Staking History
      </button>
    </div>
  );
};

export default Tabs;
