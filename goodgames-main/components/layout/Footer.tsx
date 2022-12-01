import React from 'react';

import { containerProps } from 'styles/theme';
import theme from 'styles/theme';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import Link from 'components/shared/Link';
import LocaleButton from 'components/shared/LocaleButton';

const Footer = () => {
  const year: number = new Date().getFullYear();

  return (
    <Box
      as='footer'
      bgImage={`linear-gradient(to top, ${theme.colors.white}, ${theme.colors.gray[100]})`}
      bottom={0}
      h={20}
      maxH={20}
      position='absolute'
      w='full'
    >
      <Flex align='center' justify='space-between' direction='row' h='full' {...containerProps}>
        <Text as='span' fontSize='sm' color='gray.500'>
          &copy; {year} GoodGames
        </Text>
        <Box mr={-1}>
          <LocaleButton />
          <Link href='https://github.com/jotaaguiar'>
            <Button size='sm' variant='ghost' colorScheme={'blackAlpha'}>
              Source code
            </Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
