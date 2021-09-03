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

const Power = ({ className, ...rest }) => {
  // const [state, dispatch] = useContext(MqttContext);
  const [state, dispatch, stateDevice, dispatchDevice] = useContext(MqttContext);
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [pcs, setPcs] = useState('pcs');
  const data = {
    value: '24,000',
    currency: '$',
    difference: 4
  };
  const chargePower = {
    // value: state.valueTest,
    value: '700',
    label: '輸入功率(W)'
  };
  const dischargePower = {
    value: '920',
    // value: state.connectStatus,
    // value: state.isSubed,
    // value: state.mqttPayload,
    label: '總發電量(KWh)'
  };

  const getPcs = useCallback(async () => {
    try {
      // const responsePcs = await axios.get('/api/equipments/pcs');

      // if (isMountedRef.current) {
      //   setPcs(responsePcs.data.pcs);
      // }
      setPcs(stateDevice.pcs[0]);
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getPcs();
  }, [getPcs]);

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
          太陽能
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
            {chargePower.label}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Typography>
          <TextField 
            id="outlined-basic"
            // label={chargePower.value}
            label={stateDevice.pcs[0].todayCharge}
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
            {dischargePower.label}&nbsp;&nbsp;
          </Typography>
          <TextField 
            id="outlined-basic" 
            // label={dischargePower.value} 
            label={stateDevice.pcs[0].todayDischarge}
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

Power.propTypes = {
  className: PropTypes.string
};

export default Power;
