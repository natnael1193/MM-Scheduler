// import ScheduleForm from '../../../components/customComponents/schedule/ScheduleForm';
import BreadCrumb from '../breadCrumb/BreadCrumb';
import { lazy, Suspense } from 'react';
import LoadingScreen from 'src/components/LoadingScreen';

const ScheduleForm = lazy(
  () => import('../../../components/customComponents/schedule/ScheduleForm')
);

const AddSchedule = () => (
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

export default AddSchedule;
