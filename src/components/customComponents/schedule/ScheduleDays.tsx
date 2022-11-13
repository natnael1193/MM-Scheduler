import {
  Button,
  FormControl,
  // CircularProgress,
  // FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAddScheduleMutation } from 'src/services/ScheduleApi';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import LoadingComponent from '../shared/LoadingComponent';
import { usePriceConfigsQuery } from 'src/services/PriceConfigApi';
import ErrorComponent from '../shared/ErrorComponent';

const ScheduleDays = ({ scheduleData }: any) => {
  var programDataId: string = '';

  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  const {
    data: priceConfigData,
    isLoading: priceConfigLoading,
    error: priceConfigError,
  }: any = usePriceConfigsQuery();

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  //Switch States
  const [state, setState] = React.useState({
    monday: false,
    tuesday: false,
    wendsday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  //Add Schedules
  const [addSchedules, result] = useAddScheduleMutation();

  programDataId = scheduleData.programId;
  console.log(programDataId);
  //Check the status
  const response: any = result;
  React.useEffect(() => {
    if (response.isSuccess) {
      toast.success(response.data.status);
      navigate(`/dashboard/program/detail/${programDataId}`);
      window.location.reload();
    }
    if (response.isError) {
      // toast.error(response.error.data.error)
    }
  }, [response, navigate, programDataId]);

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    //Check at least one date is selected
    if (data.schedules === undefined) {
      return toast.error('At least 1 day must be selected', {});
    }
    if (data.schedules !== undefined) {
      if (data.schedules.length === 0) {
        return toast.error('At least 1 day must be selected', {});
      }
    }
    if (data.schedules === undefined) {
      return toast.error('At least 1 day must be selected', {});
    }

    //Filter selected dates
    let newSchedules: any = [];
    const scheduleList: any = data.schedules ? data.schedules : [];
    newSchedules = scheduleList.filter((element: any) => element.startTime !== undefined);

    //Assign the selected dates to a variable
    const newData: any = {
      schedules: newSchedules,
      programId: scheduleData.programId,
      key: scheduleData.key,
      startTime: scheduleData.startDate,
      endTime: scheduleData.endDate,
    };
    console.log(newData);
    addSchedules(newData);
  };

  if (loading || priceConfigLoading) return <LoadingComponent />;
  if (priceConfigError) return <ErrorComponent />;

  console.log(priceConfigData)

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {/* Monday Schedule Start */}
          <Grid item lg={2} md={3} sm={12} xs={12} sx={{ mt: 3 }}>
            <FormControlLabel
              control={<Switch checked={state.monday} onChange={handleChange} name="monday" />}
              onClick={() => {
                reset({
                  keepErrors: true,
                  keepDirty: true,
                  keepIsSubmitted: false,
                  keepTouched: false,
                  keepIsValid: false,
                  keepSubmitCount: false,
                });
              }}
              label="Monday"
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Input
              type="hidden"
              value="monday"
              {...(state.monday ? register(`schedules.${0}.day` as const) : null)}
            />
            {state.monday ? (
              <TextField
                {...register(`schedules.${0}.startTime` as const, { required: true })}
                label="Start Time"
                InputLabelProps={{ shrink: true }}
                type="time"
                sx={{ width: '100%' }}
                required
                disabled={state.monday ? false : true}
              />
            ) : (
              <TextField
                label="Start Time"
                sx={{ width: '100%' }}
                disabled={state.monday ? false : true}
              />
            )}
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            {state.monday ? (
              <TextField
                {...register(`schedules.${0}.endTime` as const)}
                label="End Time"
                InputLabelProps={{ shrink: true }}
                type="time"
                sx={{ width: '100%' }}
                required
                disabled={state.monday ? false : true}
              />
            ) : (
              <TextField
                label="End Time"
                sx={{ width: '100%' }}
                disabled={state.monday ? false : true}
              />
            )}
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Select Price Config
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Select Price Config"
                {...(state.monday ? register(`schedules.${0}.priceId` as const) : null)}
                defaultValue=""
                required
                disabled={state.monday ? false : true}
              >
                {priceConfigData?.data?.map((priceConfig: any) => (
                  <MenuItem value={priceConfig.id} key={priceConfig.id}>
                    {priceConfig.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/*  Monday Schedule End */}

          {/* Tuesday Schedule Start */}
          <Grid item lg={2} md={3} sm={12} xs={12} sx={{ mt: 3 }}>
            <FormControlLabel
              control={<Switch checked={state.tuesday} onChange={handleChange} name="tuesday" />}
              label="Tuesday"
              onClick={() => {
                reset({
                  keepErrors: true,
                  keepDirty: true,
                  keepIsSubmitted: false,
                  keepTouched: false,
                  keepIsValid: false,
                  keepSubmitCount: false,
                });
              }}
              // {...register('monday')}
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Input
              type="hidden"
              value="tuesday"
              {...(state.tuesday ? register(`schedules.${1}.day` as const) : null)}
            />
            {state.tuesday ? (
              <TextField
                {...register(`schedules.${1}.startTime` as const)}
                label="Start Time"
                InputLabelProps={{ shrink: true }}
                type="time"
                sx={{ width: '100%' }}
                required
                disabled={state.tuesday ? false : true}
              />
            ) : (
              <TextField
                label="Start Time"
                sx={{ width: '100%' }}
                disabled={state.tuesday ? false : true}
              />
            )}
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            {state.tuesday ? (
              <TextField
                {...register(`schedules.${1}.endTime` as const)}
                label="End Time"
                InputLabelProps={{ shrink: true }}
                type="time"
                sx={{ width: '100%' }}
                required
                disabled={state.tuesday ? false : true}
              />
            ) : (
              <TextField
                label="End Time"
                sx={{ width: '100%' }}
                disabled={state.tuesday ? false : true}
              />
            )}
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Select Price Config
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Select Price Config"
                displayEmpty
                {...(state.tuesday ? register(`schedules.${1}.priceId` as const) : null)}
                defaultValue=""
                disabled={state.tuesday ? false : true}
                required
              >
                {priceConfigData?.data?.map((priceConfig: any) => (
                  <MenuItem value={priceConfig.id} key={priceConfig.id}>
                    {priceConfig.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Tuesday Schedule End */}

          {/* Wendsday Shedule Start */}
          <Grid item lg={2} md={3} sm={12} xs={12} sx={{ mt: 3 }}>
            <FormControlLabel
              control={<Switch checked={state.wendsday} onChange={handleChange} name="wendsday" />}
              onClick={() => {
                reset({
                  keepErrors: true,
                  keepDirty: true,
                  keepIsSubmitted: false,
                  keepTouched: false,
                  keepIsValid: false,
                  keepSubmitCount: false,
                });
              }}
              label="Wendsday"
              // {...register('monday')}
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Input
              type="hidden"
              value="wednesday"
              {...(state.wendsday ? register(`schedules.${2}.day` as const) : null)}
            />
            {state.wendsday ? (
              <TextField
                {...register(`schedules.${2}.startTime` as const)}
                label="Start Time"
                InputLabelProps={{ shrink: true }}
                type="time"
                sx={{ width: '100%' }}
                disabled={state.wendsday ? false : true}
                required
              />
            ) : (
              <TextField
                label="Start Time"
                sx={{ width: '100%' }}
                disabled={state.wendsday ? false : true}
              />
            )}
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            {state.wendsday ? (
              <TextField
                {...register(`schedules.${2}.endTime` as const)}
                label="End Time"
                InputLabelProps={{ shrink: true }}
                type="time"
                sx={{ width: '100%' }}
                disabled={state.wendsday ? false : true}
                required
              />
            ) : (
              <TextField
                label="End Time"
                sx={{ width: '100%' }}
                disabled={state.wendsday ? false : true}
              />
            )}
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Select Price Config
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Select Price Config"
                displayEmpty
                {...(state.wendsday ? register(`schedules.${2}.priceId` as const) : null)}
                defaultValue=""
                disabled={state.wendsday ? false : true}
                required
              >
                {priceConfigData?.data?.map((priceConfig: any) => (
                  <MenuItem value={priceConfig.id} key={priceConfig.id}>
                    {priceConfig.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Wendsday Schdule End */}

          {/* Thursday Schedule Start */}
          <Grid item lg={2} md={3} sm={12} xs={12} sx={{ mt: 3 }}>
            <FormControlLabel
              control={<Switch checked={state.thursday} onChange={handleChange} name="thursday" />}
              onClick={() => {
                reset({
                  keepErrors: true,
                  keepDirty: true,
                  keepIsSubmitted: false,
                  keepTouched: false,
                  keepIsValid: false,
                  keepSubmitCount: false,
                });
              }}
              label="Thursday"
              // {...register('monday')}
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Input
              type="hidden"
              value="thursday"
              {...(state.thursday ? register(`schedules.${3}.day` as const) : null)}
            />
            {state.thursday ? (
              <TextField
                {...register(`schedules.${3}.startTime` as const)}
                label="Start Time"
                InputLabelProps={{ shrink: true }}
                type="time"
                sx={{ width: '100%' }}
                disabled={state.thursday ? false : true}
                required
              />
            ) : (
              <TextField
                label="Start Time"
                sx={{ width: '100%' }}
                disabled={state.thursday ? false : true}
              />
            )}
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            {state.thursday ? (
              <TextField
                {...register(`schedules.${3}.endTime` as const)}
                label="End Time"
                InputLabelProps={{ shrink: true }}
                type="time"
                sx={{ width: '100%' }}
                disabled={state.thursday ? false : true}
                required
              />
            ) : (
              <TextField
                label="End Time"
                sx={{ width: '100%' }}
                disabled={state.thursday ? false : true}
              />
            )}
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Select Price Config
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Select Price Config"
                displayEmpty
                {...(state.thursday ? register(`schedules.${3}.priceId` as const) : null)}
                defaultValue=""
                disabled={state.thursday ? false : true}
                required
              >
                {priceConfigData?.data?.map((priceConfig: any) => (
                  <MenuItem value={priceConfig.id} key={priceConfig.id}>
                    {priceConfig.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Thursday Schedule End */}

          {/* Friday Schedule Start */}
          <Grid item lg={2} md={3} sm={12} xs={12} sx={{ mt: 3 }}>
            <FormControlLabel
              control={<Switch checked={state.friday} onChange={handleChange} name="friday" />}
              onClick={() => {
                reset({
                  keepErrors: true,
                  keepDirty: true,
                  keepIsSubmitted: false,
                  keepTouched: false,
                  keepIsValid: false,
                  keepSubmitCount: false,
                });
              }}
              label="Friday"
              // {...register('monday')}
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Input
              type="hidden"
              value="friday"
              {...(state.friday ? register(`schedules.${4}.day` as const) : null)}
            />
            {state.friday ? (
              <TextField
                {...register(`schedules.${4}.startTime` as const)}
                label="Start Time"
                InputLabelProps={{ shrink: true }}
                type="time"
                sx={{ width: '100%' }}
                disabled={state.friday ? false : true}
                required
              />
            ) : (
              <TextField
                label="Start Time"
                sx={{ width: '100%' }}
                disabled={state.friday ? false : true}
              />
            )}
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            {state.friday ? (
              <TextField
                {...register(`schedules.${4}.endTime` as const)}
                label="End Time"
                InputLabelProps={{ shrink: true }}
                type="time"
                sx={{ width: '100%' }}
                disabled={state.friday ? false : true}
                required
              />
            ) : (
              <TextField
                label="End Time"
                sx={{ width: '100%' }}
                disabled={state.friday ? false : true}
              />
            )}
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Select Price Config
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Select Price Config"
                displayEmpty
                {...(state.friday ? register(`schedules.${4}.priceId` as const) : null)}
                defaultValue=""
                disabled={state.friday ? false : true}
                required
              >
                {priceConfigData?.data?.map((priceConfig: any) => (
                  <MenuItem value={priceConfig.id} key={priceConfig.id}>
                    {priceConfig.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Friday Schedule End */}

          {/* Saturday Schedule Start */}
          <Grid item lg={2} md={3} sm={12} xs={12} sx={{ mt: 3 }}>
            <FormControlLabel
              control={<Switch checked={state.saturday} onChange={handleChange} name="saturday" />}
              onClick={() => {
                reset({
                  keepErrors: true,
                  keepDirty: true,
                  keepIsSubmitted: false,
                  keepTouched: false,
                  keepIsValid: false,
                  keepSubmitCount: false,
                });
              }}
              label="Saturday"
              // {...register('monday')}
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Input
              type="hidden"
              value="saturday"
              {...(state.saturday ? register(`schedules.${5}.day` as const) : null)}
            />
            {state.saturday ? (
              <TextField
                {...register(`schedules.${5}.startTime` as const)}
                label="Start Time"
                InputLabelProps={{ shrink: true }}
                type="time"
                sx={{ width: '100%' }}
                disabled={state.saturday ? false : true}
                required
              />
            ) : (
              <TextField
                label="Start Time"
                sx={{ width: '100%' }}
                disabled={state.saturday ? false : true}
              />
            )}
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            {state.saturday ? (
              <TextField
                {...register(`schedules.${5}.endTime` as const)}
                label="End Time"
                InputLabelProps={{ shrink: true }}
                type="time"
                sx={{ width: '100%' }}
                disabled={state.saturday ? false : true}
                required
              />
            ) : (
              <TextField
                label="End Time"
                sx={{ width: '100%' }}
                disabled={state.saturday ? false : true}
              />
            )}
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Select Price Config
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Select Price Config"
                displayEmpty
                {...(state.saturday ? register(`schedules.${5}.priceId` as const) : null)}
                defaultValue=""
                disabled={state.saturday ? false : true}
                required
              >
                {priceConfigData?.data?.map((priceConfig: any) => (
                  <MenuItem value={priceConfig.id} key={priceConfig.id}>
                    {priceConfig.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Saturday Schedule End */}

          {/* Sunday Schedule Start */}
          <Grid item lg={2} md={3} sm={12} xs={12} sx={{ mt: 3 }}>
            <FormControlLabel
              control={<Switch checked={state.sunday} onChange={handleChange} name="sunday" />}
              onClick={() => {
                reset({
                  keepErrors: true,
                  keepDirty: true,
                  keepIsSubmitted: false,
                  keepTouched: false,
                  keepIsValid: false,
                  keepSubmitCount: false,
                });
              }}
              label="Sunday"
              // {...register('monday')}
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Input
              type="hidden"
              value="sunday"
              {...(state.sunday ? register(`schedules.${6}.day` as const) : null)}
            />
            {state.sunday ? (
              <TextField
                {...register(`schedules.${6}.startTime` as const)}
                label="Start Time"
                InputLabelProps={{ shrink: true }}
                type="time"
                sx={{ width: '100%' }}
                disabled={state.sunday ? false : true}
                required
              />
            ) : (
              <TextField
                label="Start Time"
                sx={{ width: '100%' }}
                disabled={state.sunday ? false : true}
              />
            )}
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            {state.sunday ? (
              <TextField
                {...register(`schedules.${6}.endTime` as const)}
                label="End Time"
                InputLabelProps={{ shrink: true }}
                type="time"
                sx={{ width: '100%' }}
                disabled={state.sunday ? false : true}
                required
              />
            ) : (
              <TextField
                label="End Time"
                sx={{ width: '100%' }}
                disabled={state.sunday ? false : true}
              />
            )}
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Select Price Config
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Select Price Config"
                displayEmpty
                {...(state.sunday ? register(`schedules.${6}.priceId` as const) : null)}
                defaultValue=""
                disabled={state.sunday ? false : true}
                required
              >
                {priceConfigData?.data?.map((priceConfig: any) => (
                  <MenuItem value={priceConfig.id} key={priceConfig.id}>
                    {priceConfig.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Sunday Schedule Start */}

          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ m: 2 }}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                type="submit"
                disabled={
                  scheduleData.programId === undefined ||
                  scheduleData.programId === '' ||
                  scheduleData.startDate === undefined ||
                  scheduleData.startDate === '' ||
                  scheduleData.endDate === undefined ||
                  scheduleData.endDate === ''
                    ? true
                    : false
                }
              >
                Submit
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ScheduleDays;
