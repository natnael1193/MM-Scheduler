import React from 'react';
import {
  Box,
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
import ScheduleDays from './ScheduleDays';
import { useProgramsQuery } from 'src/services/ProgramApi';

const ScheduleForm = () => {
  let programData: any = [];

  //Get All Programs
  const { data, error, isLoading, isSuccess, isFetching } = useProgramsQuery();

  const {
    register,
    watch,
    // formState: { errors },
  } = useForm();

  const scheduleData: any = watch();
  console.log(scheduleData);

  if (isLoading || isFetching)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  if (isSuccess) {
    programData = data;
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
        <Card sx={{ p: 4 }}>
          <Typography variant="h3">Add Schedule</Typography>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Programs</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Programs"
                  fullWidth
                  displayEmpty
                  defaultValue=""
                  {...register('programId')}
                >
                  {programData.responseBody.map((program: any) => (
                    <MenuItem key={program.id} value={program.id.toString()}>
                      {program.name}
                    </MenuItem>
                  ))}
                </Select>
                {scheduleData.programId === undefined || scheduleData.programId === '' ? (
                  <Typography variant="inherit" color="error">
                    This is required
                  </Typography>
                ) : (
                  ''
                )}
              </FormControl>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextField
                {...register('startDate')}
                type={'date'}
                label="End Time"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              {scheduleData.startDate === undefined || scheduleData.startDate === '' ? (
                <Typography variant="inherit" color="error">
                  This is required
                </Typography>
              ) : (
                ''
              )}
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextField
                {...register('endDate')}
                type={'date'}
                label="End Time"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              {scheduleData.endDate === undefined || scheduleData.endDate === '' ? (
                <Typography variant="inherit" color="error">
                  This is required
                </Typography>
              ) : (
                ''
              )}
            </Grid>
          </Grid>
          {/* <DaysList scheduleData={scheduleData} /> */}
          <ScheduleDays scheduleData={scheduleData} />
        </Card>
      </Box>
    </div>
  );
};

export default ScheduleForm;
