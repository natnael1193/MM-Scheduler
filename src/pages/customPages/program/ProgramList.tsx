import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useProgramByDateQuery, useProgramsQuery } from 'src/services/ProgramApi';
import ProgramListComponent from '../../../components/customComponents/program/ProgramListComponent';
import { Link } from 'react-router-dom';
import BreadCrumb from '../breadCrumb/BreadCrumb';
import ProgramsByDates from 'src/components/customComponents/program/ProgramsByDates';
import React from 'react';

const ProgramList = () => {
  const [activeDate, setActiveDate] = React.useState('Monday');
  let programData: any = [];
  let programDataByDate: any = [];

  //Get All Programs
  const { data, error, isLoading, isSuccess, isFetching } = useProgramsQuery();

  //Get Program By Dates
  const {
    data: programByDate,
    error: programByDateError,
    isSuccess: programByDateSuccess,
    isLoading: programByDateLoading,
    isFetching: programByDateFetching,
  } = useProgramByDateQuery(activeDate);

  if (isLoading || isFetching || programByDateLoading || programByDateFetching)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  if (isSuccess) {
    programData = data;
  }
  if (programByDateSuccess) {
    programDataByDate = programByDate;
  }

  if (error || programByDateError)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h3">Something Went Wrong</Typography>
      </Grid>
    );

  var newProgramData: any = [];


  newProgramData = programDataByDate.data.programs.map(function (program: any) {
    return {
      id: program.program.id,
      name: program.program.name,
      programType: program.program.programType,
      isActive: program.program.isActive,
      // station: program.station.name,
    };
  });

  // console.log(newProgramData);

  console.log(programDataByDate.data.programs);

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
      <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2}}>
        <ProgramsByDates activeDate={activeDate} setActiveDate={setActiveDate} />
      </Grid>
      <ProgramListComponent programData={newProgramData} />
    </div>
  );
};

export default ProgramList;
