import React from 'react';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
import { useStationsQuery } from "../../../services/StationApi";
import StationListComponent from "../../../components/customComponents/station/StationListComponent"
import LoadingComponent from '../../../components/customComponents/shared/LoadingComponent';
import ErrorComponent from 'src/components/customComponents/shared/ErrorComponent';



const StationList = () => {
  let stationData: any = [];

  // Get All Stations
  const { data, error, isLoading, isSuccess } = useStationsQuery();


  if (isLoading) return (
    <LoadingComponent />
  )

  if (error) return (
    <ErrorComponent />
  )

  stationData = data

  return (<div>
    <Box>
<Grid container direction="row" sx={{ m: 2 }}>
<Typography variant="h3">Stations</Typography>
</Grid>
      <Grid container direction="row">
        {
          isLoading ?
            (<Skeleton variant="rectangular" />)
            :
            ''
        }
        {
          (isSuccess) && stationData && stationData.responseBody.map((station: any) => (
            <StationListComponent key={station.id} id={station.id} name={station.name} programs={station.programs} />
          )
          )
        }
      </Grid>
    </Box>
  </div>)
}
  ;


export default StationList;
