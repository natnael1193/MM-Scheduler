import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import BreadCrumb from '../../breadCrumb/BreadCrumb';
import PriceConfigListComponent from 'src/components/customComponents/prices/priceConfig/PriceConfigListComponent';
import { usePriceConfigsQuery } from 'src/services/PriceConfigApi';

const PriceConfigList = () => {
  let priceConfigData: any = [];

  //Get All Price Categories
  const { data, error, isLoading, isSuccess, isFetching } = usePriceConfigsQuery();

  if (isLoading || isFetching)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  if (isSuccess) {
    priceConfigData = data;
  }

  if (error)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h3">Something Went Wrong</Typography>
      </Grid>
    );
  return (
    <div>
       <BreadCrumb
        main={'Dashboard'}
        parent={'Price Config'}
        child={'List'}
        parentLink={'/dashboard/price-config/list'}
      />
            <Grid container>
        <Grid item lg={10} md={8} sm={12} xs={12}>
          <Typography variant="h3">Price Config</Typography>
        </Grid>
        <Grid item lg={2} md={4} sm={12} xs={12}>
          <Link to="/dashboard/price-config/add" style={{ textDecoration: 'none' }}>
            {' '}
            <Button variant="contained">
              <AddIcon />
              Add Price Config
            </Button>{' '}
          </Link>
        </Grid>
      </Grid>
      <PriceConfigListComponent priceConfigData={priceConfigData.data}/>
    </div>
  )
}

export default PriceConfigList