import { Grid, CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrganizationForm from 'src/components/customComponents/organization/OrganizationForm';
import { toast } from 'react-toastify';
import BreadCrumb from '../breadCrumb/BreadCrumb';
import { useOrganizationQuery, useUpdateOrganizationMutation } from 'src/services/OrganizationApi';


const EditOrganization = () => {
  const params = useParams();
  const paramsId: any = params.organizationId;
  var defaultValues: any = {};

  //Get Station By Id
  const { data: organizationData, error, isLoading, isFetching }: any = useOrganizationQuery(paramsId);

  //Update the data
  const [updateOrganization, result] = useUpdateOrganizationMutation();

  //Check the data status
  const response: any = result;
  useEffect(() => {
    if (response.isSuccess) {
      console.log(response);
      toast.success("Organization updated successfully");
      // toast.success("Organization updated successfully"+response.data.message);
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
  defaultValues = organizationData.data;

  //Submit the new data
  const onSubmit = (data: any) => {
    updateOrganization(data);
  };

  console.log(organizationData);



  return (
    <div>
            {' '}
      <BreadCrumb
        main={'Dashboard'}
        parent={'Organization'}
        child={'Edit'}
        parentLink={'/dashboard/organization/list'}
      />{' '}
      <OrganizationForm formTitle={"Edit Organization"} defaultValues={defaultValues}  onFormSubmit={onSubmit}/>
    </div>
  );
}

export default EditOrganization