import ScheduleForm from '../../../components/customComponents/schedule/ScheduleForm';
import BreadCrumb from '../breadCrumb/BreadCrumb';

const AddSchedule = () => (
  <div>
    <BreadCrumb
      main={'Dashboard'}
      parent={'Schedule'}
      child={'Add'}
      parentLink={'/dashboard/schedule/timeline'}
    />
    <ScheduleForm />
  </div>
)


export default AddSchedule