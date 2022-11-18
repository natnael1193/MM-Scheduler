import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useStationsQuery } from 'src/services/StationApi';
import ErrorComponent from '../../shared/ErrorComponent';
import LoadingComponent from '../../shared/LoadingComponent';
import { useProgramByStationQuery } from 'src/services/ProgramApi';

const PriceCategoryForm = ({ formTitle, defaultValues, onFormSubmit }: any) => {
  let stationsData: any = [];

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues,
  });

  let stationId: any = defaultValues.stationId;
  stationId = watch('stationId');

  // Fetch Stations
  const {
    data: stationData,
    isLoading: stationLoading,
    error: stationError,
    isSuccess: stationSucess,
  } = useStationsQuery();

  // Fetch Programs
  const {
    data: programData,
    isLoading: programLoading,
    // error: programError,
  }: any = useProgramByStationQuery(stationId);
  // useProgramByStationQuery(programId)

  if (stationLoading || programLoading) return <LoadingComponent />;
  if (stationError) return <ErrorComponent />;
  if (stationSucess) {
    stationsData = stationData;
  }

  console.log(defaultValues);

  return (
    <div>
      <Grid>
        <Card>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Typography variant="h3" sx={{ m: 3 }}>
              {formTitle}
            </Typography>
            <Grid container sx={{ p: 5, pt: 0 }} spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField {...register('key', { required: true })} label="Alias" fullWidth />
                <Typography variant="inherit" color="error">
                  {errors.key && 'This is required'}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  {...register('name', { required: true })}
                  label="Price Category Name"
                  fullWidth
                />
                <Typography variant="inherit" color="error">
                  {errors.name && 'This is required'}
                </Typography>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Station</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Station"
                    defaultValue={defaultValues.stationId}
                    displayEmpty
                    {...register('stationId', { required: true })}
                  >
                    {stationsData?.data?.map((stations: any) => (
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
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Program</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Program"
                    defaultValue={defaultValues.programId}
                    displayEmpty
                    {...register('programId', { required: true })}
                  >
                    {programData?.data?.programs?.map((program: any) => (
                      <MenuItem value={program.id} key={program.id}>
                        {program.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="inherit" color="error">
                    {errors.programId && 'This is required'}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Price Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Price Type"
                    defaultValue={defaultValues?.priceType}
                    displayEmpty
                    {...register('priceType', { required: true })}
                  >
                    <MenuItem value="Spot">Spot</MenuItem>
                    <MenuItem value="Sponsorship">Sponsorship</MenuItem>
                  </Select>
                  <Typography variant="inherit" color="error">
                    {errors.priceType && 'This is required'}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item lg={8} md={10} sm={12} xs={12} sx={{ mb: 3 }}>
                <Button variant="contained" type="submit">
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

export default PriceCategoryForm;
