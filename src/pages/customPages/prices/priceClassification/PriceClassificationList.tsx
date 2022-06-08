import { Grid, CircularProgress, Typography } from '@mui/material';
import React from 'react'
import PriceClassificationListComponent from 'src/components/customComponents/prices/priceClassification/PriceClassificationListComponent';
import { usePriceClassificationsQuery } from 'src/services/PriceClassificationApi';

const PriceClassificationList = () => {
  let priceClassificationData: any = [];

  //Get All Price Classification
  const { data, error, isLoading, isSuccess, isFetching } = usePriceClassificationsQuery();

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
    priceClassificationData = data;
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

  console.log(priceClassificationData)

  return (
    <div><PriceClassificationListComponent priceClassificationData={priceClassificationData.responseBody} /></div>
  )
}

export default PriceClassificationList