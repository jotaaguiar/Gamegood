import React, { useEffect } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useTranslation from 'hooks/useTranslation';
import { Heading, Text, Box, Flex, Image, SimpleGrid, Spinner } from '@chakra-ui/react';
import Link from 'components/shared/Link';
import { containerProps } from 'styles/theme';
import useSWR, { Fetcher } from 'swr';
import { useRouter } from 'next/router';

const Browse: NextPage = () => {
  const { t } = useTranslation('common');

  const router = useRouter();

  const fetcher: Fetcher<Game[], string> = async (...args: string[]) => {
    const res = await fetch(args[0]);
    return await res.json();
  };

  const { data, error } = useSWR<Game[], Error>('/api/games', fetcher);

  useEffect(() => {
    if (error) {
      router.push('/404');
    }
  }, [router, error]);

  return (
    <>
      <Head>
        <title>{t('browse.meta.title')}</title>
        <meta name='description' content={t('browse.meta.description')} />
      </Head>

      <Box as='main' bgColor='gray.800' py={{ base: 12, md: 16 }} minH='full'>
        <Flex {...containerProps} py={{ base: 12, md: 16 }} direction='column' align='center'>
          <Heading as='h1' color='white' mb={4}>
            {t('browse.title')}
          </Heading>
          <Text fontSize='lg' color='gray.300'>
            {t('browse.subtitle')}
          </Text>
        </Flex>

        {!error && !data ? (
          <Flex direction='column' align='center' gap={2} color='white'>
            <Spinner />
            <Text>{t('browse.loading')}</Text>
          </Flex>
        ) : null}

        <SimpleGrid
          {...containerProps}
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing={2}
          pb={{ base: 12, md: 16 }}
        >
          {data?.map((game) => (
            <Link href={`/game?id=${game.id}`} key={game.id} bare>
              <Image
                alt={game.name}
                src={game.cover}
                rounded='md'
                h={40}
                objectFit='cover'
                w='full'
              />
            </Link>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Browse;

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};
