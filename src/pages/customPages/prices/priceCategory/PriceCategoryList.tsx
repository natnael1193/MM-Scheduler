import { Grid, CircularProgress, Typography } from '@mui/material'
import PriceCategoryListComponent from 'src/components/customComponents/prices/priceCategory/PriceCategoryListComponent'
import { usePriceCategoriesQuery } from 'src/services/PriceCategoryApi'

const PriceCategoryList = () => {
  let priceCategoryData: any = []

  //Get All Price Categories
  const { data, error, isLoading, isSuccess, isFetching } = usePriceCategoriesQuery();

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
    priceCategoryData = data;
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

 
  return (
    <div>
      <PriceCategoryListComponent priceCategoryData={priceCategoryData.responseBody} />
    </div>
  )
}

export default PriceCategoryList