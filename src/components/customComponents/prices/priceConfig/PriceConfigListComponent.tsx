import { Button } from '@mui/material';
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDeletePriceConfigMutation } from 'src/services/PriceConfigApi';
import React from 'react';
import DeleteItem from '../../shared/DeleteItem';

const PriceConfigListComponent = ({ priceConfigData }: any) => {
  let newPriceConfigData: any = [];
  const [open, setOpen] = React.useState(false);
  const [priceConfigId, setPriceConfigId] = React.useState('');

  const handleClose = () => setOpen(false);
  // Delete Price config
  const [deletePriceConfig] = useDeletePriceConfigMutation();

  newPriceConfigData = priceConfigData?.map(function (priceConfigs: any) {
    return {
      id: priceConfigs.id,
      key: priceConfigs?.priceCategory?.program?.name.concat(' ' + priceConfigs.key),
      name: priceConfigs?.priceCategory?.program?.name.concat(' ' + priceConfigs.name),
      // key: priceConfigs.key,
      // name: priceConfigs.name,
      rate: priceConfigs.rate,
      unit: priceConfigs.unit,
      program: priceConfigs?.priceCategory?.program?.name,
    };
  });

  //Data Grid Header
  const columns: GridColumns = [
    {
      field: 'key',
      headerName: 'Alias',
      width: 400,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 400,
    },
    {
      field: 'program',
      headerName: 'Program',
      width: 300,
    },
    {
      field: 'rate',
      headerName: 'Rate',
      width: 150,
    },
    {
      field: 'unit',
      headerName: 'Unit',
      width: 150,
    },
    {
      field: '',
      // headerName: '',
      type: 'number',
      width: 250,
      renderCell: (cellValues: any) => (
        <>
          <Link
            to={`/dashboard/price-config/edit/${cellValues.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Button sx={{ mr: 2 }}>
              <EditIcon />
            </Button>
          </Link>
          <Button
            color="error"
            // onClick={() => deletePriceConfig(cellValues.id)}
            onClick={() => {
              setPriceConfigId(cellValues.id);
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
    <div>
      <DataGrid
        rows={newPriceConfigData}
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
          deleteItem: deletePriceConfig,
          setOpen,
          handleClose,
          open,
          itemId: priceConfigId,
        }}
      />
    </div>
  );
};

export default PriceConfigListComponent;
