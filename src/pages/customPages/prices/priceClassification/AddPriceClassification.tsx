import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddPriceClassificationMutation } from 'src/services/PriceClassificationApi';
import PriceClassificationForm from '../../../../components/customComponents/prices/priceClassification/PriceClassificationForm';

const AddPriceClassification = () => {

  const navigate = useNavigate();

  //Initial State
  const initialState: any = {
    priceClassificationName: "",
    priceCategoryId: "",
    priceConfigName: "",
    startDate: "",
    endDate: "",
    rate: "",
    unit: ""
  }

  //Add New Data
  const [addPriceClassification, result] = useAddPriceClassificationMutation();

    //Check the status
    const response: any = result
    useEffect(() => {
      if (response.isSuccess) {
        toast.success(response.data.status)
      }
      if (response.isError) {
        toast.error(response.error.data.error)
      }
    }, [response, navigate]);

   //Submit Data
   const onSubmit = (data: any) => {
    const newData: any = {
      priceClassificationName: data.priceClassificationName,
      priceCategoryId: data.priceCategoryId,
      priceConfigName: data.priceConfigName,
      rate: data.rate,
      unit: data.unit,
      startDate: data.startDate ? data.startDate.replace(/T/g, ' ') : data.startDate,
      endDate: data.endDate ? data.endDate.replace(/T/g, ' ') : data.endDate,
    };
    console.log(newData);
    addPriceClassification(newData);
  }

  return (
    <div><PriceClassificationForm defaultValues={initialState} onFormSubmit={onSubmit} formTitle={"Add Price Classification"}/></div>
  )
}

export default AddPriceClassification