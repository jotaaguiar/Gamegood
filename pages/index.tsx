import { containerProps } from 'styles/theme';
import { Heading, Text, Box, Flex, Image, SimpleGrid, Button, Skeleton } from '@chakra-ui/react';
import { IoArrowForwardSharp } from 'react-icons/io5';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'components/shared/Link';
import React from 'react';
import SearchBar from 'components/shared/SearchBar';
import type { NextPage, GetStaticProps } from 'next';
import useSWR, { Fetcher } from 'swr';
import useTranslation from 'hooks/useTranslation';

const Home: NextPage = () => {
  const { t } = useTranslation('common');

  const fetcher: Fetcher<Game[], string> = async (...args: string[]) => {
    const res = await fetch(args[0]);
    return await res.json();
  };

  const { data, error } = useSWR<Game[], Error>('/api/games', fetcher);

  return (
    <>
      <Head>
        <title>{t('home.meta.title')}</title>
        <meta name='description' content={t('home.meta.description')} />
      </Head>

      <Box as='main' m='0 auto' w='full' pt={{ base: 24, md: 44 }} maxW='full'>
        <Flex {...containerProps} direction='column' align='center' mb={{ base: 16, md: 44 }}>
          <Heading as='h1' mb={4}>
            {t('home.title')}
          </Heading>

          <Text fontSize='lg' mb={12}>
            {t('home.subtitle')}
          </Text>

          <SearchBar
            chakraProps={{ maxWidth: 'xl', size: 'lg' }}
            placeholder={t('home.search.placeholder')}
          />
        </Flex>

        {error ? null : (
          <Box bgColor='gray.800' mt={{ base: 12, md: 16 }} pb={{ base: 12, md: 16 }}>
            <Flex {...containerProps} py={{ base: 12, md: 16 }} direction='column' align='center'>
              <Heading as='h2' color='white' mb={4}>
                {t('home.popular_games.title')}
              </Heading>
              <Text fontSize='lg' color='gray.300'>
                {t('home.popular_games.subtitle')}
              </Text>
            </Flex>

            <SimpleGrid
              {...containerProps}
              columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
              spacing={{ base: 2, md: 4 }}
              pb={{ base: 12, md: 16 }}
            >
              {!data
                ? Array(12)
                    .fill(null)
                    .map((item, index) => (
                      <Skeleton key={`skeleton-screenshot-${index}`} height={40} w='full' />
                    ))
                : data?.slice(0, 12).map((game) => (
                    <Link href={`/game?id=${game.id}`} bare key={game.id}>
                      <Image
                        alt='Screenshot'
                        src={game.cover}
                        rounded='md'
                        w='full'
                        h={40}
                        objectFit='cover'
                      />
                    </Link>
                  ))}
            </SimpleGrid>

            <Flex {...containerProps} direction='column' align='center'>
              <Link href='/browse' bare>
                <Button size='lg' colorScheme='brand' rightIcon={<IoArrowForwardSharp />}>
                  {t('home.popular_games.button')}
                </Button>
              </Link>
            </Flex>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};
