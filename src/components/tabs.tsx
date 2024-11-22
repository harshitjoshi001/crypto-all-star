'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const t = useTranslations('Header');

  return (
    <div className="flex space-x-8">
      <button
        className={`py-2 px-4 text-lg font-semibold border-b-4 border-transparent uppercase
          ${activeTab === 1 ? 'border-white text-white' : 'text-white/[.5] hover:text-white hover:border-white'}`}
        onClick={() => setActiveTab(1)}
      >
        {t('Stake')}
      </button>
      <button
        className={`py-2 px-4 text-lg font-semibold border-b-4 border-transparent uppercase
          ${activeTab === 2 ? 'border-white text-white' : 'text-white/[.5] hover:text-white hover:border-white'}`}
        onClick={() => setActiveTab(2)}
      >
        {t('LastMemeStanding')}
      </button>
      <button
        className={`py-2 px-4 text-lg font-semibold border-b-4 border-transparent uppercase
          ${activeTab === 3 ? 'border-white text-white' : 'text-white/[.5] hover:text-white hover:border-white'}`}
        onClick={() => setActiveTab(3)}
      >
        {t('StakingHistory')}
      </button>
    </div>
  );
};

export default Tabs;
