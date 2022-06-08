import React, { useEffect } from 'react'
import PriceCategoryForm from 'src/components/customComponents/prices/priceCategory/PriceCategoryForm';
import { useAddPriceCategoryMutation } from 'src/services/PriceCategoryApi'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddPriceCategory = () => {

  const navigate = useNavigate();

  //Initial State 
  const initialState: any = {
     name: ''
  }

  //Add New Data
  const [addPriceCategory, result ] = useAddPriceCategoryMutation();

      //Check the status
      const response: any = result
      useEffect(() => {
        if (response.isSuccess) {
          toast.success(response.data.status)
          navigate('/dashboard/price-category/list');
        }
        if (response.isError) {
          toast.error(response.error.data.error)
        }
      }, [response, navigate]);

  //Submit Data
  const onSubmit = (data: any) => {
    addPriceCategory(data)
  }
  return (
    <div>
      <PriceCategoryForm formTitle={"Add New Price Category"} defaultValues={initialState} onFormSubmit={onSubmit} />
    </div>
  )
}

export default AddPriceCategory