import { Button, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import BreadCrumb from '../breadCrumb/BreadCrumb';
import OrganizationListComponent from '../../../components/customComponents/organization/OrganizationListComponent';
import ErrorComponent from 'src/components/customComponents/shared/ErrorComponent';
import LoadingComponent from 'src/components/customComponents/shared/LoadingComponent';
import { useOrganizationsQuery } from 'src/services/OrganizationApi';

const OrganizationList = () => {
  let organizationData: any = [];

  // Get All Organization
  const { data, error, isLoading, isSuccess }: any = useOrganizationsQuery();

  if (isLoading) return <LoadingComponent />;

  if (error) return <ErrorComponent />;

  if (isSuccess) {
    organizationData = data.data;
  }

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Organization'}
        child={'List'}
        parentLink={'/dashboard/organization/list'}
      />
      <Grid container sx={{ mb: 1 }} direction="row">
        <Grid item lg={10} md={8} sm={6} xs={6}>
          <Typography variant="h3">Organizations</Typography>
        </Grid>
        <Grid item lg={2} md={4} sm={6} xs={6}>
          <Link to="/dashboard/organization/add" style={{ textDecoration: 'none' }}>
            {' '}
            <Button variant="contained">
              <AddIcon /> Add Organization{' '}
            </Button>
          </Link>
        </Grid>
      </Grid>
      <OrganizationListComponent organizationData={organizationData}/>
    </div>
  );
};

export default OrganizationList;
