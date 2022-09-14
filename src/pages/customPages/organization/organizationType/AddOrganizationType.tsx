import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddOrganizationTypeMutation } from 'src/services/OrganizationTypeApi';
import OrganizationTypeForm from '../../../../components/customComponents/organization/organizationType/OrganizationTypeForm';
import BreadCrumb from '../../breadCrumb/BreadCrumb';

const AddOrganizationType = () => {
  const defaultValues: any = {
    name: '',
    key: '',
  };

  const navigate = useNavigate();

  //Add New Data
  const [addOrganizationType, result] = useAddOrganizationTypeMutation();

  //Check the status
  const response: any = result;

  // Navigate to Organization Types
  useEffect(() => {
    if (response.isSuccess) {
      toast.success(response.data.body);
      navigate('/dashboard/organization-type/list');
    }
    if (response.isError) {
      toast.error(response.error.data.error);
    }
  }, [response, navigate]);

  // Submit The Data
  const onSubmit = (data: any) => {
    addOrganizationType(data);
  };

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Organization Type'}
        child={'Add'}
        parentLink={'/dashboard/organization-type/list'}
      />
      <OrganizationTypeForm
        formTitle={'Add Organization Type'}
        defaultValues={defaultValues}
        onFormSubmit={onSubmit}
      />
    </div>
  );
};

export default AddOrganizationType;
