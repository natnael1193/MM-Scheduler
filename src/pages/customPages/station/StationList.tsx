import React from 'react';
import { Box, Grid, Skeleton, Typography, CircularProgress } from '@mui/material';
// import { Link } from 'react-router-dom';
import { useStationsQuery } from "../../../services/StationApi";
import StationListComponent from "../../../components/customComponents/station/StationListComponent"



const StationList = () => {
  let stationData: any = [];

  // Get All Stations
  const { data, error, isLoading, isSuccess } = useStationsQuery();
  

  if (isLoading) return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Grid>
  )

  // if (isFetching ) return (
  //   <Grid
  //     container
  //     direction="row"
  //     justifyContent="center"
  //     alignItems="center"
  //   >
  //     <CircularProgress />
  //   </Grid>
  // )

  stationData = data

  return (<div>
    <Box>

      <Grid container direction="row">
        {
          isLoading ?
            (<Skeleton variant="rectangular" />)
            :
            ''
        }
        {(error) && <Typography variant="h3" sx={{ mt: 2 }}>Something Went Wrong</Typography>}
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
