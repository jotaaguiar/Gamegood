import React from 'react';
import useScrollPosition from 'hooks/useScrollPosition';
import Logo from 'components/shared/Logo';
import NavLink from 'components/layout/NavLink';
import links from 'data/nav-links';
import type { AppProps } from 'next/app';
import useTranslation from 'hooks/useTranslation';

import { containerProps } from 'styles/theme';
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import SearchBar from 'components/shared/SearchBar';

const NavBar = ({ router }: { router: AppProps['router'] }) => {
  const { t } = useTranslation('common');
  const { isAtTop } = useScrollPosition();

  return (
    <Box
      as='header'
      position='fixed'
      top={0}
      left={0}
      w='full'
      zIndex='docked'
      backdropFilter={isAtTop ? 'saturate(100%) blur(0px)' : 'saturate(180%) blur(5px)'}
      bgColor={isAtTop ? 'transparent' : 'whiteAlpha.700'}
      borderBottom={isAtTop ? '0px solid' : '2px solid'}
      borderColor='gray.100'
      transition='all 150ms ease'
    >
      <Flex {...containerProps} as='nav' h={16} justify='space-between' align='center'>
        <Logo />
        <Flex align='center' direction='row' gap={1} justify='center'>
          <SearchBar
            chakraProps={{ ml: 2, display: useBreakpointValue({ base: 'none', sm: 'initial' }) }}
            placeholder={t('nav.search.placeholder')}
          />

          {links.map((link) => (
            <NavLink.Desktop
              key={link.key}
              title={t(`nav.link.${link.key}`)}
              href={link.href}
              leftIcon={link.icon}
              currentPath={router.route}
            />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
