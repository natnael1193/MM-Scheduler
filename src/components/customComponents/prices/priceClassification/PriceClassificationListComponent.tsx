import { Button } from '@mui/material'
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDeletePriceClassificationMutation } from 'src/services/PriceClassificationApi';

const PriceClassificationListComponent = ( { priceClassificationData }: any ) => {

  //Delete Price Classification
  const [deletePriceClassification] = useDeletePriceClassificationMutation();

  //Data Grid Header
  const columns: GridColumns = [
    {
      field: 'name',
      headerName: 'Price Classification',
      width: 300,
    },
    {
      field: 'priceCategoryId',
      headerName: 'Price Category',
      width: 300,
    },
      {
      field: 'priceConfigId',
      headerName: 'Price Config',
      width: 300,
    },
    {
      field: '',
      // headerName: '',
      type: 'number',
      width: 250,
      renderCell: (cellValues: any) => (
        <>
          <Link to={`/dashboard/price-classification/edit/${cellValues.id}`} style={{ textDecoration: 'none' }}>
            <Button sx={{ mr: 2 }}>
              <EditIcon />
            </Button>
          </Link>
          <Button color="error" onClick={() => deletePriceClassification(cellValues.id)}>
            <DeleteIcon />
          </Button>
        </>
      )
    },
  ];


  // var newPriceClassificationData: any = [];

  // newPriceClassificationData =
  //   priceClassificationData &&
  //   priceClassificationData.map(function (item: any) {
  //     return {
  //       id: item.id,
  //       name: item.name,
  //       priceCategory: item.priceCategoryId,
  //       priceConfig: item.priceConfigId,
  //     };
  //   });


  return (
    <div style={{ height: '400px', width: '100%' }}>
      <DataGrid
        rows={priceClassificationData}
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
  )
}

export default PriceClassificationListComponent