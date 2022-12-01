import React, { FC, forwardRef } from 'react';
import NextLink from 'next/link';

type LinkProps = {
  href: string;
  bare?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children?: React.ReactNode;
};

const Link: FC<LinkProps> = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, bare, onClick, children, ...rest }, ref) => {
    const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

    if (isInternalLink) {
      return (
        <NextLink href={href} passHref>
          <a
            ref={ref}
            style={{ textDecoration: bare ? 'none' : 'initial' }}
            onClick={onClick}
            {...rest}
          >
            {children}
          </a>
        </NextLink>
      );
    }

    return (
      <a
        ref={ref}
        href={href}
        target='_blank'
        rel='noreferrer'
        style={{ textDecoration: bare ? 'none' : 'initial' }}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  },
);

Link.displayName = 'Link';
export default Link;
