import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Typography,
  makeStyles,
  TextField
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Label from 'src/components/Label';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    height: 48,
    width: 48
  }
}));

const Battery = ({ className, ...rest }) => {
  const classes = useStyles();
  const data = {
    value: '24,000',
    currency: '$',
    difference: 4
  };
  const voltageBattery = {
    value: '12.1',
    label: 'SOC(%)'
  };
  const temperatureBattery = {
    value: '52',
    label: 'SOH(%)'
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box flexGrow={1}>
        <Typography
          component="h3"
          gutterBottom
          variant="inherit"
          color="inherit"
        >
          電池模組
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          mt={2}
          mb={2}
        >
          <Typography
            variant="body2"
            color="textPrimary"
          >
            {voltageBattery.label}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Typography>
          <TextField 
            id="outlined-basic"
            label={voltageBattery.value} 
            variant="outlined"
            size="normal"
          />
         {/*  <Label
            className={classes.label}
            color={data.difference > 0 ? 'success' : 'error'}
          >
            {data.difference > 0 ? '+' : ''}
            {data.difference}
            %
          </Label> */}
        </Box>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          mt={2}
          mb={2}
        >
          <Typography
            variant="body2"
            color="textPrimary"
          >
            {temperatureBattery.label}&nbsp;&nbsp;
          </Typography>
          <TextField 
            id="outlined-basic" 
            label={temperatureBattery.value} 
            variant="outlined"
            size="normal"
          />
         {/*  <Label
            className={classes.label}
            color={data.difference > 0 ? 'success' : 'error'}
          >
            {data.difference > 0 ? '+' : ''}
            {data.difference}
            %
          </Label> */}
        </Box>
      </Box>
      {/* <Avatar className={classes.avatar}>
        <AttachMoneyIcon />
      </Avatar> */}
    </Card>
  );
};

Battery.propTypes = {
  className: PropTypes.string
};

export default Battery;
