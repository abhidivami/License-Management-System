import * as React from 'react';
import './index.module.scss';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import Divider from '@mui/joy/Divider';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AspectRatio from '@mui/joy/AspectRatio';

const CardComponent = ({ icon, title, value, progressValue, licenses, filterKey }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getFilteredLicenses = () => {
    switch (filterKey) {
      case 'userBased':
        return licenses.filter(item => 
          item.subscriptionModel === 'user based' || item.subscriptionModel === 'UserBased');
      case 'group':
        return licenses.filter(item => 
          item.subscriptionModel === 'group' || 
          item.subscriptionModel === 'hardware based' || 
          item.subscriptionModel === 'Enterprise');
      case 'active':
        return licenses.filter(item => item.LicenseStatus === 'Active');
      case 'expiredLicenses':
        return licenses.filter(item =>
          item.LicenseStatus === 'Expired'
        )
      case 'totalCostTORenweLicenses': {
        const expiredLicenses = licenses.filter(item => item.LicenseStatus === 'Expired');
        const totalCost = expiredLicenses.reduce((acc, item) => {
            const cost = parseFloat(item.totalCost.replace(/[^0-9.-]+/g, ""));
            return acc + cost;
          }, 0);
        const totalCostInMillions = (totalCost / 1000000).toFixed(1);
        return totalCostInMillions;
      }
      case 'userBasedExpiredLicenses': {
        const userExpired = licenses.filter((item)=> item.LicenseStatus === 'Expired' && item.subscriptionModel==='UserBased')
        return userExpired
      }
      case 'groupExpiredLicenses': {
        const groupExpired = licenses.filter((item)=> item.LicenseStatus === 'Expired' && item.subscriptionModel==='Enterprise')
        return groupExpired
      }
      
      case 'total':
      default:
        return licenses;
    }
  };

  const filteredLicenses = getFilteredLicenses();

  return (
    <>
      <Card variant="solid" color="primary" invertedColors className="analyticsCard"
      sx={{
        width:'250px'
      }}>
        <CardContent orientation="horizontal">
          <CircularProgress size="lg" determinate value={progressValue}>
            <SvgIcon>{icon}</SvgIcon>
          </CircularProgress>
          <CardContent>
            <Typography level="body-md">{title}</Typography>
            <Typography level="h2">{value}</Typography>
          </CardContent>
        </CardContent>
        <CardActions>
          <Button variant="solid" size="sm" onClick={handleOpen}>
            See breakdown
          </Button>
        </CardActions>
      </Card>

      <Dialog 
        open={open} 
        onClose={handleClose}
        sx={{
          '& .MuiDialog-paper': {
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
            borderRadius: 'lg',
            boxShadow: 'lg',
            maxWidth: '800px',
            width: '90vw',
          }
        }}
      >
        <DialogTitle 
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'primary.softBg',
            color: 'primary.softColor',
            py: 2,
            px: 3,
            borderTopLeftRadius: 'inherit',
            borderTopRightRadius: 'inherit',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <SvgIcon sx={{ fontSize: 'xl' }}>{icon}</SvgIcon>
            <Typography level="h5" fontWeight="lg">{title} Breakdown</Typography>
          </Box>
          <IconButton
            aria-label="close"
            size="sm"
            variant="soft"
            color="neutral"
            onClick={handleClose}
          >
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ p: 3, pb: 1 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2
            }}>
              <Typography level="title-lg">
                {filteredLicenses.length} {filteredLicenses.length === 1 ? 'License' : 'Licenses'}
              </Typography>
              <Chip 
                variant="soft" 
                color="primary"
                size="sm"
              >
                {progressValue.toFixed(1)}% of total
              </Chip>
            </Box>

            
          </Box>

          <List variant="outlined" sx={{ 
                borderRadius: 'sm',
                mx: 2,
                mb: 2,
                overflow: 'auto',
                maxHeight: '400px',
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'neutral.400',
                  borderRadius: '3px',
                },
              }}>
            {filteredLicenses.map((license, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ py: 1.5 }}>
                  <ListItemContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography level="title-sm" fontWeight="lg">{license.licenseName}</Typography>
                      <Chip variant="soft" 
                        color={
                          license.LicenseStatus === 'Active' ? 'success' : 
                          license.LicenseStatus === 'Expired' ? 'danger' : 'neutral'
                        }
                        size="sm">{license.LicenseStatus}</Chip>
                    </Box>
                    <Typography level="body-xs" mt={0.5}>
                      Purchased: {new Date(license.purchaseDate).toLocaleDateString()}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                      <Chip variant="outlined" size="sm">
                        Model: {license.subscriptionModel}
                      </Chip>
                      {/* <Chip variant="outlined" size="sm">
                        Users: {license.employeeName|| 'N/A'}
                      </Chip> */}
                      <Chip variant="outlined" size="sm" color="primary">
                        Cost: {license.totalCost}
                      </Chip>
                    </Box>
                  </ListItemContent>
                </ListItem>
                {index < filteredLicenses.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </DialogContent>

        <DialogActions sx={{ p: 2, borderTop: '1px solid', borderColor: 'neutral.outlinedBorder' }}>
          <Button variant="solid" color="primary" onClick={handleClose} fullWidth size="sm"> Close Details</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CardComponent;