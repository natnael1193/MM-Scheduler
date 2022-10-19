import { Button, Grid, Typography } from '@mui/material';
import React from 'react';

const ProgramsByDates = () => {
  const [activeDate, setActiveDate] = React.useState('');
  const DatesList: any = [
    {
      id: 1,
      label: 'Monday',
    },
    {
      id: 2,
      label: 'Tuesday',
    },
    {
      id: 3,
      label: 'Wendsday',
    },
    {
      id: 4,
      label: 'Thursday',
    },
    {
      id: 5,
      label: 'Friday',
    },
    {
      id: 6,
      label: 'Saturday',
    },
    {
      id: 7,
      label: 'Sunday',
    },
  ];

  console.log(activeDate);

  return (
    <Grid container spacing={4}>
      {DatesList.map((dates: any) =>  (
          <Grid item key={dates.id}>
            <Button
              variant="contained"
              color={dates.id === activeDate ? 'warning' : 'primary'}
              onClick={() => {
                setActiveDate(dates.id);
              }}
            >
              <Typography variant="inherit" color="white">
                {dates.label}
              </Typography>
            </Button>
          </Grid>
        )
      )}
    </Grid>
  );
};

export default ProgramsByDates;
