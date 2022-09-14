import { Grid, CircularProgress, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useScheduleQuery, useUpdateScheduleMutation } from 'src/services/ScheduleApi';
import ScheduleEditForm from '../../../components/customComponents/schedule/ScheduleEditForm';
import BreadCrumb from '../breadCrumb/BreadCrumb';

const EditSchedule = () => {
  let defaultValues: any = {};
  let scheduleDefaultValue: any = {};
  const params: any = useParams();
  const paramsId: any = params.scheduleId

  //Get Schedule By Id
  const { data: scheduleData, error, isLoading } = useScheduleQuery(paramsId)

  //Update the data 
  const [updateSchedule, result] = useUpdateScheduleMutation();

  //Check the status
  const response: any = result
  useEffect(() => {
    if (response.isSuccess) {
      toast.success(response.data.status)
    }
    if (response.isError) {
      toast.error(response.error.data.error)
    }
  }, [response]);

  //Loading State
  if (isLoading) return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Grid>
  )

  // Return an error if there is an error
  if (error) return (
    <Typography variant='h3'>Something Went Wrong</Typography>
  )

  defaultValues = scheduleData

  scheduleDefaultValue = {
    id: defaultValues.responseBody.id,
    startTime: moment.utc(defaultValues.responseBody.startTime).format('hh:mm:ss'),
    endTime: moment.utc(defaultValues.responseBody.endTime).format('hh:mm:ss'),
    priceClassificationId: defaultValues.responseBody.priceClassification.id
  }

  const startDate: any = moment(defaultValues.responseBody.startTime).format('YYYY-MM-DD')
  const endDate: any = moment(defaultValues.responseBody.endTime).format('YYYY-MM-DD')

  const onSubmit = (data: any) => {
    console.log(data)
    const newData: any = {
      id: data.id,
      startTime: startDate.concat(" ", data.startTime),
      endTime: endDate.concat(" ", data.endTime),
      priceClassificationId: data.priceClassificationId,
      programId: defaultValues.responseBody.program.id
    }
    console.log(newData)
    updateSchedule(newData)
  }

  console.log(startDate)

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Schedule'}
        child={'Edit'}
        parentLink={'/dashboard/schedule/timeline'}
      />
      <ScheduleEditForm defaultValues={scheduleDefaultValue} onFormSubmit={onSubmit} formTitle={"Edit Schedule"} startDate={startDate} endDate={endDate} />
    </div>
  )
}

export default EditSchedule