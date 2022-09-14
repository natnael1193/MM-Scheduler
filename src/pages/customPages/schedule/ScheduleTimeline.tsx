import React from 'react';
import { useSchedulesQuery } from 'src/services/ScheduleApi';
import { Grid, CircularProgress, Typography, Button, Divider } from '@mui/material';
import TimelineComponent from '../../../components/customComponents/schedule/TimelineComponent';
import { useProgramsQuery } from 'src/services/ProgramApi';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import BreadCrumb from '../breadCrumb/BreadCrumb';

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
      <BreadCrumb
        main={'Dashboard'}
        parent={'Schedule'}
        child={'Timeline'}
        parentLink={'/dashboard/schedule/timeline'}
      />
      <Grid container direction="row" sx={{ m: 2 }}>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Typography variant="h3">Schedule Timeline</Typography>
        </Grid>
        <Grid item lg={2} md={2} sm={12} xs={12}>
          <Link to="/dashboard/station/list" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="secondary">
              <ListIcon />
              Stations
            </Button>
          </Link>
        </Grid>
        <Grid item lg={2} md={2} sm={12} xs={12}>
          <Link to="/dashboard/schedule/add" style={{ textDecoration: 'none' }}>
            <Button variant="contained">
              <AddIcon />
              Add Schedule
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Divider variant="middle" sx={{ color: 'black' }} />
      <TimelineComponent
        scheduleData={scheduleData.responseBody}
        programData={programsData.responseBody}
      />
    </div>
  );
};

export default ScheduleTimeline;
