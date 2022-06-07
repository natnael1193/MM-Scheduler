import { Button } from '@mui/material';
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDeletePriceCategoryMutation } from 'src/services/PriceCategoryApi';

const PriceCategoryListComponent = ({ priceCategoryData }: any) => {

    // Delete Price Category
    const [deletePriceCategory] = useDeletePriceCategoryMutation();



    //Data Grid Header
    const columns: GridColumns = [
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
                    <Link to={`/dashboard/price-category/edit/${cellValues.id}`} style={{ textDecoration: 'none' }}>
                        <Button sx={{ mr: 2 }}>
                            <EditIcon />
                        </Button>
                    </Link>
                    <Button color="error" onClick={() => deletePriceCategory(cellValues.id)}>
                        <DeleteIcon />
                    </Button>
                </>
            )
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
        </div>
    );
};

export default PriceCategoryListComponent;
