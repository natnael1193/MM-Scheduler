import { Box, Card, Grid, TextField, Typography, Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

const OrganizationTypeForm = ({ formTitle, defaultValues, onFormSubmit }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
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

              <Grid item lg={6} md={6} sm={12} sx={{ mb: 2 }}>
                <TextField fullWidth label="Key" {...register('key', { required: true })} />
                <Typography variant="inherit" color="error">
                  {errors.key && 'This is required'}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Organization Type"
                  {...register('name', { required: true })}
                />
                <Typography variant="inherit" color="error">
                  {errors.name && 'This is required'}
                </Typography>
              </Grid>
              <Grid item lg={8} md={8} sm={12}>
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
