import { Container, Card, TextField, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form'



const StationForm = ({ formTitle, defaultValues, onFormSubmit }: any) =>{
    const { register, handleSubmit } = useForm({
      defaultValues,
    });

  return(
  <div>
    <Container>
      <Card sx={{ p: 3 }}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Typography variant="h4" sx={{ mb: 5 }}>{formTitle}</Typography>
        <TextField {...register('name')} id="outlined-basic" label="Name" variant="outlined" fullWidth sx={{ mb: 3 }} />
        <TextField {...register('description')} id="outlined-basic" label="Description" variant="outlined" fullWidth multiline={true} rows={5} sx={{ mb: 3 }} />
        <Button variant="contained" type="submit">Submit</Button>
        </form>
      </Card>
    </Container>
  </div>
);}

export default StationForm;
