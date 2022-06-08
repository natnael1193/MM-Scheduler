import { Container, Card, TextField, Typography, Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form'



const StationForm = ({ formTitle, defaultValues, onFormSubmit }: any) =>{
    const { register, formState: { errors }, handleSubmit } = useForm({
      defaultValues,
    });

  return(
  <div>
    <Container>
      <Card sx={{ p: 3 }}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Typography variant="h4" sx={{ mb: 5 }}>{formTitle}</Typography>
        <Grid container>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mb: 3 }}>
          <TextField {...register('name', { required: true })} id="outlined-basic" label="Name" variant="outlined" fullWidth  />
        <Typography variant='inherit' color="error">{errors.name && "This is required"}</Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mb: 3 }}>
          <TextField {...register('description')} id="outlined-basic" label="Description" variant="outlined" fullWidth multiline={true} rows={5}  />
            </Grid>
        </Grid>
        <Button variant="contained" type="submit">Submit</Button>
        </form>
      </Card>
    </Container>
  </div>
);}

export default StationForm;
