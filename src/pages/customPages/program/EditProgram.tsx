import { Grid, CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProgramForm from 'src/components/customComponents/program/ProgramForm';
import { useProgramQuery, useUpdateProgramMutation } from 'src/services/ProgramApi';

const EditProgram = () => {

  const params = useParams();
  const paramsId: any = params.programId
  var defaultValues: any = {}

  //Get Program By Id
  const { data: programData, error, isLoading } = useProgramQuery(paramsId)

  //Update the data
  const [updateProgram, result] = useUpdateProgramMutation();

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

  //Assign the data to a variable
  defaultValues = programData;

  // const newDefaultValue: any = {
  // defaultValues = programData;
  // id: defaultValues.id,
  // stationId:
  // }

  const onSubmit = (data: any) => {
    console.log(data)
    const newData: any = {
      id: data.id,
      code: data.code,
      description: data.description,
      isActive: data.isActive === true ? 1 : data.isActive === false ? 0 : '',
      name: data.name,
      programType: data.programType,
      stationId: data.stationId
    }
    console.log(newData)
    updateProgram(newData)
  }

  return (
    <div><ProgramForm defaultValues={defaultValues.responseBody} onFormSubmit={onSubmit} formTitle={"Add Program"} /></div>
  )
}

export default EditProgram