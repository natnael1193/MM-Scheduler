import { Grid, CircularProgress, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import BreadCrumb from '../../breadCrumb/BreadCrumb';
import { useOrganizationTypesQuery } from 'src/services/OrganizationTypeApi';
import OrganizationTypeListComponent from 'src/components/customComponents/organization/organizationType/OrganizationTypeListComponent';

const OrganizationTypeList = () => {
  let organizationTypeData: any = [];

  // Get All Organization Types
  const { data, error, isLoading, isSuccess, isFetching } = useOrganizationTypesQuery();

  if (isLoading || isFetching)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  if (isSuccess) {
    organizationTypeData = data;
  }

  if (error)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h3">Something Went Wrong</Typography>
      </Grid>
    );

  return (
    <div>
      {' '}
      <BreadCrumb
        main={'Dashboard'}
        parent={'Organization Type'}
        child={'List'}
        parentLink={'/dashboard/organization-type/list'}
      />
      <Grid container>
        <Grid item lg={10} md={8} sm={12} xs={12}>
          <Typography variant="h3">Organization Type</Typography>
        </Grid>
        <Grid item lg={2} md={4} sm={12} xs={12}>
          <Link to="/dashboard/organization-type/add" style={{ textDecoration: 'none' }}>
            {' '}
            <Button variant="contained">
              <AddIcon />
              Add Organization Type
            </Button>{' '}
          </Link>
        </Grid>
      </Grid>
      <OrganizationTypeListComponent organizationTypeData={organizationTypeData} />
    </div>
  );
};

export default OrganizationTypeList;
