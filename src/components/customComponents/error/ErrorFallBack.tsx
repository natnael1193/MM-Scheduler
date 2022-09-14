import React from 'react';
import { Typography, Container, Button, Grid } from '@mui/material';

const ErrorFallBack = ({ error, resetErrorBoundary }: any) => (
  <Container>
    <Grid container>
      <Typography variant="h3">Something Went Wrong!!!</Typography>
      <Typography variant="h4">{error.message}</Typography>
      <Button sx={{ mt: 5 }} variant="contained" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </Grid>
  </Container>
);
export default ErrorFallBack;
