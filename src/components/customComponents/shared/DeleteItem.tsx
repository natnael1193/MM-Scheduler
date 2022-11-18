import { Box, Typography, Grid, Button, Modal } from '@mui/material';
import React from 'react';

const DeleteItem = ({ deleteItem, setOpen, handleClose, open, itemId }: any) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 3 }}>
        Are You Sure To Delete ?
      </Typography>
      <Grid container>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              deleteItem(itemId);
              setOpen(false);
            }}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Modal>
);

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};
export default DeleteItem;
