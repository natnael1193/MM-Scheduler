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
import { usePriceCategoriesQuery, usePriceCategoryQuery } from 'src/services/PriceCategoryApi';


const ScheduleEditForm = ({ defaultValues, onFormSubmit, formTitle, startDate, endDate }: any) => {
  // var priceClassificationData: any = [];
  const [priceCategoryId, setPriceCategoryId] = React.useState(defaultValues?.priceConfig?.priceCategoryId);
  //Get All Price Classifications
  const {
    data: priceCategoryData,
    error: priceCategoryError,
    isLoading: priceCategoryLoading,
  }: any = usePriceCategoriesQuery();
  const {
    data: priceConfigData,
    error: priceConfigError,
    isLoading: priceConfigLoading,
  }: any = usePriceCategoryQuery(priceCategoryId);

  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  if (priceCategoryLoading || priceConfigLoading)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  if (priceCategoryError || priceConfigError)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h3">Something Went Wrong</Typography>
      </Grid>
    );
  console.log(defaultValues?.priceConfig?.priceCategoryId);
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
                <TextField {...register('key')} label="Alias" fullWidth />
              </Grid>

              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField
                  {...register('startTime')}
                  label="Start Time"
                  type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 1 }}
                  fullWidth
                />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField
                  {...register('endTime')}
                  label="End Time"
                  type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 1 }}
                  fullWidth
                />
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    Select Price Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Select Price Category"
                    displayEmpty
                    {...register('priceConfigId')}
                    defaultValue={defaultValues?.priceConfig?.priceCategoryId}
                    // value={priceCategoryId}
                    onChange={(e: any) => {
                      setPriceCategoryId(e.target.value);
                    }}
                    fullWidth
                  >
                    {priceCategoryData?.data?.map((priceCategory: any) => (
                      <MenuItem value={priceCategory.id} key={priceCategory.id}>
                        {priceCategory.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">Select Price Config</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Select Price Config"
                    displayEmpty
                    {...register('priceConfigId')}
                    defaultValue={defaultValues?.priceConfig?.id}
                    fullWidth
                  >
                    {priceConfigData?.data?.priceConfigs?.map((priceConfig: any) => (
                      <MenuItem value={priceConfig.id} key={priceConfig.id}>
                        {priceConfig.name}
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
