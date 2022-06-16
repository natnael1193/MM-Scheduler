import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useProgramsQuery } from 'src/services/ProgramApi';
import ProgramListComponent from '../../../components/customComponents/program/ProgramListComponent';
import { Link } from 'react-router-dom';


const ProgramList = () => {
  let programData: any = [];

  //Get All Programs
  const { data, error, isLoading, isSuccess, isFetching } = useProgramsQuery();

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
    programData = data;
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

  console.log(programData)

  return (
    <div>

      <Grid container sx={{ mb: 1 }} direction="row" >
        <Grid item lg={10} md={8} sm={6} xs={6} >
          <Typography variant="h3">Programs</Typography>
        </Grid>
        <Grid item lg={2} md={4} sm={6} xs={6} >
          <Link to='/dashboard/program/add' style={{ textDecoration: 'none' }}> <Button variant='contained'><AddIcon/> Add Program </Button></Link>
        </Grid>
        {/* <Grid item lg={6} md={6} sm={6} xs={6}>
          <Link to='/dashboard/program/add' style={{ textDecoration: 'none' }}><Button variant='contained'>Add New Program</Button></Link>
        </Grid> */}
      </Grid>
      <ProgramListComponent programData={programData.responseBody} /></div>
  )
}

export default ProgramList