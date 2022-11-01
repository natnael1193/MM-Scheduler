import React, { useEffect } from 'react';
import PriceCategoryForm from 'src/components/customComponents/prices/priceCategory/PriceCategoryForm';
import { useAddPriceCategoryMutation } from 'src/services/PriceCategoryApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BreadCrumb from '../../breadCrumb/BreadCrumb';

const AddPriceCategory = () => {
  const navigate = useNavigate();

  //Initial State
  const initialState: any = {
    name: '',
    key: '',
    priceType: '',
    stationId: '',
  };

  //Add New Data
  const [addPriceCategory, result] = useAddPriceCategoryMutation();

  //Check the status
  const response: any = result;
  useEffect(() => {
    if (response.isSuccess) {
      toast.success(response.data.status);
      navigate('/dashboard/price-category/list');
    }
    if (response.isError) {
      toast.error(response.error.data.error);
    }
  }, [response, navigate]);

  //Submit Data
  const onSubmit = (data: any) => {
    console.log(data);
    addPriceCategory(data);
  };
  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Price Category'}
        child={'Add'}
        parentLink={'/dashboard/price-category/list'}
      />
      <PriceCategoryForm
        formTitle={'Add New Price Category'}
        defaultValues={initialState}
        onFormSubmit={onSubmit}
      />
    </div>
  );
};

export default AddPriceCategory;
