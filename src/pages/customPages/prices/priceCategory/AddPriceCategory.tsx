import React from 'react'
import PriceCategoryForm from 'src/components/customComponents/prices/priceCategory/PriceCategoryForm';
import { useAddPriceCategoryMutation } from 'src/services/PriceCategoryApi'
import { useNavigate } from 'react-router-dom';

const AddPriceCategory = () => {

  const navigate = useNavigate();

  //Initial State 
  const initialState: any = {
     name: ''
  }

  //Add New Data
  const [addPriceCategory] = useAddPriceCategoryMutation();

  //Submit Data
  const onSubmit = (data: any) => {
    addPriceCategory(data)
    navigate('/dashboard/price-category/list');
  }
  return (
    <div>
      <PriceCategoryForm formTitle={"Add New Price Category"} defaultValues={initialState} onFormSubmit={onSubmit} />
    </div>
  )
}

export default AddPriceCategory