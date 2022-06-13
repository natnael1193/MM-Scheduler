import React from 'react';

import { useSchedulesQuery } from 'src/services/ScheduleApi';
import { Grid, CircularProgress, Typography } from '@mui/material';
import TimelineComponent from '../../../components/customComponents/schedule/TimelineComponent';
import { useProgramsQuery } from 'src/services/ProgramApi';

const ScheduleTimeline = () => {
  let scheduleData: any = [];
  let programsData: any = [];

  //Get All Programs
  const { data, error, isLoading, isSuccess, isFetching } = useSchedulesQuery();
  const {
    data: programData,
    isLoading: programLoading,
    isSuccess: programSuccess,
    error: programError,
  } = useProgramsQuery();

  if (isLoading || isFetching || programLoading)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  if (isSuccess) {
    scheduleData = data;
  }

  if (programSuccess) {
    programsData = programData;
  }

  if (error || programError)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h3">Something Went Wrong</Typography>
      </Grid>
    );

  console.log(programData);

  return (
    <div>
      <TimelineComponent scheduleData={scheduleData.responseBody} programData={programsData.responseBody} />
    </div>
  );
};

export default ScheduleTimeline;
