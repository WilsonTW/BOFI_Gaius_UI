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

  const [name, setName] = React.useState('20');
  const handleChange = (event) => {
    setName(event.target.value);
  };

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
  });

  const handleChangeswitch = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if (event.target.checked){
      dispatchDevice({
        type: "pcs",
        id: 1,
        property: "p1",
        payload: 600000
      });
    }
    else{
      dispatchDevice({
        type: "pcs",
        id: 1,
        property: "p2",
        payload: 999
      });
    }
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
          backgroundColor: '#52d869',
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
      colors: ['#27c6db'],
      labels: ['Status'],
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
    series: [36.6]
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
      <Typography
          variant="h4"
          color="textPrimary"
      >
        Control Service
      </Typography>
      {/* <Divider /> */}
      {/* <Box
        p={3}
        position="relative"
        minHeight={320}
      >
        <Chart data={earnings} />
      </Box> */}
      <Box 
        display="flex"
        mt={3}
        position="relative"
        minHeight={10}
      >
          <Grid
            container justify="flex-start"
            item
            lg={6}
            xs={12}
          >
           {/*  <Typography
              variant="h4"
              color="textPrimary"
            >
              輸出功率設定
            </Typography> */}
            <TextField
              label="Output Power(KW)"
              value={name}
              onChange={handleChange}
              variant="outlined"
              margin="small"
              InputLabelProps={{style: {fontSize: 20}}} // font size of input label
            />
          </Grid>
          <Grid
            container justify="flex-end"
            item
            lg={6}
            xs={12}
          >
            {/* <FormControlLabel
              control={<IOSSwitch checked={state.checkedB} onChange={handleChangeswitch} name="checkedB" />}
              label="iOS style"
            /> */}
           <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={2}>
              <Grid item>Charge</Grid>
              <Grid item>
                <IOSSwitch checked={state.checkedC} onChange={handleChangeswitch} name="checkedC" />
              </Grid>
              <Grid item>Discharge</Grid>
            </Grid>
          </Typography>
          </Grid>
      </Box>
      <ApexChart
        options={data.options}
        series={data.series}
        type="radialBar"
        height="300"
      />
      <Divider />
      <Box display="flex">
        {earnings.labels.map((label, i) => (
          <div
            key={label}
            className={classes.item}
          >
            <Typography
              variant="body1"
              color="textSecondary"
            >
              {label}
            </Typography>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              {earnings.datasets[0].data[i]}
            </Typography>
          </div>
        ))}
      </Box>
      </CardContent>
    </Card>
  );
};

EarningsSegmentation.propTypes = {
  className: PropTypes.string
};

export default EarningsSegmentation;
