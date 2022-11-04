import {
  Button,
  Card,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useStationsQuery } from 'src/services/StationApi';

const ProgramForm = ({ defaultValues, onFormSubmit, formTitle }: any) => {
  let stationData: any = [];

  //Get All Price Classifications
  const { data, error, isLoading, isSuccess, isFetching } = useStationsQuery();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
  });

  if (isLoading || isFetching)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  if (isSuccess) {
    stationData = data;
  }

  if (error)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h3">Something Went Wrong</Typography>
      </Grid>
    );

  console.log(defaultValues);

  return (
    <div>
      <Grid sx={{ m: 2 }}>
        <Card sx={{ p: 4 }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            {formTitle}
          </Typography>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Grid container spacing={4}>
              <Grid item lg={4} md={4} sm={12} xs={12} sx={{ p: 1 }}>
                <TextField
                  {...register('key', { required: true })}
                  id="outlined-basic"
                  label="Alias"
                  variant="outlined"
                  fullWidth
                />
                <Typography variant="inherit" color="error">
                  {errors.key && 'This is required'}
                </Typography>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12} sx={{ p: 1 }}>
                <TextField
                  {...register('name', { required: true })}
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  fullWidth
                />
                <Typography variant="inherit" color="error">
                  {errors.name && 'This is required'}
                </Typography>
              </Grid>

              <Grid item lg={4} md={4} sm={12} xs={12} sx={{ p: 1 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Program Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Program Type"
                    displayEmpty
                    defaultValue={defaultValues.programType ? defaultValues.programType : ''}
                    {...register('programType', { required: true })}
                  >
                    <MenuItem value="TV">Tv</MenuItem>
                    <MenuItem value="RADIO">Radio</MenuItem>
                  </Select>
                  <Typography variant="inherit" color="error">
                    {errors.programType && 'This is required'}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ p: 1 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Station</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Station"
                    displayEmpty
                    defaultValue={defaultValues.station ? defaultValues.stationId : ''}
                    {...register('stationId', { required: true })}
                  >
                    {stationData.data.map((station: any) => (
                      <MenuItem key={station.id} value={station.id}>
                        {station.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="inherit" color="error">
                    {errors.stationId && 'This is required'}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ p: 1 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">IsActive?</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="IsActive"
                    displayEmpty
                    defaultValue={
                      defaultValues.isActive === false
                        ? false
                        : defaultValues.isActive === true
                        ? true
                        : ''
                    }
                    {...register('isActive', { required: true })}
                  >
                    <MenuItem value={JSON.parse('True'.toLowerCase())}>Active</MenuItem>
                    <MenuItem value={JSON.parse('False'.toLowerCase())}>Not Active</MenuItem>
                  </Select>
                  <Typography variant="inherit" color="error">
                    {errors.isActive && 'This is required'}
                  </Typography>
                </FormControl>
              </Grid>
              {/* <Grid item lg={4} md={4} sm={12} xs={12} sx={{ p: 1 }}>
                                <TextField
                                    {...register('code', { required: true })}
                                    id="outlined-basic"
                                    label="Code"     variant="outlined"
                                    fullWidth
                                />
                                <Typography variant="inherit" color="error">
                                    {errors.code && 'This is required'}
                                </Typography>
                            </Grid> */}
              <Grid item lg={12} md={12} sm={12} xs={12} sx={{ p: 1 }}>
                <TextField
                  {...register('description', { required: true })}
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline={true}
                  rows={5}
                />
                <Typography variant="inherit" color="error">
                  {errors.description && 'This is required'}
                </Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12} sx={{ p: 1 }}>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Grid>
    </div>
  );
};

export default ProgramForm;
