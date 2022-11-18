import React from 'react';
import {
  Grid,
  Card,
  Typography,
  Button,
  Switch,
  Collapse,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDeleteStationMutation } from 'src/services/StationApi';
import DeleteItem from '../shared/DeleteItem';

const StationListComponent = ({ id, name, programs }: any) => {
  //Check the switch button
  const [isChecked, setIsChecked] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChecked = () => {
    setIsChecked((prev) => !prev);
  };

  // Delete a station
  const [deleteStation] = useDeleteStationMutation();

  return (
    <>
      <Grid item lg={4} md={4} sm={6} xs={12}>
        <Card sx={{ m: 1, p: 2 }}>
          <Typography variant="h4">
            {' '}
            <Switch onClick={handleChecked} /> {name}
          </Typography>
          <Grid container sx={{ mt: 5 }} direction="row" spacing={2}>
            <Grid item lg={4} md={4} sm={4} xs={4}>
              <Link to={`/dashboard/station/detail/${id}`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="info">
                  Show
                </Button>
              </Link>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={4}>
              <Link to={`/dashboard/station/edit/${id}`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="success" style={{ color: 'white' }}>
                  Edit
                </Button>
              </Link>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={4}>
              <Button
                variant="contained"
                color="error"
                disabled={open}
                onClick={handleOpen}
                // onClick={() => deleteStation(id)}
              >
                Delete
              </Button>
            </Grid>
            <Collapse in={isChecked} sx={{ m: 2 }}>
              {/* <Typography variant="h3">Programs</Typography> */}
              <Divider />
              {/* {programs.map((program: any) => (
                <div key={program.id}>
                  <Typography variant="h4" sx={{ m: 1 }}>
                    {program.name}
                  </Typography>
                </div>
              ))} */}
            </Collapse>
            <DeleteItem
              {...{ deleteItem: deleteStation, setOpen, handleClose, open, itemId: id  }}
            />
          </Grid>
        </Card>
      </Grid>
    </>
  );
};


export default StationListComponent;
