import { Button, Card, Container, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'

const PriceCategoryForm = ({ formTitle, defaultValues, onFormSubmit }: any) => {

    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues
    })

console.log(defaultValues)

    return (
        <div>
            <Container>
                <Card>
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <Typography variant='h4' sx={{ m:3 }}>{formTitle}</Typography>
                        <Grid container sx={{ m: 1 }} spacing={2}>
                            <Grid item lg={10} md={10} sm={12} xs={12}>
                                <TextField {...register('name', { required: true })} label="Price Category Name" fullWidth />
                                <Typography variant='inherit' color="error">{errors.name && "This is required"}</Typography>
                            </Grid>
                            <Grid item lg={8} md={10} sm={12} xs={12} sx={{ mb: 3 }}>
                                <Button variant='contained' type="submit">Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Container>
        </div>
    )
}

export default PriceCategoryForm