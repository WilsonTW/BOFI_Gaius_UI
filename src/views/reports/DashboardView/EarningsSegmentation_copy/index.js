import React, {
  useState,
  useEffect,
  useCallback,
  useContext
} from 'react';
import { MqttContext } from 'src/contexts/MqttContext';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Typography,
  makeStyles,
  useTheme,
  Grid,
  TextField,
  CardContent
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GenericMoreButton from 'src/components/GenericMoreButton';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Chart from './Chart';
import ApexChart from 'react-apexcharts';

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    textAlign: 'center',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2, 2),
    '&:not(:last-of-type)': {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  }
}));

const EarningsSegmentation = ({ className, ...rest }) => {
  const [state1, dispatch,stateDevice, dispatchDevice] = useContext(MqttContext);

  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [earnings, setEarnings] = useState(null);
  const theme = useTheme();

  // const [name, setName] = React.useState('20');
  const [pcs, setPcs] = useState('pcs');

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

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: false,
  });

  const handleChangeswitch = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    // if (event.target.checked){
    //   dispatchDevice({
    //     type: "pcs",
    //     id: 1,
    //     property: "p1",
    //     payload: 600000
    //   });
    // }
    // else{
    //   dispatchDevice({
    //     type: "pcs",
    //     id: 1,
    //     property: "p2",
    //     payload: 999
    //   });
    // }
  };

  const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 50,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(24px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',//'#27db96',//'#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });
  
  const data = {
    options: {
      chart: {
        background: theme.palette.background.paper,
        stacked: false,
        toolbar: {
          show: false
        },
        zoom: false
      },
      colors: ['#52d869'],
      labels: ['累積綠電輸出百分比'],
      plotOptions: {
        radialBar: {
          hollow: {
            size: '60%',
          },
          dataLabels: {
            name: {
              fontFamily: theme.typography.fontFamily,
              color: theme.palette.text.primary
            },
            value: {
              color: theme.palette.text.secondary
            }
          },
          track: {
            background: theme.palette.background.dark
          }
        }
      },
      theme: {
        mode: theme.palette.type
      }
    },
    series: [(100 * parseInt(stateDevice.pcs[0].sInP1)/(parseInt(stateDevice.pcs[0].acInAcP)+parseInt(stateDevice.pcs[0].sInP1))).toFixed(1)]
  };
  const getEarnings = useCallback(async () => {
    try  {
      const response = await axios.get('/api/reports/earnings');

      if (isMountedRef.current) {
        setEarnings(response.data.earnings);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getEarnings();
  }, [getEarnings]);

  if (!earnings) {
    return null;
  }

  const iotSwitch = [];
  if((parseInt(stateDevice.pcs[0].status1) & 0xF) == 2){
    iotSwitch.push(
      <IOSSwitch checked={true} name="checkedC" />
    )
  }else{
    iotSwitch.push(
      <IOSSwitch checked={false} name="checkedC" />
    )
  }

  // const greenInPercent = parseInt(stateDevice.pcs[0].sInP1)/(parseInt(stateDevice.pcs[0].acInAcP)+parseInt(stateDevice.pcs[0].sInP1));
  // const greenOutPower = (parseInt(stateDevice.pcs[0].acOutAcP) * greenInPercent).toFixed(1);
  // const greyOutPower = (parseInt(stateDevice.pcs[0].acOutAcP) - greenOutPower).toFixed(1);
  const lastGreenEnergy = parseFloat(stateDevice.pcs[0].lastGreenE);
  const lastGreyEnergy = parseFloat(stateDevice.pcs[0].lastGreyE);
  const sumGreenEnergy = parseFloat(stateDevice.pcs[0].sumGreenE);
  const sumGreyEnergy = parseFloat(stateDevice.pcs[0].sumGreyE);
  const countOutput = parseInt(stateDevice.pcs[0].dayCount);
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
      {/* <CardHeader
        action={<GenericMoreButton />}
        title="Earnings Segmentation"
      /> */}
      <Box 
        display="flex"
        mt={2}
        position="relative"
        minHeight={10}
      >
        <Typography
            variant="h4"
            color="textPrimary"
            mt={3}
        >
          每日單次電力供給狀態
        </Typography>
      </Box>
      <Box 
        display="flex"
        mt={2}
        position="relative"
        minHeight={10}
      >
          <Grid
            container justify="flex-start"
            item
            lg={6}
            xs={12}
          >
            <TextField
              label="當日累積次數"
              // value={stateDevice.pcs[0].sInP1}
              value={countOutput}
              // onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
              InputLabelProps={{style: {fontSize: 20}}} // font size of input label
            />
            <TextField
              label="單次綠電輸出度電(KWh)"
              // value={stateDevice.pcs[0].sInP1}
              value={lastGreenEnergy}
              // onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
              InputLabelProps={{style: {fontSize: 20}}} // font size of input label
            />
             <TextField
              label="單次綠灰電輸出度電(KWh)"
              // value={stateDevice.pcs[0].acInAcP}
              value={lastGreyEnergy}
              // onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
              InputLabelProps={{style: {fontSize: 20}}} // font size of input label
            />
          </Grid>
      </Box>
      <Box 
        display="flex"
        mt={2}
        position="relative"
        minHeight={2}
      >
      {/* <Divider /> */}
      </Box>
      <Divider />
      <Box 
        display="flex"
        mt={2}
        position="relative"
        minHeight={10}
      >
        <Typography
            variant="h4"
            color="textPrimary"
            mt={3}
        >
          每日累計電力供給狀態
        </Typography>
     </Box>
      <Box 
        display="flex"
        mt={2}
        position="relative"
        minHeight={10}
      >
          <Grid
            container justify="flex-start"
            item
            lg={6}
            xs={12}
          >
           <TextField
              label="累計綠電輸出度電(KWh)"
              // value={stateDevice.pcs[0].sInP1}
              value={sumGreenEnergy}
              // onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
              InputLabelProps={{style: {fontSize: 20}}} // font size of input label
            />
             <TextField
              label="累計綠灰電輸出度電(KWh)"
              // value={stateDevice.pcs[0].acInAcP}
              value={sumGreyEnergy}
              // onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
              InputLabelProps={{style: {fontSize: 20}}} // font size of input label
            />
          </Grid>
      </Box>
      </CardContent>
    </Card>
  );
};

EarningsSegmentation.propTypes = {
  className: PropTypes.string
};

export default EarningsSegmentation;
