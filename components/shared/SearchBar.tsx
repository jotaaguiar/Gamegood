import React, { FC, useState, useCallback } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  InputGroupProps,
  BoxProps,
} from '@chakra-ui/react';
import { IoSearch } from 'react-icons/io5';
import { useRouter } from 'next/router';

type SearchBarProps = {
  placeholder: string;
  chakraProps: InputGroupProps | BoxProps;
};

const SearchBar: FC<SearchBarProps> = ({ placeholder, chakraProps }) => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && searchTerm.length > 0) {
        setSearchTerm('');
        router.push(`/search?term=${searchTerm}`);
      }
    },
    [router, searchTerm],
  );

  return (
    <InputGroup {...chakraProps}>
      <Input
        type='text'
        variant='outline'
        bgColor='white'
        placeholder={placeholder}
        focusBorderColor='brand.500'
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <InputRightElement pointerEvents='none'>
        <Icon as={IoSearch} color='gray.500' />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
