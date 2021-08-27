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

const Output = ({ className, ...rest }) => {
  const classes = useStyles();
  const data = {
    value: '24,000',
    currency: '$',
    difference: 4
  };
  const powerOutput = {
    value: '880',
    label: '輸出功率(KW)'
  };
  const frequencyOutput = {
    value: '4500',
    label: '併網頻率(Hz)'
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
          Power
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          mb={2}
        >
          <Typography
            variant="subtitle2"
            color="textPrimary"
          >
            {powerOutput.label}
          </Typography>
          <TextField 
            id="outlined-basic"
            label={powerOutput.value} 
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
          mb={10}
        >
          <Typography
            variant="subtitle2"
            color="textPrimary"
          >
            {frequencyOutput.label}
          </Typography>
          <TextField 
            id="outlined-basic" 
            label={frequencyOutput.value} 
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

Output.propTypes = {
  className: PropTypes.string
};

export default Output;
