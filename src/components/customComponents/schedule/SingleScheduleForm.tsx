import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useProgramsQuery } from 'src/services/ProgramApi';
// import { usePriceClassificationsQuery } from 'src/services/PriceClassificationApi';
import LoadingComponent from '../shared/LoadingComponent';
import ErrorComponent from '../shared/ErrorComponent';
// import { usePriceConfigsQuery } from 'src/services/PriceConfigApi';

const SingleScheduleForm = ({ register, handleSubmit, errors }: any) => {
  const {
    data: programData,
    isLoading: programLoading,
    error: programError,
  }: any = useProgramsQuery();

  // const {
  //   data: priceConfigData,
  //   isLoading: priceConfigLoading,
  //   error: priceConfigError,
  // }: any = usePriceConfigsQuery();

  if (programLoading) return <LoadingComponent />;
  if (programError) return <ErrorComponent />;

  return (
    <Grid container spacing={4} sx={{ width: '100%', pt: 2 }}>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextField label="Alias" {...register('key', { required: true })} fullWidth />
        <Typography variant="inherit" color="error">
          {errors.key && 'This is required'}
        </Typography>
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextField
          label="Start Time"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          inputProps={{ step: 1 }}
          fullWidth
          {...register('startTime', { required: true })}
        />
        <Typography variant="inherit" color="error">
          {errors.startTime && 'This is required'}
        </Typography>
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextField
          label="End Time"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          inputProps={{ step: 1 }}
          fullWidth
          {...register('endTime', { required: true })}
        />
        <Typography variant="inherit" color="error">
          {errors.endTime && 'This is required'}
        </Typography>
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Program</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Program"
            {...register('programId', { required: true })}
            displayEmpty
            defaultValue={''}
          >
            {programData.data.map((programs: any) => 
               (
                <MenuItem value={programs.id} key={programs.id}>
                  {programs.name}
                </MenuItem>
              )
            )}
          </Select>
          <Typography variant="inherit" color="error">
            {errors.programId && 'This is required'}
          </Typography>
        </FormControl>
      </Grid>
      {/* <Grid item lg={6} md={6} sm={12} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Price Config</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Price Config"
            {...register('priceConfigId', { required: true })}
            displayEmpty
            defaultValue={''}
          >
            {priceConfigData.data.map((priceConfigs: any) => {
              return (
                <MenuItem value={priceConfigs.id} key={priceConfigs.id}>
                  {priceConfigs.name}
                </MenuItem>
              );
            })}
          </Select>
          <Typography variant="inherit" color="error">
            {errors.priceConfigId && 'This is required'}
          </Typography>
        </FormControl>
      </Grid> */}
    </Grid>
  );
};

export default SingleScheduleForm;
