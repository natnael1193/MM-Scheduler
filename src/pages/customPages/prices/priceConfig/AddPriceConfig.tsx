import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PriceConfigForm from 'src/components/customComponents/prices/priceConfig/PriceConfigForm';
import { useAddPriceConfigMutation } from 'src/services/PriceConfigApi';
import BreadCrumb from '../../breadCrumb/BreadCrumb';

const AddPriceConfig = () => {
  const navigate = useNavigate();

  //Initial State
  const initialState: any = {
    key: '',
    name: '',
    startDate: '',
    endDate: '',
    rate: '',
    unit: '',
  };

  //Add New Data
  const [addPriceConfig, result] = useAddPriceConfigMutation();

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
    const newData: any = {
      name: data.name,
      key: data.key,
      rate: Number(data.rate),
      unit: Number(data.unit),
      startDate: data.startDate + ':00.203Z',
      endDate:  data.endDate + ':00.203Z',
      // startDate: data.startDate ? data.startDate.replace(/T/g, ' ') : data.startDate,
      // endDate: data.endDate ? data.endDate.replace(/T/g, ' ') : data.endDate,
    };
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

      <PriceConfigForm
        defaultValues={initialState}
        onFormSubmit={onSubmit}
        formTitle={'Add Price Config'}
      />
    </div>
  );
};

export default AddPriceConfig;
