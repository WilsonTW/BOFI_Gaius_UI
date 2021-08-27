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

const TodaysMoney = ({ className, ...rest }) => {
  const classes = useStyles();
  const data = {
    value: '24,000',
    currency: '$',
    difference: 4
  };
  const systemCapacity = {
    value: '100',
    label: '系統容量(kＷ)'
  };
  const serviceCapacity = {
    value: '˙75',
    label: '服務容量(kＷ)'
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
          variant="button"
          color="textSecondary"
        >
          Capacity
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography
            variant="subtitle1"
            color="textPrimary"
          >
            {systemCapacity.label}
          </Typography>
          <TextField 
            id="outlined-basic" 
            label={systemCapacity.value} 
            variant="outlined"
            size="small"
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
        >
           <Typography
            variant="subtitle1"
            color="textPrimary"
          >
            {serviceCapacity.label}
          </Typography>
          <TextField 
            id="outlined-basic" 
            label={serviceCapacity.value} 
            variant="outlined"
            size="small"
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

TodaysMoney.propTypes = {
  className: PropTypes.string
};

export default TodaysMoney;
