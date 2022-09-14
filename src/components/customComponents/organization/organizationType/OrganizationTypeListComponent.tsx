import { Button } from '@mui/material';
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDeleteOrganizationTypeMutation } from 'src/services/OrganizationTypeApi';

const OrganizationTypeListComponent = ({ organizationTypeData }: any) => {
  //Delete Organization Type
  const [deleteOrganizationType] = useDeleteOrganizationTypeMutation();

  //Data Grid Header
  const columns: GridColumns = [
    {
      field: 'key',
      headerName: 'Key',
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
            to={`/dashboard/organization-type/edit/${cellValues.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Button sx={{ mr: 2 }}>
              <EditIcon />
            </Button>
          </Link>
          <Button color="error" onClick={() => deleteOrganizationType(cellValues.id)}>
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];

  // console.log(organizationTypeData)

  return (
    <div>
      <DataGrid
        rows={organizationTypeData.data}
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

export default OrganizationTypeListComponent;
