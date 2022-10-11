import React, { useState, useEffect } from 'react';
import { Box, Grid, Skeleton, Typography, Button, Divider } from '@mui/material';
import { useStationsQuery } from '../../../services/StationApi';
import StationListComponent from '../../../components/customComponents/station/StationListComponent';
import LoadingComponent from '../../../components/customComponents/shared/LoadingComponent';
import ErrorComponent from 'src/components/customComponents/shared/ErrorComponent';
import { Link } from 'react-router-dom';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import AddIcon from '@mui/icons-material/Add';
import BreadCrumb from '../breadCrumb/BreadCrumb';

const StationList = () => {
  // let stationData: any = [];
  const [stationData, setStationData] = useState([]);

  // Get All Stations
  const { data, isFetching, isError, isSuccess, refetch, isLoading, error }: any = useStationsQuery();

  useEffect(() => {
    // refetch();
    if (isSuccess || isFetching && data) {
      setStationData(data.data);
    }
  }, [isSuccess, isError, data, refetch, isFetching,]);

  if (isLoading) return <LoadingComponent />;

  if (error) return <ErrorComponent />;

  // setStationData(data.data);

  // stationData = data;

  return (
    <div>
      <Box>
        <BreadCrumb
          main={'Dashboard'}
          parent={'Station'}
          child={'List'}
          parentLink={'/dashboard/station/list'}
        />
        <Grid container direction="row" sx={{ m: 2 }}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Typography variant="h3">Stations</Typography>
          </Grid>
          <Grid item lg={2} md={2} sm={12} xs={12}>
            <Link to="/dashboard/schedule/timeline" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="secondary">
                <ViewTimelineIcon />
                Schedule TimeLine
              </Button>
            </Link>
          </Grid>
          <Grid item lg={2} md={2} sm={12} xs={12}>
            <Link to="/dashboard/station/add" style={{ textDecoration: 'none' }}>
              <Button variant="contained">
                <AddIcon />
                Add Station
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Divider variant="middle" sx={{ color: 'black' }} />
        <Grid container direction="row" sx={{ mt: 3 }}>
          {isLoading ? <Skeleton variant="rectangular" /> :
            stationData.map((station: any) => (
              <StationListComponent
                key={station.id}
                id={station.id}
                name={station.name}
                programs={station.programs}
              />
            ))}

        </Grid>
      </Box>
    </div>
  );
};
export default StationList;
