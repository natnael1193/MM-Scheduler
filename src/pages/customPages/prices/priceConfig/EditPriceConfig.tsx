import { Grid, CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BreadCrumb from '../../breadCrumb/BreadCrumb';
import { usePriceConfigQuery, useUpdatePriceConfigMutation } from 'src/services/PriceConfigApi';
import PriceConfigForm from 'src/components/customComponents/prices/priceConfig/PriceConfigForm';


const EditPriceConfig = () => {
  const params = useParams();
  const paramsId: any = params.priceConfigId;
  var defaultValues: any = {};

  

  //Get Price Category by id
  const { data: priceConfigData, error, isLoading }: any = usePriceConfigQuery(paramsId);

  // Update the data
  const [updatePriceConfig, result] = useUpdatePriceConfigMutation();

  //Check the status
  const response: any = result;
  useEffect(() => {
    if (response.isSuccess) {
      toast.success("Price config updated successfully");
    }
    if (response.isError) {
      toast.error("Error updating price config: " + response.error.data.error);
    }
  }, [response]);

  //Loading State
  if (isLoading)
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  // Return an error if there is an error
  if (error) return <Typography variant="h3">Something Went Wrong</Typography>;

  //Assign the data to a variable
  defaultValues = {
    id: priceConfigData.data.id,
    key: priceConfigData.data.key,
    name: priceConfigData.data.name,
    rate: priceConfigData.data.rate,
    unit: priceConfigData.data.unit,
    startDate: priceConfigData.data.startDate.replace(/.203Z/g, ''),
    endDate: priceConfigData.data.endDate.replace(/.203Z/g, ''),
  };

  //Submit the new data
  const onSubmit = (data: any) => {
    const newData: any = {
      id: data.id,
      name: data.name,
      key: data.key,
      rate: Number(data.rate),
      unit: Number(data.unit),
      startDate: data.startDate + '.203Z',
      endDate:  data.endDate + '.203Z',
      // startDate: data.startDate ? data.startDate.replace(/T/g, ' ') : data.startDate,
      // endDate: data.endDate ? data.endDate.replace(/T/g, ' ') : data.endDate,
    };
    console.log(newData);
    updatePriceConfig(newData);
  };



  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Price Classification'}
        child={'Edit'}
        parentLink={'/dashboard/price-config/list'}
      />

      <PriceConfigForm
        defaultValues={defaultValues}
        onFormSubmit={onSubmit}
        formTitle={'Edit Price Config'}
      />
    </div>
  );
};

export default EditPriceConfig;
