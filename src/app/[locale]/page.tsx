import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

function App() {
  const t = useTranslations('HomePage');
  return (
    <div className='container mx-auto'>
      <Image
        src="/images/banner.png"
        alt="banner img"
        width={1360}
        height={100}
        className="w-100 h-100 mt-5"
      />
      {/* <h1>{t('title')}</h1>
      <Link href="/about">{t('about')}</Link> */}
    </div>
  );
}

export default App;
