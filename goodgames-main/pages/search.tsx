import React, { useEffect } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useTranslation from 'hooks/useTranslation';
import { Heading, Text, Box, Flex, Icon, Image, Spinner, SimpleGrid } from '@chakra-ui/react';
import Link from 'components/shared/Link';
import { containerProps } from 'styles/theme';
import useSWR, { Fetcher } from 'swr';
import { useRouter } from 'next/router';
import { IoStar } from 'react-icons/io5';

const SearchPage: NextPage = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const fetcher: Fetcher<Game[], string> = async (...args: string[]) => {
    const res = await fetch(args[0]);
    return await res.json();
  };

  const { data, error } = useSWR<Game[], Error>(`/api/search?term=${router.query.term}`, fetcher);

  useEffect(() => {
    if (router.isReady && !router.query.term) {
      router.push('/');
    }
    if (error) {
      router.push('/404');
    }
  }, [router, error]);

  return (
    <>
      <Head>
        <title>{t('search.meta.title')}</title>
        <meta name='description' content={t('home.meta.description')} />
      </Head>

      <Box as='main' m='0 auto' w='full' pt={{ base: 24, md: 44 }} maxW='full'>
        <Flex {...containerProps} direction='column' align='center' mb={{ base: 16, md: 44 }}>
          <Heading as='h1' mb={4}>
            {`${t('search.title')} ${router.query.term || ''}`}
          </Heading>
        </Flex>

        {!error && !data ? (
          <Flex direction='column' align='center' gap={2} {...containerProps}>
            <Spinner />
            <Text>{t('search.loading')}</Text>
          </Flex>
        ) : null}

        <SimpleGrid
          {...containerProps}
          columns={{ base: 1, md: 2 }}
          spacing={6}
          pb={{ base: 12, md: 16 }}
        >
          {data?.map((game) => (
            <Link href={`/game?id=${game.id}`} key={game.id} bare>
              <Flex
                {...containerProps}
                gap={8}
                border='2px solid'
                borderColor='gray.200'
                rounded='lg'
                p={4}
                transition='box-shadow 150ms ease'
                _hover={{ shadow: 'lg' }}
                direction='column'
                w='full'
              >
                <Box w='full' h={64}>
                  <Image
                    alt={game.name}
                    src={game?.cover}
                    rounded='md'
                    w='full'
                    h='full'
                    objectFit='cover'
                  />
                </Box>

                <Flex direction={{ base: 'column', sm: 'row' }} justify='space-between'>
                  <Text fontWeight='bold' fontSize='xl' mb={2}>
                    {game?.name}
                  </Text>

                  <Flex gap={2} mb={2}>
                    <Icon as={IoStar} fontSize='2xl' color='yellow.500' />
                    <Text fontWeight='bold' fontSize='lg'>
                      {game?.rating}/5
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Link>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default SearchPage;

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};
