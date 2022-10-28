import {
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Card,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import ErrorComponent from '../../shared/ErrorComponent';
import LoadingComponent from '../../shared/LoadingComponent';
import { usePriceCategoriesQuery } from 'src/services/PriceCategoryApi';

const PriceConfigForm = ({ defaultValues, onFormSubmit, formTitle }: any) => {
  let priceCategoriesData: any = [];
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
  });

  const {
    data: priceCategoryData,
    isLoading: priceCategoryLoading,
    error: priceCategoryError,
    isSuccess: priceCategorySuccess,
  } = usePriceCategoriesQuery();

  if (priceCategoryLoading) return <LoadingComponent />;
  if (priceCategoryError) return <ErrorComponent />;
  if (priceCategorySuccess) {
    priceCategoriesData = priceCategoryData;
  }

  console.log(defaultValues)
  return (
    <div>
      <Grid>
        <Card sx={{ p: 2 }}>
          <Typography sx={{ p: 2 }} variant="h3">
            {formTitle}
          </Typography>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Grid container>
              <Grid item lg={4} md={4} sm={12} xs={12} sx={{ p: 2 }}>
                <TextField
                  {...register('name', { required: true })}
                  fullWidth
                  label="Price Config Name"
                />
                <Typography variant="inherit" color="error">
                  {errors.name && 'This is required'}
                </Typography>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12} sx={{ p: 2 }}>
                <TextField {...register('key', { required: true })} fullWidth label="Key" />
                <Typography variant="inherit" color="error">
                  {errors.key && 'This is required'}
                </Typography>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12} sx={{ p: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Price Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Price Category"
                    defaultValue={defaultValues.priceCategoryId}
                    {...register('priceCategoryId', { required: true })}
                    displayEmpty
                  >
                    {priceCategoriesData?.data.map((priceCategories: any) => (
                      <MenuItem value={priceCategories.id} key={priceCategories.id}>
                        {priceCategories.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="inherit" color="error">
                    {errors.priceCategoryId && 'This is required'}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ p: 2 }}>
                <TextField
                  {...register('rate', { required: true })}
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Birr</InputAdornment>,
                  }}
                  inputProps={{
                    step: 'any',
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
                  inputProps={{
                    step: 'any',
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
                  inputProps={{ step: 'any' }}
                  defaultValue={defaultValues.startDate}
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
                  inputProps={{ step: 'any' }}
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
