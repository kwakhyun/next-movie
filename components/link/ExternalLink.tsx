import { forwardRef } from 'react';

import { Link, LinkProps } from '@mui/material';

type ExternalLinkProps = LinkProps;

const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  function ExternalLink({ href, ...rest }, ref) {
    return (
      <Link
        ref={ref}
        {...rest}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      />
    );
  },
);

export default ExternalLink;
