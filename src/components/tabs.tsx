'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import DollarIcon from '../../public/icon/DollarIcon';
import CupIcon from '../../public/icon/CupIcon';

const Tabs = ({ variant }: { variant?: string }) => {
  const [activeTab, setActiveTab] = useState(1);
  const t = useTranslations('Header');
  const styles: { [key: string]: string } = {
    primary: 'flex space-x-8',
    secondary: '',
  };
  const btnStyles: { [key: string]: string } = {
    primary: '',
    secondary: '',
  };

  return (
    <div className={styles[variant || 'primary']}>
      <button
        className={`group py-2 px-4 text-lg font-semibold border-b-4 border-transparent uppercase flex items-center
          ${activeTab === 1 ? 'border-white text-white' : 'text-white/[.5] hover:text-white hover:border-white'}`}
        onClick={() => setActiveTab(1)}
      >
        <DollarIcon
          className={`mr-2 group-hover:text-pink-100 group-hover:fill-white ${activeTab === 1 ? 'text-pink-100 fill-white' : 'text-white'}`}
        />
        {t('Stake')}
      </button>
      <button
        className={`group py-2 px-4 text-lg font-semibold border-b-4 border-transparent uppercase flex items-center
          ${activeTab === 2 ? 'border-white text-white' : 'text-white/[.5] hover:text-white hover:border-white'}`}
        onClick={() => setActiveTab(2)}
      >
        <CupIcon
          className={`mr-2 text-white group-hover:text-pink-100 group-hover:fill-white ${
            activeTab === 2
              ? 'text-pink-100 fill-white'
              : 'text-white fill-pink-100'
          }`}
        />
        {t('LastMemeStanding')}
      </button>
      <button
        className={`group py-2 px-4 text-lg font-semibold border-b-4 border-transparent uppercase flex items-center
          ${activeTab === 3 ? 'border-white text-white' : 'text-white/[.5] hover:text-white hover:border-white'}`}
        onClick={() => setActiveTab(3)}
      >
        <DollarIcon
          className={`mr-2 group-hover:text-pink-100 group-hover:fill-white ${activeTab === 3 ? 'text-pink-100 fill-white' : 'text-white'}`}
        />
        {t('StakingHistory')}
      </button>
    </div>
  );
};

export default Tabs;
