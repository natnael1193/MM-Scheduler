import { Box, Card, Grid, TextField, Typography, Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

const OrganizationTypeForm = ({ formTitle, defaultValues, onFormSubmit }: any) => {
  const { register, handleSubmit } = useForm({
    defaultValues
  });


  return (
    <div>
      <Box>
        <Card>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Grid container spacing={3} sx={{ p: 5 }}>
              <Grid item lg={12} md={12} sm={12} sx={{ mb: 3 }}>
                <Typography variant="h3">{formTitle}</Typography>
              </Grid>

              <Grid item lg={12} md={12} sm={12} sx={{ mb: 2 }}>
                <TextField fullWidth label="Key" {...register('key')} />
              </Grid>
              <Grid item lg={12} md={12} sm={12} sx={{ mb: 2 }}>
                <TextField fullWidth label="Organization Type" {...register('name')} />
              </Grid>
              <Grid item lg={12} md={12} sm={12}>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Box>
    </div>
  );
};

export default OrganizationTypeForm;
