import { Card, Grid, Typography, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAddSingleScheduleMutation } from 'src/services/ScheduleApi';
import SingleScheduleForm from '../../../components/customComponents/schedule/SingleScheduleForm';

const AddSingleSchedule = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addSingleSchedule, result] = useAddSingleScheduleMutation();

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('Single Schedule Added Successfully');
      // reset();
    }
    if (result.error) {
      toast.error('Something went wrong!');
    }
  });

  const onSubmit = (data: any) => {
    console.log(data);
    addSingleSchedule(data);
  };

  console.log(result)

  return (
    <div>
      <Card sx={{ p: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography variant="h3">Add Single Schedule</Typography>
            </Grid>
            <SingleScheduleForm {...{ register, handleSubmit, errors }} />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
            <Button variant="contained" type="submit">
              {result.isLoading ? 'Loading...' : 'Submit'}
            </Button>
          </Grid>
        </form>
      </Card>
    </div>
  );
};

export default AddSingleSchedule;
