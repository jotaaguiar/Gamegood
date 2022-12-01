import React, { FC, useEffect } from 'react';
import type { GetStaticProps } from 'next';
import useTranslation from 'hooks/useTranslation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import useSWR, { Fetcher } from 'swr';
import { useRouter } from 'next/router';
import {
  Heading,
  Text,
  Box,
  Flex,
  Icon,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
} from '@chakra-ui/react';

import { IoStar } from 'react-icons/io5';

import { containerProps } from 'styles/theme';

const GameDetailsPage: FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const fetcher: Fetcher<Game, string> = async (...args: string[]) => {
    const res = await fetch(args[0]);
    return await res.json();
  };

  const { data, error } = useSWR<Game, Error>(`/api/game?id=${router.query.id}`, fetcher);

  useEffect(() => {
    if (error || (router.isReady && !router.query.id)) {
      router.push('/404');
    }
  }, [router, error]);

  return (
    <>
      <Head>
        <title>{`${data?.name || 'Game'} ${t('meta.partial_title')}`}</title>
        <meta name='description' content={t('home.meta.description')} />
      </Head>

      <Box as='main' m='0 auto' w='full' pt={{ base: 24, md: 44 }} maxW='full'>
        <Flex
          {...containerProps}
          mb={{ base: 16, md: 24 }}
          gap={8}
          maxW='3xl'
          direction='column'
          align='center'
        >
          {!data ? (
            <Skeleton w='full' h={96} />
          ) : (
            <Box w='full' h={96}>
              <Image
                alt={data?.name}
                src={data?.cover}
                rounded='md'
                w='full'
                h='full'
                objectFit='cover'
              />
            </Box>
          )}

          <Box w='full'>
            {!data ? (
              <Skeleton h={12} w={96} mb={4} />
            ) : (
              <Heading as='h1' size='xl' mb={4}>
                {data?.name}
              </Heading>
            )}

            {!data ? (
              <Skeleton h={6} w={20} mb={4} />
            ) : (
              <Flex gap={2} mb={2}>
                <Icon as={IoStar} fontSize='2xl' color='yellow.500' />
                <Text fontWeight='bold' fontSize='lg'>
                  {data?.rating}/5
                </Text>
              </Flex>
            )}

            {!data ? (
              <Stack mb={12}>
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
              </Stack>
            ) : (
              <Text fontSize='lg' mb={12}>
                {data?.summary}
              </Text>
            )}
          </Box>
        </Flex>

        <Box bgColor='gray.800' mt={{ base: 12, md: 16 }} pb={{ base: 12, md: 16 }}>
          <Box {...containerProps} pt={{ base: 12, md: 16 }} pb={4}>
            <Heading as='h2' color='white' mb={4} size='md'>
              {t('game_details.screenshots.title')}
            </Heading>
          </Box>

          <SimpleGrid
            {...containerProps}
            columns={{ base: 1, sm: 2, md: 3 }}
            spacing={{ base: 2, md: 4 }}
            pb={{ base: 12, md: 16 }}
          >
            {!data
              ? Array(6)
                  .fill(null)
                  .map((item, index) => (
                    <Skeleton key={`skeleton-screenshot-${index}`} height={48} w='full' />
                  ))
              : data?.screenshots.map((screenshot) => (
                  <Image
                    alt='Screenshot'
                    src={screenshot.image}
                    key={screenshot.id}
                    rounded='md'
                    w='full'
                  />
                ))}
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
};

export default GameDetailsPage;

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};
