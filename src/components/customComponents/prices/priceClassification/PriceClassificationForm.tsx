import {
  Button,
  Card,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { usePriceCategoriesQuery } from 'src/services/PriceCategoryApi';
import { usePriceConfigsQuery } from 'src/services/PriceConfigApi';

const PriceClassificationForm = ({ defaultValues, onFormSubmit, formTitle }: any) => {
  let priceCategoryData: any = [];
  let priceConfigData: any = [];

  //Get All Price Categories
  const { data, error, isLoading, isSuccess, isFetching } = usePriceCategoriesQuery();

  //Get All Price config
  const {
    data: priceConfigDatas,
    error: priceConfigError,
    isLoading: priceConfigLoading,
    isSuccess: priceConfigSuccess,
    isFetching: priceConfigFetching,
  } = usePriceConfigsQuery();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
  });

  if (isLoading || isFetching || priceConfigLoading || priceConfigFetching)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  if (isSuccess) {
    priceCategoryData = data;
  }

  if (priceConfigSuccess) {
    priceConfigData = priceConfigDatas;
  }

  if (error || priceConfigError)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h3">Something Went Wrong</Typography>
      </Grid>
    );

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
                <TextField {...register('name', { required: true })} fullWidth label="Name" />
                <Typography variant="inherit" color="error">
                  {errors.name && 'This is required'}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ p: 2 }}>
                <TextField {...register('key', { required: true })} label="Key" fullWidth />
                <Typography variant="inherit" color="error">
                  {errors.key && 'This is required'}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ p: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Price Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Price Category"
                    displayEmpty
                    defaultValue={defaultValues.priceCategory ? defaultValues.priceCategory.id : ''}
                    {...register('priceCategoryId', { required: true })}
                  >
                    {priceCategoryData.data.map((priceCategory: any) => (
                      <MenuItem key={priceCategory.id} value={priceCategory.id}>
                        {priceCategory.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="inherit" color="error">
                    {errors.priceCategoryId && 'This is required'}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ p: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Price Config</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Price Config"
                    displayEmpty
                    defaultValue={defaultValues.priceConfig ? defaultValues.priceConfig.id : ''}
                    {...register('priceConfigId', { required: true })}
                  >
                    {priceConfigData.data.map((priceConfig: any) => (
                      <MenuItem key={priceConfig.id} value={priceConfig.id}>
                        {priceConfig.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="inherit" color="error">
                    {errors.priceConfigId && 'This is required'}
                  </Typography>
                </FormControl>
              </Grid>
              {/* <Grid item lg={4} md={4} sm={12} xs={12} sx={{ p: 2 }}>
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
              </Grid> */}
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

export default PriceClassificationForm;
