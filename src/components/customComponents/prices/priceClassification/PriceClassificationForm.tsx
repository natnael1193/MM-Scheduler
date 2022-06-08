import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { usePriceCategoriesQuery } from 'src/services/PriceCategoryApi';

const PriceClassificationForm = ({ defaultValues, onFormSubmit, formTitle }: any) => {
  let priceCategoryData: any = [];

  //Get All Price Categories
  const { data, error, isLoading, isSuccess, isFetching } = usePriceCategoriesQuery();

  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues,
  });

  if (isLoading || isFetching)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  if (isSuccess) {
    priceCategoryData = data;
  }

  if (error)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h3">Something Went Wrong</Typography>
      </Grid>
    );



  return (
    <div>
      <Box>
        <Card sx={{ p: 2 }}>
          <Typography sx={{ p: 2 }} variant="h3">
            {formTitle}
          </Typography>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Grid container>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ p: 2 }}>
                <TextField
                  {...register('priceClassificationName', { required: true })}
                  fullWidth
                  label="Price Classification Name"
                />
                <Typography variant='inherit' color="error">{errors.priceClassificationName && "This is required"}</Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ p: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Price Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Price Category"
                    displayEmpty
                    defaultValue={defaultValues.priceCategoryId}
                    {...register('priceCategoryId', { required: true })}
                  >
                    {priceCategoryData.responseBody.map((priceCategory: any) => (
                      <MenuItem key={priceCategory.id} value={priceCategory.id}>
                        {priceCategory.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant='inherit' color="error">{errors.priceCategoryId && "This is required"}</Typography>
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12} sx={{ p: 2 }}>
                <TextField {...register('priceConfigName', { required: true })} fullWidth label="Price Config Name" />
                <Typography variant='inherit' color="error">{errors.priceConfigName && "This is required"}</Typography>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12} sx={{ p: 2 }}>
                <TextField
                  {...register('rate', { required: true })}
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Birr</InputAdornment>,
                  }}
                  fullWidth
                  label="Rate"
                />
                <Typography variant='inherit' color="error">{errors.rate && "This is required"}</Typography>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12} sx={{ p: 2 }}>
                <TextField
                  {...register('unit', { required: true })}
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Sec</InputAdornment>,
                  }}
                  fullWidth
                  label="Unit"
                />
                <Typography variant='inherit' color="error">{errors.unit && "This is required"}</Typography>
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
                <Typography variant='inherit' color="error">{errors.startDate && "This is required"}</Typography>
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
                <Typography variant='inherit' color="error">{errors.endDate && "This is required"}</Typography>
              </Grid>
              <Grid item sx={{ p: 2 }}>
                <Button type="submit" variant="contained">
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

export default PriceClassificationForm;
