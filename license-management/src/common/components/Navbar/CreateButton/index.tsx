import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {LicenseForm} from '../../../../components/LicenseForm/index'; 

function CreateButton() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const open = Boolean(anchorEl);

  // Handle Menu Open/Close
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Handle Dialog Open/Close
  const handleOpenDialog = () => {
    setOpenDialog(true);
    setAnchorEl(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          bgcolor: "white",
          marginRight: "10px",
          width: "100px",
          color: "#27548A",
        }}
      >
        Create +
      </Button>
      
      {/* Menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleOpenDialog}>License</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Department</MenuItem>
      </Menu>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle sx={{backgroundColor : "navyblue"}}> Create License </DialogTitle>
        <DialogContent>
          <LicenseForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateButton;
