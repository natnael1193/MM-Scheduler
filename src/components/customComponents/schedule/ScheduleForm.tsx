import React, { lazy, Suspense } from 'react';
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
import { useForm } from 'react-hook-form';
// import ScheduleDays from './ScheduleDays';
import { useProgramByStationQuery } from 'src/services/ProgramApi';
import LoadingScreen from 'src/components/LoadingScreen';
import { useStationsQuery } from 'src/services/StationApi';

const ScheduleDays = lazy(() => import('./ScheduleDays'));

const ScheduleForm = () => {
  // let programData: any = [];
  const [stationId, setStationId] = React.useState('');
  const [priceCategory, setPriceCategory] = React.useState([]);

  const [mondayPrice, setMondayPrice] = React.useState([]);
  const [tuesdayPrice, setTuesdayPrice] = React.useState([]);
  const [wendsdayPrice, setWendsdayPrice] = React.useState([]);
  const [thursdayPrice, setThursdayPrice] = React.useState([]);
  const [fridayPrice, setFridayPrice] = React.useState([]);
  const [saturdayPrice, setSaturdayPrice] = React.useState([]);
  const [sundayPrice, setSundayPrice] = React.useState([]);

  //Get All Stations
  const {
    data: stationData,
    error: stationError,
    isLoading: stationLoading,
    isFetching: stationFetching,
    refetch: stationRefetch,
  }: any = useStationsQuery();
  //Get All Programs
  const {
    data: programData,
    error: programError,
    isLoading: programLoading,
  }: any = useProgramByStationQuery(stationId);

  const {
    register,
    watch,
    // formState: { errors },
  } = useForm();

  const scheduleData: any = watch();

  if (
    // isLoading || isFetching ||
    stationLoading ||
    stationFetching ||
    programLoading
  )
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  // if (isSuccess) {
  //   programData = data;
  // }

  // programData = stationData?.data?.filter((programs: any) => {
  //   return programs.id === stationId;
  // });

  // programData = programData?.[0]?.programs;

  if (
    // error
    stationError ||
    programError
  )
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h3">Something Went Wrong</Typography>
      </Grid>
    );

  console.log(programData);

  return (
    <div>
      <Box>
        <Card sx={{ p: 4 }}>
          <Grid container spacing={2}>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <Typography variant="h3">Add Schedule</Typography>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Button
                variant="contained"
                onClick={() => {
                  stationRefetch();
                }}
              >
                Refresh
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextField label="Alias" {...register('key', { required: true })} fullWidth />
              <Typography variant="inherit" color="error">
                {scheduleData.key === '' && 'This is required'}
              </Typography>
            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Stations</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Stations"
                  fullWidth
                  displayEmpty
                  defaultValue=""
                  value={stationId}
                  {...register('stationId')}
                  onChange={(e: any) => {
                    setStationId(e.target.value);
                  }}
                >
                  {stationData.data.map((station: any) => (
                    <MenuItem key={station.id} value={station.id.toString()}>
                      {station.name}
                    </MenuItem>
                  ))}
                </Select>
                {stationId === undefined || stationId === '' ? (
                  <Typography variant="inherit" color="error">
                    This is required
                  </Typography>
                ) : (
                  ''
                )}
              </FormControl>
            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Programs</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Programs"
                  fullWidth
                  displayEmpty
                  defaultValue=""
                  {...register('programId')}
                  onChange={() => {
                    setMondayPrice([]);
                    setTuesdayPrice([]);
                    setWendsdayPrice([]);
                    setThursdayPrice([]);
                    setFridayPrice([]);
                    setSaturdayPrice([]);
                    setSundayPrice([]);
                  }}
                >
                  {programData?.data?.programs?.map((program: any, key: any) => (
                    <MenuItem
                      key={program.id}
                      value={program.id.toString()}
                      onClick={() => {
                        setPriceCategory(program.priceCategories);
                      }}
                    >
                      {program.name}
                    </MenuItem>
                  ))}
                </Select>
                {scheduleData.programId === undefined || scheduleData.programId === '' ? (
                  <Typography variant="inherit" color="error">
                    This is required
                  </Typography>
                ) : (
                  ''
                )}
              </FormControl>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                {...register('startDate')}
                type={'date'}
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              {scheduleData.startDate === undefined || scheduleData.startDate === '' ? (
                <Typography variant="inherit" color="error">
                  This is required
                </Typography>
              ) : (
                ''
              )}
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                {...register('endDate')}
                type={'date'}
                label="End Date"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              {scheduleData.endDate === undefined || scheduleData.endDate === '' ? (
                <Typography variant="inherit" color="error">
                  This is required
                </Typography>
              ) : (
                ''
              )}
            </Grid>
          </Grid>
          {/* <DaysList scheduleData={scheduleData} /> */}
          <Suspense fallback={<LoadingScreen />}>
            <ScheduleDays
              scheduleData={scheduleData}
              priceCategory={priceCategory}
              {...{
                mondayPrice,
                setMondayPrice,
                tuesdayPrice,
                setTuesdayPrice,
                wendsdayPrice,
                setWendsdayPrice,
                thursdayPrice,
                setThursdayPrice,
                fridayPrice,
                setFridayPrice,
                saturdayPrice,
                setSaturdayPrice,
                sundayPrice,
                setSundayPrice,
              }}
            />
          </Suspense>
        </Card>
      </Box>
    </div>
  );
};

export default ScheduleForm;
