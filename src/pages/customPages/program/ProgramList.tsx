import { CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react'
import { useProgramsQuery } from 'src/services/ProgramApi';
import ProgramListComponent from '../../../components/customComponents/program/ProgramListComponent';

const ProgramList = () => {
  let programData: any = [];

  //Get All Programs
  const { data, error, isLoading, isSuccess, isFetching } = useProgramsQuery();

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

  if (isSuccess) {
    programData = data;
  }

  if (error) return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant='h3'>Something Wnet Wrong</Typography>
    </Grid>
  )

  console.log(programData)

  return (
    <div><ProgramListComponent programData={programData.responseBody} /></div>
  )
}

export default ProgramList