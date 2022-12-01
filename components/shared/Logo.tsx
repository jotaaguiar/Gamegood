import React, { FC } from 'react';

import Link from 'components/shared/Link';
import { Button } from '@chakra-ui/react';

const Logo: FC = () => {
  return (
    <Link href='/' bare>
      <Button as='div' variant='outline' colorScheme='brand' fontSize='lg'>
        GoodGames
      </Button>
    </Link>
  );
};

export default Logo;
