// import React from 'react';
// import { Button, Grid, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
// import { useForm } from 'react-hook-form';

// const DaysList = ({ scheduleData }: any) => {
//     const [state, setState] = React.useState({
//         monday: false,
//         tuesday: false,
//         wendsday: false,
//         thursday: false,
//         friday: false,
//         saturday: false,
//         sunday: false,
//     });

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setState({
//             ...state,
//             [event.target.name]: event.target.checked,
//         });
//     };

//     const days: any = ['monday', 'tuesday', 'wendsday', 'thursday', 'friday', 'saturday', 'sunday'];

//     const {
//         register,
//         setValue,
//         handleSubmit,
//         control,
//         watch,
//         reset,
//         formState: { errors },
//     } = useForm();

//     console.log(state);

//     const onSubmit = (data: any) => {
//         console.log(data);

//         let newSchedules: any = [];
//         const scheduleList: any = data.schedules ? data.schedules : [];
//         newSchedules = scheduleList.filter((element: any) => element.startTime !== undefined);
//         // const result = words.filter(word => word.length > 6);
//         console.log(scheduleList);
//         console.log(newSchedules);

//         const newData: any = {
//             id: data.id,
//             schedules: newSchedules,
//             programId: scheduleData.programId,
//             startDate: scheduleData.startDate,
//             endDate: scheduleData.endDate,
//         };
//         console.log(newData);
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 {days.map((day: any, index: any) => {
//                     return (
//                         <Grid key={index} container spacing={2} sx={{ mt: 3 }}>
//                             <Grid item lg={3} md={3} sm={12} xs={12}>
//                                 <Grid container>
//                                     <Grid item lg={4} md={4} sm={4} xs={4}>
//                                         <Switch
//                                             checked={
//                                                 index === 0
//                                                     ? state.monday
//                                                     : index === 1
//                                                         ? state.tuesday
//                                                         : index === 2
//                                                             ? state.wendsday
//                                                             : index === 3
//                                                                 ? state.thursday
//                                                                 : index === 4
//                                                                     ? state.friday
//                                                                     : index === 5
//                                                                         ? state.saturday
//                                                                         : state.sunday
//                                             }
//                                             onChange={handleChange}
//                                             name={
//                                                 index === 0
//                                                     ? 'monday'
//                                                     : index === 1
//                                                         ? 'tuesday'
//                                                         : index === 2
//                                                             ? 'wendsday'
//                                                             : index === 3
//                                                                 ? 'thursday'
//                                                                 : index === 4
//                                                                     ? 'friday'
//                                                                     : index === 5
//                                                                         ? 'saturday'
//                                                                         : 'sunday'
//                                             }
//                                         />
//                                     </Grid>
//                                     <Grid item lg={8} md={8} sm={8} xs={8}>
//                                         <Typography>{day}</Typography>
//                                     </Grid>
//                                 </Grid>
//                             </Grid>
//                             <Grid item lg={3} md={3} sm={12} xs={12}>
//                                 <TextField
//                                 required
//                                     {...register(`schedules.${index}.startTime` as const)}
//                                     type={'time'}
//                                     label="Start Time"
//                                     InputLabelProps={{ shrink: true }}
//                                     fullWidth
//                                     disabled={
//                                         index === 0
//                                             ? state.monday
//                                                 ? false
//                                                 : true
//                                             : index === 1
//                                                 ? state.tuesday
//                                                     ? false
//                                                     : true
//                                                 : index === 2
//                                                     ? state.wendsday
//                                                         ? false
//                                                         : true
//                                                     : index === 3
//                                                         ? state.thursday
//                                                             ? false
//                                                             : true
//                                                         : index === 4
//                                                             ? state.friday
//                                                                 ? false
//                                                                 : true
//                                                             : index === 5
//                                                                 ? state.saturday
//                                                                     ? false
//                                                                     : true
//                                                                 : state.sunday
//                                                                     ? false
//                                                                     : true
//                                     }
//                                 />
//                             </Grid>
//                             <Grid item lg={3} md={3} sm={12} xs={12}>
//                                 <TextField
//                                 required
//                                     // {...(state.monday || state.tuesday  || state.wendsday || state.thursday || state.friday || state.saturday || state.sunday  ) === true ? (register(`schedules.${index}.endTime` as const)) : (setValue(`schedules.${index}.endTime`, ''))}
//                                     { ...register(`schedules.${index}.endTime` as const)}
//                                     type={'time'}
//                                     label="End Time"
//                                     InputLabelProps={{ shrink: true }}
//                                     fullWidth
//                                     disabled={
//                                         index === 0
//                                             ? state.monday
//                                                 ? false
//                                                 : true
//                                             : index === 1
//                                                 ? state.tuesday
//                                                     ? false
//                                                     : true
//                                                 : index === 2
//                                                     ? state.wendsday
//                                                         ? false
//                                                         : true
//                                                     : index === 3
//                                                         ? state.thursday
//                                                             ? false
//                                                             : true
//                                                         : index === 4
//                                                             ? state.friday
//                                                                 ? false
//                                                                 : true
//                                                             : index === 5
//                                                                 ? state.saturday
//                                                                     ? false
//                                                                     : true
//                                                                 : state.sunday
//                                                                     ? false
//                                                                     : true
//                                     }
//                                 />
//                             </Grid>
//                             <Grid item lg={3} md={3} sm={12} xs={12}>
//                                 <Select
//                                     defaultValue=""
//                                     // required
//                                     //   disabled={""}
//                                     fullWidth
//                                     {...register(`schedules.${index}.priceClassificationId` as const)}
//                                     disabled={
//                                         index === 0
//                                             ? state.monday
//                                                 ? false
//                                                 : true
//                                             : index === 1
//                                                 ? state.tuesday
//                                                     ? false
//                                                     : true
//                                                 : index === 2
//                                                     ? state.wendsday
//                                                         ? false
//                                                         : true
//                                                     : index === 3
//                                                         ? state.thursday
//                                                             ? false
//                                                             : true
//                                                         : index === 4
//                                                             ? state.friday
//                                                                 ? false
//                                                                 : true
//                                                             : index === 5
//                                                                 ? state.saturday
//                                                                     ? false
//                                                                     : true
//                                                                 : state.sunday
//                                                                     ? false
//                                                                     : true
//                                     }
//                                 >
//                                     <MenuItem value={10}>List</MenuItem>
//                                     <MenuItem value={20}>List</MenuItem>
//                                     <MenuItem value={30}>List</MenuItem>
//                                 </Select>
//                             </Grid>
//                         </Grid>
//                     );
//                 })}
//                 <Button variant="contained" type="submit">
//                     Submit
//                 </Button>
//             </form>
//         </div>
//     );
// };

// export default DaysList;


import React from 'react'

const DaysList = () => {
    return (
        <div>DaysList</div>
    )
}

export default DaysList