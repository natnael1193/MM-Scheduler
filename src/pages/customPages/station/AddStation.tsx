import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import StationForm from '../../../components/customComponents/station/StationForm';
import { useAddStationMutation } from '../../../services/StationApi';
import BreadCrumb from '../breadCrumb/BreadCrumb';

const AddStation = () => {
  //Initial State
  const initialState: any = {
    id: null,
    name: '',
    description: '',
  };
  const navigate = useNavigate();

  //Add New Data
  const [addStation, result] = useAddStationMutation();

  //Check the status
  const response: any = result;
  useEffect(() => {
    if (response.isSuccess) {
      toast.success(response.data.body);
      navigate('/dashboard/station/list');
    }
    if (response.isError) {
      toast.error(response.error.data.error);
    }
  }, [response, navigate]);

  // Submit The Data
  const onSubmit = (data: any) => {
    addStation(data);
  };

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Station'}
        child={'Add'}
        parentLink={'/dashboard/station/list'}
      />
      <StationForm
        formTitle={'Add New Station'}
        defaultValues={initialState}
        onFormSubmit={onSubmit}
      />
    </div>
  );
};

export default AddStation;
