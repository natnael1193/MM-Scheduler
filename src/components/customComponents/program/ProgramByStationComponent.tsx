import { Button } from '@mui/material';
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import { useDeleteProgramMutation } from 'src/services/ProgramApi';
import DeleteItem from '../shared/DeleteItem';
import React from 'react';

const ProgramByStationComponent = ({ programData }: any) => {
  const [open, setOpen] = React.useState(false);
  const [programId, setProgramId] = React.useState('');

  const handleClose = () => setOpen(false);

  // Delete Program
  const [deleteProgram] = useDeleteProgramMutation();

  //Data Grid Header
  const columns: GridColumns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 400,
    },
    {
      field: 'programType',
      headerName: 'Program Type',
      width: 200,
    },
    {
      field: 'code',
      headerName: 'Program Code',
      width: 200,
    },
    {
      field: 'isActive',
      headerName: 'Is Active?',
      width: 200,
    },
    {
      field: '',
      // headerName: '',
      type: 'number',
      width: 250,
      renderCell: (cellValues: any) => (
        <>
          <Link
            to={`/dashboard/program/detail/${cellValues.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Button sx={{ mr: 2 }} color="info">
              <PreviewIcon />
            </Button>
          </Link>
          <Link to={`/dashboard/program/edit/${cellValues.id}`} style={{ textDecoration: 'none' }}>
            <Button sx={{ mr: 2 }}>
              <EditIcon />
            </Button>
          </Link>
          <Button
            color="error"
            // onClick={() => deleteProgram(cellValues.id)}
            onClick={() => {
                setProgramId(cellValues.id);
                setOpen(true);
              }}
          >
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <DataGrid
        rows={programData}
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
      <DeleteItem {...{ deleteItem: deleteProgram, setOpen, handleClose, open, itemId: programId }} />
    </div>
  );
};

export default ProgramByStationComponent;
