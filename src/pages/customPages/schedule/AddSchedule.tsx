// import ScheduleForm from '../../../components/customComponents/schedule/ScheduleForm';
import BreadCrumb from '../breadCrumb/BreadCrumb';
import { lazy, Suspense, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import LoadingScreen from 'src/components/LoadingScreen';
import React from 'react';
import LoadingComponent from 'src/components/customComponents/shared/LoadingComponent';

const ScheduleForm = lazy(
  () => import('./../../../components/customComponents/schedule/ScheduleForm')
);

const AddSchedule = () => {

  
  return (
    <div>
      <Suspense fallback={<LoadingScreen />}>
        <BreadCrumb
          main={'Dashboard'}
          parent={'Schedule'}
          child={'Add'}
          parentLink={'/dashboard/schedule/timeline'}
        />
        <ScheduleForm />
      </Suspense>
    </div>
  );
};

export default AddSchedule;
