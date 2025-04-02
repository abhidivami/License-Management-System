import * as React from 'react';
import './index.module.scss'; // Import your styles
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';

const CardComponent = ({ icon, title, value, progressValue }) => {
  return (
    <Card variant="solid" color="primary" invertedColors className="analyticsCard">
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
        {/* <Button variant="soft" size="sm">
          Add to Watchlist
        </Button> */}
        <Button variant="solid" size="sm">
          See breakdown
        </Button>
      </CardActions>
    </Card>
  );
}

export default CardComponent;
