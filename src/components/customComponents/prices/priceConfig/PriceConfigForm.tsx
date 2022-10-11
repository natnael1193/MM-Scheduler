import { Grid, TextField, Typography, InputAdornment, Card, Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

const PriceConfigForm = ({ defaultValues, onFormSubmit, formTitle }: any) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
  });

  return (
    <div>
      <Grid>
        <Card sx={{ p: 2 }}>
          <Typography sx={{ p: 2 }} variant="h3">
            {formTitle}
          </Typography>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Grid container>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ p: 2 }}>
                <TextField
                  {...register('name', { required: true })}
                  fullWidth
                  label="Price Config Name"
                />
                <Typography variant="inherit" color="error">
                  {errors.name && 'This is required'}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ p: 2 }}>
                <TextField
                  {...register('key', { required: true })}
                  fullWidth
                  label="Key"
                />
                <Typography variant="inherit" color="error">
                  {errors.key && 'This is required'}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ p: 2 }}>
                <TextField
                  {...register('rate', { required: true })}
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Birr</InputAdornment>,
                  }}
                  fullWidth
                  label="Rate"
                />
                <Typography variant="inherit" color="error">
                  {errors.rate && 'This is required'}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ p: 2 }}>
                <TextField
                  {...register('unit', { required: true })}
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Sec</InputAdornment>,
                  }}
                  fullWidth
                  label="Unit"
                />
                <Typography variant="inherit" color="error">
                  {errors.unit && 'This is required'}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ p: 2 }}>
                <TextField
                  {...register('startDate', { required: true })}
                  fullWidth
                  label="Start Date"
                  type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 1 }}
                />
                <Typography variant="inherit" color="error">
                  {errors.startDate && 'This is required'}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ p: 2 }}>
                <TextField
                  {...register('endDate', { required: true })}
                  fullWidth
                  label="End Date"
                  type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 1 }}
                />
                <Typography variant="inherit" color="error">
                  {errors.endDate && 'This is required'}
                </Typography>
              </Grid>
              <Grid item sx={{ p: 2 }}>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Grid>
    </div>
  );
};

export default PriceConfigForm;
