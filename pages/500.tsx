import React from 'react';
import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';

import { Flex, Box, Heading, Button, Text } from '@chakra-ui/react';
import Link from 'components/shared/Link';
import { containerProps } from 'styles/theme';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useTranslation from 'hooks/useTranslation';

const Page500: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{`500 ${t('meta.partial_title')}`}</title>
        <meta name='description' content={t('home.meta.description')} />
      </Head>

      <Flex
        {...containerProps}
        align='center'
        justify='center'
        pt={{ base: 24, md: 32 }}
        pb={{ base: 16, md: 20 }}
        minH='calc(100vh - 80px)'
      >
        <Box w='full'>
          <Heading as='h1'>{t('500.title')}</Heading>
          <Text my={8}>{t('500.description')}</Text>
          <Link href='/' bare>
            <Button colorScheme='brand'>{t('500.button')}</Button>
          </Link>
        </Box>
      </Flex>
    </>
  );
};

export default Page500;

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};
