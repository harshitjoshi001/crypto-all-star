import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

function App() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href="/about">{t('about')}</Link>
    </div>
  );
}

export default App;
