import React, {
  useCallback,
  useState,
  useEffect,
  useContext
} from 'react';
import { MqttContext } from 'src/contexts/MqttContext';
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
import useIsMountedRef from 'src/hooks/useIsMountedRef';
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
  const [state, dispatch, stateDevice, dispatchDevice] = useContext(MqttContext);
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [bms, setBms] = useState('bms');
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
  const getBms = useCallback(async () => {
    try {
      // const responsePcs = await axios.get('/api/equipments/pcs');

      // if (isMountedRef.current) {
      //   setPcs(responsePcs.data.pcs);
      // }
      setBms(stateDevice.bms[0]);
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getBms();
  }, [getBms]);
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
            // label={voltageBattery.value} 
            label={stateDevice.bms[0].soc}
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
            {temperatureBattery.label}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Typography>
          <TextField 
            id="outlined-basic" 
            // label={temperatureBattery.value} 
            label={stateDevice.bms[0].soh}
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
