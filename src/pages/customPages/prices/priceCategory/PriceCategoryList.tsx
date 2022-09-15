import { Grid, CircularProgress, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PriceCategoryListComponent from 'src/components/customComponents/prices/priceCategory/PriceCategoryListComponent';
import { usePriceCategoriesQuery } from 'src/services/PriceCategoryApi';
import AddIcon from '@mui/icons-material/Add';
import BreadCrumb from '../../breadCrumb/BreadCrumb';

const PriceCategoryList = () => {
  let priceCategoryData: any = [];

  //Get All Price Categories
  const { data, error, isLoading, isSuccess, isFetching } = usePriceCategoriesQuery();

  if (isLoading || isFetching)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  if (isSuccess) {
    priceCategoryData = data;
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
        parent={'Price Category'}
        child={'List'}
        parentLink={'/dashboard/price-category/list'}
      />
      <Grid container>
        <Grid item lg={10} md={8} sm={12} xs={12}>
          <Typography variant="h3">Price Category</Typography>
        </Grid>
        <Grid item lg={2} md={4} sm={12} xs={12}>
          <Link to="/dashboard/price-category/add" style={{ textDecoration: 'none' }}>
            {' '}
            <Button variant="contained">
              <AddIcon />
              Add Price Category
            </Button>{' '}
          </Link>
        </Grid>
      </Grid>
      <PriceCategoryListComponent priceCategoryData={priceCategoryData.data} />
    </div>
  );
};

export default PriceCategoryList;
