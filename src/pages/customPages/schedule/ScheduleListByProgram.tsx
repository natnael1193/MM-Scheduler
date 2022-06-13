import { CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom';
import ScheduleByProgramComponent from 'src/components/customComponents/schedule/ScheduleByProgramComponent';
import { useScheduleByProgamQuery } from 'src/services/ScheduleApi';



const ScheduleListByProgram = () => {

  const params = useParams();
  const paramsId: any = params.programId
  var scheduleData: any = {}

  //Get Program By Id
  const { data: programData, error, isLoading, isFetching } = useScheduleByProgamQuery(paramsId)

  //Loading State
  if (isLoading || isFetching) return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Grid>
  )

  // Return an error if there is an error
  if (error) return (
    <Typography variant='h3'>Something Went Wrong</Typography>
  )

  //Assign the data to a variable
  scheduleData = programData;

  console.log(scheduleData)
  return (
    <div>
      <ScheduleByProgramComponent scheduleData={scheduleData.responseBody} />
    </div>
  )
}

export default ScheduleListByProgram