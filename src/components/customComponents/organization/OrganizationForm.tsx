import {
  Box,
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
import React from 'react';
import { useForm } from 'react-hook-form';
import { useOrganizationTypesQuery } from 'src/services/OrganizationTypeApi';

const OrganizationForm = ({ onFormSubmit, formTitle, defaultValues }: any) => {
  let organizationTypeData: any = [];

  const { register, handleSubmit } = useForm({
    defaultValues,
  });

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

// console.log(defaultValues.organizationType.id)

  return (
    <div>
      <Box>
        <Card>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Grid container spacing={3} sx={{ p: 3 }}>
              <Grid item lg={12} md={12} sm={12}>
                {' '}
                <Typography variant="h3" sx={{ p: 3 }}>
                  {formTitle}
                </Typography>
              </Grid>
              <Grid item lg={4} md={4} sm={12}>
                <TextField fullWidth label="Organization Name" {...register('name')} />
              </Grid>
              <Grid item lg={4} md={4} sm={12}>
                <TextField fullWidth label="Key" {...register('key')} />
              </Grid>
              <Grid item lg={4} md={4} sm={12}>
                {/* <TextField fullWidth label="Organization Type" {...register('organizationTypeId')} /> */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Organization Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Organization Type"
                    displayEmpty
                    defaultValue={defaultValues.organizationType ? defaultValues.organizationType.id : ''}
                    {...register('organizationTypeId', { required: true })}
                  >
                    {organizationTypeData.data.map((organizationType: any) => (
                      <MenuItem key={organizationType.id} value={organizationType.id}>
                        {organizationType.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* <Typography variant='inherit' color="error">{errors.organizationTypeId && "This is required"}</Typography> */}
                </FormControl>
              </Grid>
   
              <Grid item lg={12} md={12} sm={12}>
                <TextField
                  fullWidth
                  label="Organization Description"
                  {...register('description')}
                  multiline={true}
                  rows={5}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12}>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Box>
    </div>
  );
};

export default OrganizationForm;
