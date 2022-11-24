import { Grid, CircularProgress, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useScheduleQuery, useUpdateScheduleMutation } from 'src/services/ScheduleApi';
import ScheduleEditForm from '../../../components/customComponents/schedule/ScheduleEditForm';
import BreadCrumb from '../breadCrumb/BreadCrumb';

const EditSchedule = () => {
  let defaultValues: any = {};
  let scheduleDefaultValue: any = {};
  const params: any = useParams();
  const paramsId: any = params.scheduleId;

  //Get Schedule By Id
  const { data: scheduleData, error, isLoading } = useScheduleQuery(paramsId);

  //Update the data
  const [updateSchedule, result] = useUpdateScheduleMutation();

  //Check the status
  const response: any = result;
  console.log(response);
  useEffect(() => {
    if (response.isSuccess) {
      toast.success('Schedule Updated');
    }
    if (response.isError) {
      toast.error('Something Wrong');
    }
  }, [response]);

  //Loading State
  if (isLoading)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  // Return an error if there is an error
  if (error) return <Typography variant="h3">Something Went Wrong</Typography>;

  defaultValues = scheduleData;
  console.log(defaultValues);
  scheduleDefaultValue = {
    id: defaultValues.data.id,
    // startTime: moment.utc(defaultValues.data.startTime).format('hh:mm:ss'),
    startTime: moment.utc(defaultValues.data.startTime).format('YYYY-MM-DD hh:mm:ss'),
    endTime: moment.utc(defaultValues.data.endTime).format('YYYY-MM-DD hh:mm:ss'),
    // endTime: defaultValues.data.endTime,
    key: defaultValues.data.key,
    // priceClassificationId: defaultValues.data.priceClasifcation.id,
    priceConfigId: defaultValues.data.priceConfig.id,
    priceConfig: defaultValues.data.priceConfig,
  };

  const startDate: any = moment(defaultValues.data.startTime).format('YYYY-MM-DD');
  const endDate: any = moment(defaultValues.data.endTime).format('YYYY-MM-DD');

  const onSubmit = (data: any) => {
    console.log(data);

    const startDate = moment.utc(data.startTime).format('YYYY-MM-DD');
    const starthour = moment.utc(data.startTime).format('hh:mm:ss');

    const endDate = moment.utc(data.endTime).format('YYYY-MM-DD');
    const endhour = moment.utc(data.endTime).format('hh:mm:ss');

    const newData: any = {
      id: data.id,
      // startTime: startDate.concat(' ', data.startTime),
      // endTime: endDate.concat(' ', data.endTime),
      startTime: startDate.concat('T').concat(starthour).concat('Z'),
      endTime: endDate.concat('T').concat(endhour).concat('Z'),
      // priceClasifcationId: data.priceClassificationId,
      priceConfigId: data.priceConfigId,
      programId: defaultValues.data.program.id,
      key: data.key,
    };

    // if (newData.startTime > newData.endTime) {
    //   return toast.error('Start Date should be less than End Date');
    // }

    if (
      moment(newData.startTime).format('YYYY-MM-DD') !==
      moment(newData.endTime).format('YYYY-MM-DD')
    ) {
      return toast.error("Dates can't be different");
    }


    updateSchedule(newData);
    // return toast.success('Schedule Updated');
  };

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Schedule'}
        child={'Edit'}
        parentLink={'/dashboard/schedule/timeline'}
      />
      <ScheduleEditForm
        defaultValues={scheduleDefaultValue}
        onFormSubmit={onSubmit}
        formTitle={'Edit Schedule'}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};

export default EditSchedule;
