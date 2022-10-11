import { Breadcrumbs, Grid, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const BreadCrumb = ({ main, parent, child, grandChild, parentLink }: any) => (
  <Box style={{ marginBottom: 12, padding: 5 }}>
    <Grid container>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/" style={{ textDecoration: 'none' }}>
          {main}
        </Link>
        <Link style={{ textDecoration: 'none' }} to={parentLink}>
          {parent}
        </Link>
        <Typography>{child}</Typography>
      </Breadcrumbs>
    </Grid>{' '}
  </Box>
);

export default BreadCrumb;
