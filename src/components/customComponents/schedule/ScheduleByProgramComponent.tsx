import React from 'react';
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import moment from 'moment';
import { useDeleteScheduleMutation } from 'src/services/ScheduleApi';
import DeleteItem from '../shared/DeleteItem';

const ScheduleByProgramComponent = ({ scheduleData, futureSchedule }: any) => {
  const [open, setOpen] = React.useState(false);
  const [scheduleId, setSchedule] = React.useState('');
  const handleClose = () => setOpen(false);

  // Delete Schedule
  const [deleteSchedule] = useDeleteScheduleMutation();

  console.log(scheduleData);
  var newScheduleData: any = [];
  newScheduleData =
    scheduleData &&
    scheduleData.schedules.map(function (schedule: any) {
      return {
        id: schedule.id,
        day: moment.utc(schedule.startTime).format('dddd Do MMMM YYYY'),
        startTime: moment.utc(schedule.startTime).format('LT'),
        endTime: moment.utc(schedule.endTime).format('LT'),
        date: moment.utc(schedule.startTime).unix(),
        station: schedule.station,
        priceConfig: schedule?.priceConfig?.name,
        priceCategory: schedule?.priceConfig?.priceCategory?.name,
        rate: schedule?.priceConfig?.rate,
        unit: schedule?.priceConfig?.unit + ' sec',
      };
    });

  newScheduleData = newScheduleData.sort(
    (firstItem: any, secondItem: any) => firstItem.date - secondItem.date
  );

  //Filter Future Schedules
  const futureScheduleData: any = scheduleData.schedules.filter(function (date: any) {
    // console.log(moment(date.startTime).format('d-MM-YYYY'));
    return moment(date.startTime).format() > moment(new Date()).format();
  });

  var newfutureScheduleData: any = [];
  newfutureScheduleData =
    futureScheduleData &&
    futureScheduleData.map(function (schedule: any) {
      return {
        id: schedule.id,
        day: moment(schedule.startTime).format('dddd Do MMMM YYYY'),
        startTime: moment.utc(schedule.startTime).format('LT'),
        endTime: moment.utc(schedule.endTime).format('LT'),
        station: schedule.station,
        priceConfig: schedule?.priceConfig?.name,
        priceCategory: schedule?.priceConfig?.priceCategory?.name,
        rate: schedule?.priceConfig?.rate,
        unit: schedule?.priceConfig?.unit+ ' sec',
      };
    });

  //Data Grid Header
  const columns: GridColumns = [
    {
      field: 'day',
      headerName: 'Day',
      width: 300,
    },
    {
      field: 'startTime',
      headerName: 'Start Time',
      width: 200,
    },
    {
      field: 'endTime',
      headerName: 'End Time',
      width: 200,
    },
    {
      field: 'priceCategory',
      headerName: 'Price Category',
      width: 300,
    },
    {
      field: 'priceConfig',
      headerName: 'Price Config',
      width: 300,
    },
    {
      field: 'rate',
      headerName: 'Rate',
      width: 300,
    },
    {
      field: 'unit',
      headerName: 'Unit',
      width: 300,
    },
    {
      field: '',
      // headerName: '',
      type: 'number',
      width: 250,
      renderCell: (cellValues: any) => (
        <>
          <Link to={`/dashboard/schedule/edit/${cellValues.id}`} style={{ textDecoration: 'none' }}>
            <Button sx={{ mr: 2 }} color="info">
              <PreviewIcon />
            </Button>
          </Link>
          <Link to={`/dashboard/schedule/edit/${cellValues.id}`} style={{ textDecoration: 'none' }}>
            <Button sx={{ mr: 2 }}>
              <EditIcon />
            </Button>
          </Link>
          <Button
            color="error"
            //  onClick={() => deleteSchedule(cellValues.id)}
            onClick={() => {
              setSchedule(cellValues.id);
              setOpen(true);
            }}
          >
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];

  console.log(newScheduleData);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Typography variant="h3">{scheduleData.name}</Typography>
      <DataGrid
        rows={futureSchedule === true ? newfutureScheduleData : newScheduleData}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        style={{ height: '80vh' }}
      />
      <DeleteItem
        {...{ deleteItem: deleteSchedule, setOpen, handleClose, open, itemId: scheduleId }}
      />
    </div>
  );
};

export default ScheduleByProgramComponent;
