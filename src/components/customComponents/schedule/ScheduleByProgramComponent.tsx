import React from 'react';
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import moment from 'moment';
import { useDeleteScheduleMutation } from 'src/services/ScheduleApi';

const ScheduleByProgramComponent = ({ scheduleData, futureSchedule }: any) => {

  // Delete Schedule
  const [deleteSchedule] = useDeleteScheduleMutation();

  console.log(futureSchedule);
  var newScheduleData: any = [];
  newScheduleData =
    scheduleData &&
    scheduleData.map(function (schedule: any) {
      return {
        id: schedule.id,
        day: moment(schedule.startTime).format('dddd Do MMMM YYYY'),
        startTime: moment(schedule.startTime).format('LT'),
        endTime: moment(schedule.endTime).format('LT'),
        priceClassification: schedule.priceClassification.name,
      };
    });

  //Filter Future Schedules
  const futureScheduleData: any = newScheduleData.filter(function (date: any) {
    return date.day > moment(new Date()).format('dddd Do MMMM YYYY');
  })

  // function checkDate(date: any) {
  //   return date.startTime > new Date();
  // }

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
      width: 300,
    },
    {
      field: 'endTime',
      headerName: 'End Time',
      width: 300,
    },
    {
      field: 'priceClassification',
      headerName: 'Price Classification',
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
          <Button color="error" onClick={() => deleteSchedule(cellValues.id)}>
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];

  console.log(futureSchedule === true ? futureScheduleData : newScheduleData)
  console.log(new Date())

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <DataGrid
        rows={futureSchedule === true ? futureScheduleData : newScheduleData}
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
    </div>
  );
};

export default ScheduleByProgramComponent;
