import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Card,
  Button,
  TextField,
} from '@mui/material';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useStationsQuery } from 'src/services/StationApi';
import ErrorComponent from '../../shared/ErrorComponent';
import LoadingComponent from '../../shared/LoadingComponent';

const MultiplePriceCategoryForm = ({ onFormSubmit, formTitle }: any) => {
  const [stationId, setStationId] = React.useState('');
  const [programId, setProgramId] = React.useState('');
  let programData: any = [];
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
  } = useForm({
    defaultValues: {
      stationId: '',
      programId: '',
      priceType: '',
      priceCategories: [{ name: '', key: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'priceCategories',
  });

  const {
    data: stationData,
    isLoading: stationLoading,
    error: stationError,
  }: any = useStationsQuery();

  if (stationLoading) return <LoadingComponent />;
  if (stationError) return <ErrorComponent />;

  programData = stationData?.data?.filter((programs: any) => {
    return programs.id === stationId;
  });
  programData = programData?.[0]?.programs;
  console.log(programData);

  return (
    <div>
      <Grid>
        <Card sx={{ p: 2 }}>
          <Typography sx={{ p: 2 }} variant="h3">
            {formTitle}
          </Typography>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Grid container>
              <Grid item lg={4} md={4} sm={12} xs={12} sx={{ p: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Station</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Station"
                    defaultValue={''}
                    displayEmpty
                    {...register('stationId', { required: true })}
                    value={stationId}
                    onChange={(e: any) => {
                      setStationId(e.target.value);
                    }}
                  >
                    {stationData?.data?.map((stations: any) => (
                      <MenuItem value={stations.id} key={stations.id}>
                        {stations.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="inherit" color="error">
                    {errors.stationId && 'This is required'}
                  </Typography>
                </FormControl>
              </Grid>

              <Grid item lg={4} md={4} sm={12} xs={12} sx={{ p: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Program</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Program"
                    defaultValue={''}
                    displayEmpty
                    {...register('programId', { required: true })}
                    value={programId}
                    onChange={(e: any) => {
                      setProgramId(e.target.value);
                    }}
                  >
                    {programData?.map((programs: any) => (
                      <MenuItem value={programs.id} key={programs.id}>
                        {programs.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="inherit" color="error">
                    {errors.stationId && 'This is required'}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12} sx={{ p: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Price Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Price Type"
                    defaultValue={''}
                    displayEmpty
                    {...register('priceType', { required: true })}
                  >
                    <MenuItem value="Spot">Spot</MenuItem>
                    <MenuItem value="Sponsorship">Sponsorship</MenuItem>
                  </Select>
                  <Typography variant="inherit" color="error">
                    {errors.priceType && 'This is required'}
                  </Typography>
                </FormControl>
              </Grid>
            </Grid>

            {fields.map((item, index) => (
              <Grid container key={item.id}>
                <Grid item lg={10} md={12} sm={12} xs={12} sx={{ p: 1 }}>
                  <Grid container>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ p: 1 }}>
                      <TextField
                        {...register(`priceCategories.${index}.key`)}
                        fullWidth
                        label="Alias"
                      />
                      <Typography variant="inherit" color="error">
                        {/* {errors.key && 'This is required'} */}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ p: 1 }}>
                      <TextField
                        {...register(`priceCategories.${index}.name`)}
                        fullWidth
                        label="Price Category Name"
                      />
                      <Typography variant="inherit" color="error">
                        {/* {errors.name && 'This is required'} */}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={2} md={2} sm={12} xs={12} sx={{ p: 3 }}>
                  <Button
                    color="error"
                    variant="contained"
                    sx={{ mt: 1 }}
                    onClick={() => remove(index)}
                    disabled={watch('priceCategories').length < 2 ? true : false}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            ))}
            <Grid container>
              <Grid item lg={1} md={2} sm={12} xs={12} sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ color: 'white' }}
                  onClick={() => append({ name: '', key: '' })}
                >
                  Append
                </Button>
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12} sx={{ p: 2 }}>
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

export default MultiplePriceCategoryForm;
