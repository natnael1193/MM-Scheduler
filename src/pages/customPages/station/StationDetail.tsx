import React from 'react';
import { Grid, Typography, Skeleton, CircularProgress, Box } from '@mui/material';
import { useParams } from 'react-router-dom'
import { useStationQuery } from '../../../services/StationApi'
import ProgramByStationComponent from 'src/components/customComponents/program/ProgramByStationComponent';
import { useProgramByStationQuery } from 'src/services/ProgramApi';
import BreadCrumb from '../breadCrumb/BreadCrumb';


const StationDetail = () => {
  const params: any = useParams();
  const paramsId: any = params.stationId
  let stationData: any = [];
  let programData: any = [];

  const { data, isLoading, error } = useStationQuery(paramsId);
  const { data: stationProgramData, isLoading: stationProgramLoading, error: stationProgramError } = useProgramByStationQuery(paramsId);

  if (isLoading || stationProgramLoading) return <CircularProgress />
  if (error || stationProgramError) return <Typography variant="h4">Something Went Wrong</Typography>

  stationData = data;
  programData = stationProgramData;
  console.log(stationData)
  return (
    <Box>
         <BreadCrumb
        main={'Dashboard'}
        parent={'Station'}
        child={'Detail'}
        parentLink={'/dashboard/station/list'}
      />
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h3">{isLoading ? <Skeleton width="50%" /> : stationData && stationData.data.name}</Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ ml: 4 }}>
          <Typography variant="inherit"> {isLoading ? (<><Skeleton /> <Skeleton /> <Skeleton /> </>) : stationData && stationData.data.description} </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 5 }}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h4">Programs</Typography>
          <ProgramByStationComponent programData={programData.data} />
        </Grid>
      </Grid>
    </Box>
  )
}



export default StationDetail;
