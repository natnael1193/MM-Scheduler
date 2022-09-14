import { Button } from '@mui/material';
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import { Link } from 'react-router-dom';
import { useDeleteOrganizationMutation } from 'src/services/OrganizationApi';

const OrganizationListComponent = ({ organizationData }: any) => {

    //Delete Organization T
    const [deleteOrganization] = useDeleteOrganizationMutation();

  //Data Grid Header
  const columns: GridColumns = [
    {
      field: 'name',
      headerName: 'Organization Name',
      width: 250,
    },
    {
      field: 'organizationTypeID',
      headerName: 'Organization Type',
      width: 250,
    },

    {
      field: 'description',
      headerName: 'Description',
      width: 250,
    },
    {
      field: '',
      // headerName: '',
      type: 'number',
      width: 250,
      renderCell: (cellValues: any) => (
        <>
          <Link
            to={`/dashboard/organization/detail/${cellValues.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Button sx={{ mr: 2 }} color="info">
              <PreviewIcon />
            </Button>
          </Link>
          <Link to={`/dashboard/organization/edit/${cellValues.id}`} style={{ textDecoration: 'none' }}>
            <Button sx={{ mr: 2 }}>
              <EditIcon />
            </Button>
          </Link>
          <Button
            color="error"
              onClick={() => deleteOrganization(cellValues.id)}
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
        rows={organizationData}
        // rows={[]}
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

export default OrganizationListComponent;
