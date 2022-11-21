import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MultiplePriceCategoryForm from 'src/components/customComponents/prices/priceCategory/MultiplePriceCategoryForm';
import { useAddMultiplePriceCategoryMutation } from 'src/services/PriceCategoryApi';
import { toast } from 'react-toastify';

const AddMultiplePriceCategory = () => {
  const navigate = useNavigate();

  //Add New Data
  const [addPriceConfig, result] = useAddMultiplePriceCategoryMutation();

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
    addPriceConfig(data);
  };
  return (
    <div>
      <MultiplePriceCategoryForm
        onFormSubmit={onSubmit}
        formTitle={'Add Multiple Price Category'}
      />
    </div>
  );
};

export default AddMultiplePriceCategory;
