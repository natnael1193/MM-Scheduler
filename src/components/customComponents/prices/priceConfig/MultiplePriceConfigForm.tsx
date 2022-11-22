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
import { useFieldArray, useForm } from 'react-hook-form';
import ErrorComponent from '../../shared/ErrorComponent';
import LoadingComponent from '../../shared/LoadingComponent';
import { usePriceCategoriesQuery } from 'src/services/PriceCategoryApi';
import { useStationsQuery } from 'src/services/StationApi';
const MultiplePriceConfigForm = ({ defaultValues, onFormSubmit, formTitle }: any) => {
  let priceCategoriesData: any = [];
  let filteredProgramData: any = [];
  let stationId: string = '';
  let programId: string = '';
  let filteredPriceCategoryData: any = [];
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
  } = useForm({
    defaultValues: {
      startDate: '',
      endDate: '',
      stationId: '',
      programId: '',

      priceConfigs: [{ name: '', rate: '', unit: '', key: '', priceCategoryId: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'priceConfigs',
  });

  const {
    data: priceCategoryData,
    isLoading: priceCategoryLoading,
    error: priceCategoryError,
    isSuccess: priceCategorySuccess,
  } = usePriceCategoriesQuery();

  const {
    data: stationData,
    isLoading: stationLoading,
    error: stationError,
  }: any = useStationsQuery();

  if (priceCategoryLoading || stationLoading) return <LoadingComponent />;
  if (priceCategoryError || stationError) return <ErrorComponent />;
  if (priceCategorySuccess) {
    priceCategoriesData = priceCategoryData;
  }

  stationId = watch('stationId');
  programId = watch('programId');
  filteredProgramData = stationData?.data?.filter((station: any) => station.id === stationId);
  console.log(filteredProgramData);
  filteredProgramData = filteredProgramData?.[0]?.programs;

  filteredPriceCategoryData = priceCategoriesData?.data?.filter(
    (priceCategory: any) => priceCategory.programId === programId
  );

  console.log(filteredProgramData);
  console.log('filteredPriceCategoryData', filteredPriceCategoryData);
  console.log('priceCategoriesData?.data', priceCategoriesData?.data);
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

              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ p: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Station</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Station"
                    defaultValue={''}
                    {...register('stationId', { required: true })}
                    displayEmpty
                  >
                    {stationData?.data?.map((stations: any) => (
                      <MenuItem value={stations.id} key={stations.id}>
                        {stations.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="inherit" color="error">
                    {errors.stationId && 'This is required'}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ p: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Programs</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Programs"
                    defaultValue={defaultValues?.programId}
                    {...register(
                      'programId'
                      //  { required: true }
                    )}
                    displayEmpty
                  >
                    {filteredProgramData?.map((programs: any) => (
                      <MenuItem value={programs.id} key={programs.id}>
                        {programs.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="inherit" color="error">
                    {/* {errors.priceCategoryId && 'This is required'} */}
                  </Typography>
                </FormControl>
              </Grid>
            </Grid>

            {fields.map((item, index) => (
              <Grid container key={item.id} sx={{ mt: 3 }}>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ p: 1 }}>
                  <TextField {...register(`priceConfigs.${index}.key`)} fullWidth label="Alias" />
                  <Typography variant="inherit" color="error">
                    {/* {errors.key && 'This is required'} */}
                  </Typography>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ p: 1 }}>
                  <TextField
                    {...register(`priceConfigs.${index}.name`)}
                    fullWidth
                    label="Price Config Name"
                  />
                  <Typography variant="inherit" color="error">
                    {/* {errors.name && 'This is required'} */}
                  </Typography>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ p: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Price Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Price Category"
                      defaultValue={defaultValues?.priceCategoryId}
                      {...register(`priceConfigs.${index}.priceCategoryId`)}
                      displayEmpty
                    >
                      {filteredPriceCategoryData?.map((priceCategories: any) => (
                        <MenuItem value={priceCategories.id} key={priceCategories.id}>
                          {priceCategories.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <Typography variant="inherit" color="error">
                      {/* {errors.priceCategoryId && 'This is required'} */}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ p: 1 }}>
                  <TextField
                    {...register(`priceConfigs.${index}.rate`)}
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
                    {/* {errors.rate && 'This is required'} */}
                  </Typography>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ p: 1 }}>
                  <TextField
                    {...register(`priceConfigs.${index}.unit`)}
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
                    {/* {errors.unit && 'This is required'} */}
                  </Typography>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ p: 1 }}>
                  <Button
                    color="error"
                    variant="contained"
                    // sx={{ mt: 4 }}
                    onClick={() => remove(index)}
                    disabled={watch(`priceConfigs`).length < 2 ? true : false}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            ))}
            <Grid container>
              <Grid item lg={1} md={2} sm={12} xs={12} sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ color: 'white' }}
                  onClick={() =>
                    append({ key: '', name: '', rate: '', unit: '', priceCategoryId: '' })
                  }
                >
                  Append
                </Button>
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12} sx={{ p: 2 }}>
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

export default MultiplePriceConfigForm;
