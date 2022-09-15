import { Button } from '@mui/material';
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDeletePriceConfigMutation } from 'src/services/PriceConfigApi';

const PriceConfigListComponent = ({ priceConfigData }: any) => {
  // Delete Price config
  const [deletePriceConfig] = useDeletePriceConfigMutation();

  //Data Grid Header
  const columns: GridColumns = [
    {
      field: 'key',
      headerName: 'Key',
      width: 250,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
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
          <Button color="error" onClick={() => deletePriceConfig(cellValues.id)}>
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <DataGrid
        rows={priceConfigData}
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

export default PriceConfigListComponent;
