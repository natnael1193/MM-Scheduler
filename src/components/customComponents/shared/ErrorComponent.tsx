import { Grid, Typography } from '@mui/material';
import React from 'react'

const ErrorComponent = () => 
     (
      <div>
        {' '}
        <Grid container direction="row" justifyContent="center" alignItems="center">
       <Typography variant='h3'>Something Went Wrong</Typography>
        </Grid>
      </div>
    );


export default ErrorComponent