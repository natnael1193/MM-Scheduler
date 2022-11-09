import { Button } from '@mui/material';
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDeletePriceCategoryMutation } from 'src/services/PriceCategoryApi';
import DeleteItem from '../../shared/DeleteItem';
import React from 'react';

const PriceCategoryListComponent = ({ priceCategoryData }: any) => {
  const [open, setOpen] = React.useState(false);
  const [priceCategoryId, setPriceCategoryId] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Delete Price Category
  const [deletePriceCategory] = useDeletePriceCategoryMutation();

  //Data Grid Header
  const columns: GridColumns = [
    {
      field: 'key',
      headerName: 'Alias',
      width: 300,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 300,
    },
    {
      field: '',
      // headerName: '',
      type: 'number',
      width: 250,
      renderCell: (cellValues: any) => (
        <>
          <Link
            to={`/dashboard/price-category/edit/${cellValues.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Button sx={{ mr: 2 }}>
              <EditIcon />
            </Button>
          </Link>
          <Button
            color="error"
            onClick={() => {
              setPriceCategoryId(cellValues.id);
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
        rows={priceCategoryData}
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
        {...{
          deleteItem: deletePriceCategory,
          setOpen,
          handleClose,
          open,
          itemId: priceCategoryId,
        }}
      />
    </div>
  );
};

export default PriceCategoryListComponent;
