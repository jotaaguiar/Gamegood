import React from 'react';
import { useRouter } from 'next/router';
import { Tooltip, Button } from '@chakra-ui/react';
import useTranslation from 'hooks/useTranslation';

const LocaleButton = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { pathname, asPath, query } = router;

  const handleLocaleChange = () => {
    const value = router.locale === 'fr' ? 'en' : 'fr';

    router.push({ pathname, query }, asPath, {
      locale: value,
    });
  };

  return (
    <Tooltip
      hasArrow
      rounded='sm'
      label={t(router.locale === 'fr' ? 'nav.toggle_english' : 'nav.toggle_french')}
      aria-label={t('nav.toggle_locale')}
    >
      <Button
        size='sm'
        variant='solid'
        aria-label={t('nav.toggle_locale')}
        colorScheme='gray'
        onClick={handleLocaleChange}
      >
        {t('nav.button')}
      </Button>
    </Tooltip>
  );
};

export default LocaleButton;
