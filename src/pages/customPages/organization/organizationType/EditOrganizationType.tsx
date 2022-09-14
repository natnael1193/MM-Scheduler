import { Grid, CircularProgress, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useOrganizationTypeQuery,
  useUpdateOrganizationTypeMutation,
} from 'src/services/OrganizationTypeApi';
import OrganizationTypeForm from '../../../../components/customComponents/organization/organizationType/OrganizationTypeForm';

const EditOrganizationType = () => {
  const params = useParams();
  const paramsId: any = params.organizationTypeId;
  var defaultValues: any = {};

  //Get Station By Id
  const {
    data: organizationTypeData,
    error,
    isLoading,
    isFetching,
  }: any = useOrganizationTypeQuery(paramsId);

  //Update the data
  const [updateOrganizationType, result] = useUpdateOrganizationTypeMutation();

  //Check the data status
  const response: any = result;
  useEffect(() => {
    if (response.isSuccess) {
      console.log(response);
      toast.success(response.data.status);
    }
  }, [response]);

  // Loading state to get the data
  if (isLoading || isFetching)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  // Return an error if there is an error
  if (error) return <Typography variant="h3">Something Went Wrong</Typography>;

  //Assign the data to a variable
  defaultValues = organizationTypeData.data;

  //Submit the new data
  const onSubmit = (data: any) => {
    const newData: any = {
      id: paramsId,
      name: data.name,
      key: data.key,
    };
    console.log(newData);
    updateOrganizationType(newData);
  };

console.log(defaultValues)
  return (
    <Container>
      <OrganizationTypeForm
        formTitle={'Edit Organization Type'}
        defaultValues={defaultValues}
        onFormSubmit={onSubmit}
      />
    </Container>
  );
};

export default EditOrganizationType;
