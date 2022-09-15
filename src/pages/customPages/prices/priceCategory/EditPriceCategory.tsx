import { Grid, CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { usePriceCategoryQuery, useUpdatePriceCategoryMutation } from 'src/services/PriceCategoryApi';
import PriceCategoryForm from 'src/components/customComponents/prices/priceCategory/PriceCategoryForm';
import BreadCrumb from '../../breadCrumb/BreadCrumb';

const EditPriceCategory = () => {

  const params = useParams();
  const paramsId: any = params.priceCategoryId
  var defaultValues: any = {};

  //Get Price Category by id
  const { data: priceCategoryData, error, isLoading } = usePriceCategoryQuery(paramsId)

  // Update the data 
  const [updatePriceCategory, result] = useUpdatePriceCategoryMutation();

  //Check the status
  const response: any = result
  useEffect(() => {
    if (response.isSuccess) {
      toast.success(response.data.status)
    }
    if (response.isError) {
      toast.error(response.error.data.error)
    }
  }, [response]);


  //Loading State
  if (isLoading) return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Grid>
  )

  // Return an error if there is an error
  if (error) return (
    <Typography variant='h3'>Something Went Wrong</Typography>
  )

  //Assign the data to a variable
  defaultValues = priceCategoryData;


  //Submit the new data
  const onSubmit = (data: any) => {
    updatePriceCategory(data)
  }

  return (
    <div>
      <BreadCrumb
        main={'Dashboard'}
        parent={'Price Category'}
        child={'Edit'}
        parentLink={'/dashboard/price-category/list'}
      />
      <PriceCategoryForm defaultValues={defaultValues.data} onFormSubmit={onSubmit} formTitle={"Edit Price Category"} /></div>
  )
}

export default EditPriceCategory