import { Grid, CircularProgress, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import PriceClassificationListComponent from 'src/components/customComponents/prices/priceClassification/PriceClassificationListComponent';
import { usePriceClassificationsQuery } from 'src/services/PriceClassificationApi';
import BreadCrumb from '../../breadCrumb/BreadCrumb';

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
      <Typography variant='h3'>Something Went Wrong</Typography>
    </Grid>
  )

  console.log(priceClassificationData)

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Price Classification'}
        child={'List'}
        parentLink={'/dashboard/price-classification/list'}
      />
      <Grid container>
        <Grid item lg={10} md={8} sm={12} xs={12}>
          <Typography variant='h3'>Price Classification</Typography>
        </Grid>
        <Grid item lg={2} md={4} sm={12} xs={12}>
          <Link to="/dashboard/price-classification/add" style={{ textDecoration: 'none' }}><Button variant="contained"><AddIcon />Add Price Classification</Button></Link>
        </Grid>

      </Grid>
      <PriceClassificationListComponent priceClassificationData={priceClassificationData.responseBody} /></div>
  )
}

export default PriceClassificationList