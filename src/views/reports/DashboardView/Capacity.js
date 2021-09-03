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

const Capacity = ({ className, ...rest }) => {
  const classes = useStyles();
  const data = {
    value: '24,000',
    currency: '$',
    difference: 4
  };
  const systemCapacity = {
    value: '100',
    label: '告警訊息'
  };
  const serviceCapacity = {
    value: '228',
    label: '告警訊息'
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
          異常告警
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
            {systemCapacity.label}&nbsp;&nbsp;
          </Typography>
          <TextField 
            id="outlined-basic"
            label={systemCapacity.value} 
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
            {serviceCapacity.label}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Typography>
          <TextField 
            id="outlined-basic" 
            label={serviceCapacity.value} 
            variant="outlined"
            size="normal"
          />
          {/* <Label
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

Capacity.propTypes = {
  className: PropTypes.string
};

export default Capacity;
