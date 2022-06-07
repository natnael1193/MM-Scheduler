import React from 'react';
import { Container, Grid, Typography, Skeleton } from '@mui/material';
import { useParams } from 'react-router-dom'
import { useStationQuery } from '../../../services/StationApi'


const StationDetail = () => {
  const params: any = useParams();
  const paramsId: any = params.stationId
  let stationData: any = [];

  const { data, isLoading, error } = useStationQuery(paramsId);
  stationData = isLoading ? 'Loading' : data;

  if(error) return <Typography variant="h4">Something Went Wrong</Typography>

  return (
    <Container>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h3">{isLoading ? <Skeleton width="50%"/> : stationData && stationData.responseBody.name }</Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ ml: 4 }}>
          <Typography variant="inherit"> { isLoading ? ( <><Skeleton/> <Skeleton/> <Skeleton/> </>): stationData && stationData.responseBody.description } </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 5 }}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h4">Programs</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}



export default StationDetail;
