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
import moment from 'moment';
import React from 'react';
import { useForm } from 'react-hook-form';
import { usePriceClassificationsQuery } from 'src/services/PriceClassificationApi';

const ScheduleEditForm = ({ defaultValues, onFormSubmit, formTitle, startDate, endDate }: any) => {
  var priceClassificationData: any = [];

  //Get All Price Classifications
  const { data, error, isLoading, isSuccess } = usePriceClassificationsQuery();

  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  if (isLoading)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  if (isSuccess) {
    priceClassificationData = data;
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
      <Box>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Card sx={{ p: 5 }}>
            <Typography variant="h3" sx={{ mb: 3 }}>
              {formTitle}
            </Typography>
            <Typography variant="h4" sx={{ mb: 3 }}>
             {moment.utc(startDate).format('dddd D, MMMM YYYY')}
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField
                  {...register('startTime')}
                  label="Start Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 1 }}
                  fullWidth
                />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField
                  {...register('endTime')}
                  label="End Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 1 }}
                  fullWidth
                />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
              <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Select Price Classification
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Select Price Classification"
                displayEmpty
                  {...register('priceClassificationId')}
                  defaultValue={defaultValues.priceClassificationId}
                  fullWidth
                >
                  {priceClassificationData.responseBody.map((priceClassification: any) => (
                    <MenuItem value={priceClassification.id} key={priceClassification.id}>
                      {priceClassification.name}
                    </MenuItem>
                  ))}
                </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button variant="contained" type="submit" sx={{ mt: 3 }}>
              Submit
            </Button>
          </Card>
        </form>
      </Box>
    </div>
  );
};

export default ScheduleEditForm;
