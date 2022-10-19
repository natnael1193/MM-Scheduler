import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useProgramsQuery } from 'src/services/ProgramApi';
import ProgramListComponent from '../../../components/customComponents/program/ProgramListComponent';
import { Link } from 'react-router-dom';
import BreadCrumb from '../breadCrumb/BreadCrumb';
import ProgramsByDates from 'src/components/customComponents/program/ProgramsByDates';

const ProgramList = () => {
  let programData: any = [];

  //Get All Programs
  const { data, error, isLoading, isSuccess, isFetching } = useProgramsQuery();

  if (isLoading || isFetching)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  if (isSuccess) {
    programData = data;
  }

  if (error)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h3">Something Went Wrong</Typography>
      </Grid>
    );

  var newProgramData: any = [];

  newProgramData =
    programData &&
    programData.data.map(function (program: any) {
      return {
        id: program.id,
        name: program.name,
        programType: program.programType,
        isActive: program.isActive,
        // station: program.station.name,
      };
    });

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Program'}
        child={'List'}
        parentLink={'/dashboard/program/list'}
      />
      <Grid container sx={{ mb: 1 }} direction="row">
        <Grid item lg={10} md={8} sm={6} xs={6}>
          <Typography variant="h3">Programs</Typography>
        </Grid>
        <Grid item lg={2} md={4} sm={6} xs={6}>
          <Link to="/dashboard/program/add" style={{ textDecoration: 'none' }}>
            {' '}
            <Button variant="contained">
              <AddIcon /> Add Program{' '}
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <ProgramsByDates />
      </Grid>
      <ProgramListComponent programData={newProgramData} />
    </div>
  );
};

export default ProgramList;
