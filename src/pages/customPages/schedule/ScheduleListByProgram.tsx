import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link, useParams } from 'react-router-dom';
import ScheduleByProgramComponent from 'src/components/customComponents/schedule/ScheduleByProgramComponent';
import { useScheduleByProgamQuery } from 'src/services/ScheduleApi';
import React from 'react';

const ScheduleListByProgram = () => {
  const params = useParams();
  const paramsId: any = params.programId;
  var scheduleData: any = {};
  const [futureSchedule, setFutureSchedule] = React.useState(false);

  //Change the schedule to future 
  const futureScheduleHandleChange: any = () => {
    futureSchedule === false ? setFutureSchedule(true) : setFutureSchedule(false)
  }

  //Get Program By Id
  const { data: programData, error, isLoading, isFetching } = useScheduleByProgamQuery(paramsId);

  //Loading State
  if (isLoading || isFetching)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  // Return an error if there is an error
  if (error) return <Typography variant="h3">Something Went Wrong</Typography>;

  //Assign the data to a variable
  scheduleData = programData;


  console.log(scheduleData.responseBody[0] !== undefined ? scheduleData.responseBody[0].program.name : '');
  return (
    <div>
      <Grid container sx={{ mb: 1 }}>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Typography variant="h3">{scheduleData.responseBody[0] !== undefined ? scheduleData.responseBody[0].program.name : ''}</Typography>
        </Grid>
        <Grid item lg={2} md={2} sm={6} xs={6}>
          <Button variant="contained" color="secondary" onClick={futureScheduleHandleChange}>
            {futureSchedule === false ? 'Future Schedules' : 'All Schedules'}
          </Button>
        </Grid>
        <Grid item lg={2} md={2} sm={6} xs={6}>
          <Link to="/dashboard/schedule/add" style={{ textDecoration: 'none' }}>
            <Button variant="contained">
              <AddIcon />
              Add Schedule
            </Button>
          </Link>
        </Grid>
      </Grid>
      <ScheduleByProgramComponent scheduleData={scheduleData.responseBody} futureSchedule={futureSchedule} />
    </div>
  );
};

export default ScheduleListByProgram;
