import React from 'react';
import Chart from 'react-apexcharts';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  useTheme,
  Grid,
  Box,
  Button,
  Link,
  SvgIcon
} from '@material-ui/core';
import {
  KeyboardDatePicker
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { Edit as EditIcon } from 'react-feather';

const RadialChart = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date('2020-12-30T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const theme = useTheme();

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
      labels: ['System Health'],
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
    series: [83]
  };

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h4"
          color="textPrimary"
        >
          NEXT. Control Service
        </Typography>
        <Grid
            container justify="flex-end"
            item
            lg={12}
            xs={12}
          >
           <Button
              color="secondary"
              variant="contained"
              component={RouterLink}
              to="/app/calendar"
              startIcon={
                <SvgIcon fontSize="normal">
                  <EditIcon />
                </SvgIcon>
              }
              size="normal"
            >
              Calendar
            </Button>
          </Grid>
       {/*  <Chart
          options={data.options}
          series={data.series}
          type="radialBar"
          height="300"
        />
        <Typography
          align="center"
          color="textSecondary"
          variant="caption"
          component="p"
        >
          This shouldn&apos;t be bellow 80%
        </Typography> */}
        <Box 
          display="flex"
          mb={8}
          position="relative"
          minHeight={10}
        >
          <Grid 
            container justify="center"
            item
            lg={12}
            xs={12}
          >
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/DD/YYYY"
              margin="normal"
              id="date-picker-inline"
              label="Estimated time of control"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              fullWidth
              InputLabelProps={{style: {fontSize: 20}}} // font size of input label
            />
            <TextField 
              label="Estimated time of start"
              id="standard-size-normal" 
              defaultValue="13:40"
              size="normal"
              margin="normal"
              fullWidth
              InputLabelProps={{style: {fontSize: 20}}} // font size of input label
            />
             <TextField 
              label="Estimated time of end" 
              id="standard-size-normal" 
              defaultValue="23:50"
              size="normal"
              margin="normal"
              fullWidth
              InputLabelProps={{style: {fontSize: 20}}} // font size of input label
            />
             <TextField 
              label="Output power setting(KW)" 
              id="standard-size-normal" 
              defaultValue="100"
              size="normal"
              margin="normal"
              fullWidth
              InputLabelProps={{style: {fontSize: 20}}} // font size of input label
            />
             <TextField 
              label="Mode set" 
              id="standard-size-normal" 
              defaultValue="Discharge"
              size="normal"
              margin="normal"
              fullWidth
              InputLabelProps={{style: {fontSize: 20}}} // font size of input label
            />
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RadialChart;
