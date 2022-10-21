import { Grid, CircularProgress } from '@mui/material';
import React from 'react';

const LoadingComponent = () => (


  <div>
    {' '}
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Grid>
  </div>
);

export default LoadingComponent;
