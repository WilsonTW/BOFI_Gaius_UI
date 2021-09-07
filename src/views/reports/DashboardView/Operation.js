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
  fade,
  makeStyles,
  TextField,
  Button,
  SvgIcon
} from '@material-ui/core';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Label from 'src/components/Label';
import { Link as RouterLink } from 'react-router-dom';
import { Monitor as MonitorIcon } from 'react-feather';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
  },
  greenMode: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:  fade(theme.palette.green.main, 0.75)
    // backgroundColor:  theme.palette.green.main
    // color: theme.palette.secondary.contrastText,
    // height: 48,
    // width: 48
  },
  greyMode: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:  fade(theme.palette.grey.main, 0.7)
    // color: theme.palette.secondary.contrastText,
    // height: 48,
    // width: 48
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

const Operation = ({ className, ...rest }) => {
  const [value, setValue] = React.useState('auto');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [state, dispatch, stateDevice, dispatchDevice] = useContext(MqttContext);
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [pcs, setPcs] = useState('pcs');
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
  
  const radioTemp = [];
  const modeVar = parseInt(stateDevice.pcs[0].acInAcP) < 100;
  if (parseInt(stateDevice.pcs[0].acInAcP) < 100){
    radioTemp.push(
      <RadioGroup 
        aria-label="operation" 
        name="operation" 
        value={value} 
        onChange={handleChange}>
        <FormControlLabel  
          variant="body2" 
          // value="auto" 
          checked="true"
          control={<Radio />} 
          label="綠電模式" />
        <FormControlLabel  
          variant="body2" 
          // value="auto" 
          control={<Radio />} 
          label="綠灰電模式" />
      </RadioGroup>
    );
  }
  else{
    radioTemp.push(
      <RadioGroup 
        aria-label="operation" 
        name="operation" 
        value={value} 
        onChange={handleChange}>
        <FormControlLabel  
          variant="body2" 
          // value="auto" 
          control={<Radio />} 
          label="綠電模式" />
        <FormControlLabel  
          variant="body2" 
          // value="auto" 
          checked="true"
          control={<Radio />} 
          label="綠灰電模式" />
      </RadioGroup>
    );
  }
  
  return (
    <Card
      // className={clsx(classes.root, className)}
      className={clsx((modeVar ? classes.greenMode : classes.greyMode), className)}
      {...rest}
    >
      <Box flexGrow={1}>
        <Typography
          component="h3"
          gutterBottom
          variant="inherit"
          color="inherit"
        >
          系統運行模式
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          mt={4}
          mb={2}
        >
           <Button
              color="secondary"
              variant="contained"
              component={RouterLink}
              to="/app/reports/equipments"
              startIcon={
                <SvgIcon fontSize="normal">
                  <MonitorIcon />
                </SvgIcon>
              }
              size="normal"
            >
              Equipment
            </Button>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          mt={4}
          mb={2}
        >
          {/* <RadioGroup 
            aria-label="operation" 
            name="operation" 
            value={value} 
            onChange={handleChange}
            >
            <FormControlLabel  
              variant="body2" 
              // value="auto" 
              checked="true"
              control={<Radio />} 
              label="綠電模式" />
            <FormControlLabel  
              variant="body2" 
              // value="auto"
              // checked="true"
              control={<Radio />} 
              label="綠灰電模式" />
          </RadioGroup> */}
           {radioTemp}
        </Box>
      </Box>
      {/* <Avatar className={classes.avatar}>
        <AttachMoneyIcon />
      </Avatar> */}
    </Card>
  );
};

Operation.propTypes = {
  className: PropTypes.string
};

export default Operation;
