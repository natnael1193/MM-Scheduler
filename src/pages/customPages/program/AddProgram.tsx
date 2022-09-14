import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddProgramMutation } from 'src/services/ProgramApi';
import ProgramForm from '../../../components/customComponents/program/ProgramForm';
import BreadCrumb from '../breadCrumb/BreadCrumb';

const AddProgram = () => {

  const navigate = useNavigate();

  //Initial State
  const initalState: any = {
    "description": "",
    "code": "",
    "isActive": "",
    "stationId": "",
    "programType": "",
    "name": ""
  }

  //Add New Data
  const [addProgram, result] = useAddProgramMutation();

  //Check the status
  const response: any = result
  useEffect(() => {
    if (response.isSuccess) {
      toast.success(response.data.status)
      navigate('/dashboard/program/list')
    }
    if (response.isError) {
      toast.error(response.error.data.error)
    }
  }, [response, navigate]);

  const onSubmit = (data: any) => {
    console.log(data)
    addProgram(data)
  }

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Program'}
        child={'Add'}
        parentLink={'/dashboard/program/list'}
      />
      <ProgramForm defaultValues={initalState} onFormSubmit={onSubmit} formTitle={"Add Program"} /></div>
  )
}

export default AddProgram