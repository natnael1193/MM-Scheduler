import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OrganizationForm from 'src/components/customComponents/organization/OrganizationForm';
import { useAddOrganizationMutation } from 'src/services/OrganizationApi';
import BreadCrumb from '../breadCrumb/BreadCrumb';

const AddOrganization = () => {
  //Initial State
  const defaultValues = {
    id: null,
    name: '',
    organizationTypeId: '',
    description: '',
  };

  const navigate = useNavigate();

  //Add New Data
  const [AddOrganization, result] = useAddOrganizationMutation();

  //Check the status
  const response: any = result;
  useEffect(() => {
    if (response.isSuccess) {
      toast.success(response.data.body);
      navigate('/dashboard/organization/list');
    }
    if (response.isError) {
      console.log(response.error.data.Message);
      toast.error(response.error.data.Message);
    }
  }, [response, navigate]);

  // Submit The Data
  const onSubmit = (data: any) => {
    AddOrganization(data);
  };

  return (
    <div>
      {' '}
      <BreadCrumb
        main={'Dashboard'}
        parent={'Organization'}
        child={'Edit'}
        parentLink={'/dashboard/organization/list'}
      />{' '}
      <OrganizationForm
        formTitle={'Add Organization'}
        defaultValues={defaultValues}
        onFormSubmit={onSubmit}
      />
    </div>
  );
};

export default AddOrganization;
