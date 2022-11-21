import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MultiplePriceConfigForm from 'src/components/customComponents/prices/priceConfig/MultiplePriceConfigForm';
import { useAddMultiplePriceConfigMutation } from 'src/services/PriceConfigApi';
import BreadCrumb from '../../breadCrumb/BreadCrumb';

const AddMultiplePriceConfig = () => {
  const navigate = useNavigate();

  //Initial State
  const initialState: any = {
    key: '',
    name: '',
    startDate: '',
    endDate: '',
    rate: '',
    unit: '',
    priceCategoryId: '',
    programId: '',
    stationId: '',
  };

  //Add New Data
  const [addPriceConfig, result] = useAddMultiplePriceConfigMutation();

  //Check the status
  const response: any = result;
  useEffect(() => {
    if (response.isSuccess) {
      toast.success(response.data.status);
      navigate('/dashboard/price-config/list');
    }
    if (response.isError) {
      toast.error(response.error.data.error);
    }
  }, [response, navigate]);

  //Submit Data
  const onSubmit = (data: any) => {
    console.log(data);
    const newData: any = {
      name: data.name,
      key: data.key,
      rate: data.rate,
      unit: data.unit,
      startDate: data.startDate + 'Z',
      endDate: data.endDate + 'Z',
      priceCategoryId: data.priceCategoryId,
      priceConfigs: data.priceConfigs,
      // startDate: data.startDate ? data.startDate.replace(/T/g, ' ') : data.startDate,
      // endDate: data.endDate ? data.endDate.replace(/T/g, ' ') : data.endDate,
    };
    console.log(newData);
    addPriceConfig(newData);
  };
  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Price Config'}
        child={'Add'}
        parentLink={'/dashboard/price-config/list'}
      />

      <MultiplePriceConfigForm
        defaultValues={initialState}
        onFormSubmit={onSubmit}
        formTitle={'Add Multiple Price Config'}
      />
    </div>
  );
};

export default AddMultiplePriceConfig;
