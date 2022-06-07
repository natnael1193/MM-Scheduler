import React from 'react';
import { useNavigate } from 'react-router-dom'
import StationForm from '../../../components/customComponents/station/StationForm'
import { useAddStationMutation } from '../../../services/StationApi'

const AddStation = () => {

  //Initial State
  const initialState: any = {
    id: null, name: '', description: ''
  }
  const navigate = useNavigate();

  //Add New Data
  const [addStation] = useAddStationMutation();

  // Submit The Data
  const onSubmit = (data: any) => {
    console.log(data)
    addStation(data);
    navigate('/dashboard/station/list');
  }

  return (
    <div><StationForm formTitle={"Add New Station"} defaultValues={initialState} onFormSubmit={onSubmit} /></div>
  );
}




export default AddStation;
