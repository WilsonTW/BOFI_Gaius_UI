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

/* const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatar: {
    backgroundColor: theme.palette.secondary.contrastText,
    color: theme.palette.secondary.main,
    height: 48,
    width: 48
  }
})); */

const PowerGrid = ({ className, ...rest }) => {
  const classes = useStyles();
  const data = {
    value: '24,000',
    currency: '$',
    difference: 4
  };
  const frequencyGrid = {
    value: '65',
    label: '市電側頻率(Hz)'
  };
  const factorGrid = {
    value: '90',
    label: '市電側功因(PF)'
  };
  const powerGrid = {
    value: '580',
    label: '市電側功率(KW)'
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
          color="inherit"
        >
          Grid
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          mb={2}
        >
          <Typography
            variant="subtitle2"
            color="inherit"
          >
            {frequencyGrid.label}
          </Typography>
          <TextField 
            id="outlined-basic"
            label={frequencyGrid.value} 
            variant="outlined"
            size="small"
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          mb={2}
        >
          <Typography
            variant="subtitle2"
            color="inherit"
          >
            {powerGrid.label}
          </Typography>
          <TextField 
            id="outlined-basic"
            label={powerGrid.value} 
            variant="outlined"
            size="small"
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography
            variant="subtitle2"
            color="inherit"
          >
            {factorGrid.label}
          </Typography>
          <TextField 
            id="outlined-basic"
            label={factorGrid.value} 
            variant="outlined"
            size="small"
          />
        </Box>
      </Box>
      {/* <Avatar className={classes.avatar}>
        <AttachMoneyIcon />
      </Avatar> */}
    </Card>
  );
};

PowerGrid.propTypes = {
  className: PropTypes.string
};

export default PowerGrid;
