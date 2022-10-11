import {
  Card,
  TextField,
  Typography,
  Button,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useOrganizationsQuery } from 'src/services/OrganizationApi';

const StationForm = ({ formTitle, defaultValues, onFormSubmit }: any) => {
  let organizationData: any = [];
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
  });

  // Get All Organization Types
  const { data, error, isLoading, isSuccess, isFetching } = useOrganizationsQuery();

  if (isLoading || isFetching)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  if (isSuccess) {
    organizationData = data;
  }

  if (error)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h3">Something Went Wrong</Typography>
      </Grid>
    );

  return (
    <div>
      <Grid>
        <Card sx={{ p: 3 }}>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Typography variant="h3" sx={{ mb: 5 }}>
              {formTitle}
            </Typography>
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={12} xs={12}>
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
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField
                  {...register('key', { required: true })}
                  id="outlined-basic"
                  label="Key"
                  variant="outlined"
                  fullWidth
                />
                <Typography variant="inherit" color="error">
                  {errors.key && 'This is required'}
                </Typography>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Organization</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Organization"
                    displayEmpty
                    defaultValue={
                      defaultValues.organization ? defaultValues.organization.id : ''
                    }
                    {...register('organizationId', { required: true })}
                  >
                    {organizationData.data.map((organization: any) => (
                      <MenuItem key={organization.id} value={organization.id}>
                        {organization.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant='inherit' color="error">{errors.organizationId && "This is required"}</Typography>
                </FormControl>

              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 3, mb: 3 }}>
                <TextField
                  {...register('description')}
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline={true}
                  rows={5}
                />
              </Grid>
              <Typography variant="inherit" color="error">
                  {errors.description && 'This is required'}
                </Typography>
            </Grid>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </Card>
      </Grid>
    </div>
  );
};

export default StationForm;
