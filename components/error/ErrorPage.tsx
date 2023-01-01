import { Button, Box, Typography } from '@mui/material';

import NextLink from '../link/NextLink';

interface ErrorPageProps {
  statusCode?: number;
  message?: string;
}

function ErrorPage({ statusCode, message }: ErrorPageProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        placeContent: 'center',
        justifyItems: 'center',
        textAlign: 'center',
        minHeight: '100%',
        padding: 2,
      }}
    >
      {statusCode && <Typography variant="h1">{statusCode}</Typography>}
      <Typography variant="h4">{message || 'Something went wrong'}</Typography>
      <Button
        aria-label="메인 페이지로 이동하기"
        href="/"
        variant="contained"
        component={NextLink}
        sx={{ marginTop: 2, marginBottom: 8 }}
      >
        메인 페이지로 이동하기
      </Button>
    </Box>
  );
}

export default ErrorPage;
