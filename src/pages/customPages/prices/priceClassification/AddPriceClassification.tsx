import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddPriceClassificationMutation } from 'src/services/PriceClassificationApi';
import PriceClassificationForm from '../../../../components/customComponents/prices/priceClassification/PriceClassificationForm';
import BreadCrumb from '../../breadCrumb/BreadCrumb';

const AddPriceClassification = () => {

  const navigate = useNavigate();

  //Initial State
  const initialState: any = {
    name: "",
    key: "",
    priceCategoryId: "",
    priceConfigId: "",
  }

  //Add New Data
  const [addPriceClassification, result] = useAddPriceClassificationMutation();

  //Check the status
  const response: any = result
  useEffect(() => {
    if (response.isSuccess) {
      toast.success(response.data)
      navigate('/dashboard/price-classification/list')
    }
    if (response.isError) {
      toast.error(response.error)
    }
  }, [response, navigate]);

  //Submit Data
  const onSubmit = (data: any) => {
    // const newData: any = {
    //   priceClassificationName: data.priceClassificationName,
    //   priceCategoryId: data.priceCategoryId,
    //   priceConfigName: data.priceConfigName,
    //   rate: Number(data.rate),
    //   unit: Number(data.unit),
    //   startDate: data.startDate ? data.startDate.replace(/T/g, ' ') : data.startDate,
    //   endDate: data.endDate ? data.endDate.replace(/T/g, ' ') : data.endDate,
    // };
    console.log(data);
    addPriceClassification(data);
  }

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Price Classification'}
        child={'Add'}
        parentLink={'/dashboard/price-classification/list'}
      />
      <PriceClassificationForm defaultValues={initialState} onFormSubmit={onSubmit} formTitle={"Add Price Classification"} /></div>
  )
}

export default AddPriceClassification