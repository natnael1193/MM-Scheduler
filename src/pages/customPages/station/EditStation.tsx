import { Grid, CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStationQuery, useUpdateStationMutation } from 'src/services/StationApi';
import StationForm from '../../../components/customComponents/station/StationForm';
import { toast } from 'react-toastify';

const EditStation = () => {

  const params = useParams();
  const paramsId: any = params.stationId;
  var defaultValues: any = {};


  //Get The Station By Id
  const { data: stationData, error, isLoading } = useStationQuery(paramsId)

  //Update the data
  const [updateStation, result] = useUpdateStationMutation();

  //Check the data status
  const res: any = result
  useEffect(() => {
    if (res.isSuccess) {
      console.log(res)
      toast.success(res.data.status)
    }
  }, [res]);


  // Loading state to get the data
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

  // Return an error if there is an error
  if (error) return (
    <Typography variant='h3'>Something Went Wrong</Typography>
  )

  //Assign the data to a variable
  defaultValues = stationData;


  //Submit the new data
  const onSubmit = (data: any) => {
    updateStation(data)
  }

  return (
    <div> <StationForm formTitle={"Edit Station"} defaultValues={defaultValues.responseBody} onFormSubmit={onSubmit} /></div>
  );
}




export default EditStation;
