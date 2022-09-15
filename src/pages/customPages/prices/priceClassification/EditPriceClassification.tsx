import { CircularProgress, Grid, Typography } from '@mui/material';
// import moment from 'moment';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  usePriceClassificationQuery,
  useUpdatePriceClassificationMutation,
} from 'src/services/PriceClassificationApi';
import PriceClassificationForm from '../../../../components/customComponents/prices/priceClassification/PriceClassificationForm';
import BreadCrumb from '../../breadCrumb/BreadCrumb';

const EditPriceClassification = () => {
  const params = useParams();
  const paramsId: any = params.priceClassificationId;
  var defaultValues: any = {};

  //Get Price Classification By Id
  const { data: priceClassificationData, error, isLoading } = usePriceClassificationQuery(paramsId);

  //Update the data
  const [updatePriceClassification, result] = useUpdatePriceClassificationMutation();

  //Check the status
  const response: any = result;
  useEffect(() => {
    if (response.isSuccess) {
      toast.success(response.data.status);
    }
    if (response.isError) {
      toast.error(response.error.data.error);
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
  defaultValues = priceClassificationData;

  //Re-assign the default value
  // const newDefaultValue: any = {
  //   id: defaultValues.responseBody.id,
  //   priceClassificationName: defaultValues.responseBody.name,
  //   priceCategoryId: defaultValues.responseBody.priceCategory.id,
  //   priceConfigName: defaultValues.responseBody.priceConfig.name,
  //   rate: defaultValues.responseBody.priceConfig.priceProperty.rate,
  //   unit: defaultValues.responseBody.priceConfig.priceProperty.unit,
  //   startDate: moment.utc(defaultValues.responseBody.priceConfig.startDate).format().replace(/Z/g, ""),
  //   endDate: moment.utc(defaultValues.responseBody.priceConfig.endDate).format().replace(/Z/g, ""),
  // }

  console.log('result', result);

  //Submit the new data
  const onSubmit = (data: any) => {
    // const newData: any = {
    //   id: data.id,
    //   priceClassificationName: data.priceClassificationName,
    //   priceCategoryId: data.priceCategoryId,
    //   priceConfigName: data.priceConfigName,
    //   rate: data.rate,
    //   unit: data.unit,
    //   startDate: data.startDate ? data.startDate.replace(/T/g, ' ') : data.startDate,
    //   endDate: data.endDate ? data.endDate.replace(/T/g, ' ') : data.endDate,
    // };
    updatePriceClassification(data);
  };

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Price Classification'}
        child={'Edit'}
        parentLink={'/dashboard/price-classification/list'}
      />
      <PriceClassificationForm
        defaultValues={defaultValues.data}
        onFormSubmit={onSubmit}
        formTitle={'Edit Price Category'}
      />
    </div>
  );
};

export default EditPriceClassification;
