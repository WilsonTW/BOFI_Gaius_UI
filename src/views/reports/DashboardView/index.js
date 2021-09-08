import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import LatestProjects from './LatestProjects';
import NewProjects from './NewProjects';
import PerformanceOverTime from './PerformanceOverTime';
import RealTime from './RealTime';
import RoiPerCustomer from './RoiPerCustomer';
import SystemHealth from './SystemHealth';
import TeamTasks from './TeamTasks';
import TodaysMoney from './TodaysMoney';
import Capacity from './Capacity';
import PowerGrid from './Grid';
import Operation from './Operation';
import Output from './Output';
import Power from './Power';
import Battery from './Battery';
import RadialChart from './RadialChart';
import LineChart from './LineChart';
import EarningsSegmentation from './EarningsSegmentation';
import EarningsSegmentationCopy from './EarningsSegmentation_copy';
import EarningsSegmentationCopy2 from './EarningsSegmentation_copy2';
// import HookMqtt from 'src/components/MqttHook/';
// import { ProviderContext } from 'src/contexts/test/provider';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const DashboardView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="System"
    >
      <Container maxWidth={false}>
        <Header />
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <Operation />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <Power />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <Battery />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            <Capacity />
          </Grid>
          <Grid
            item
            lg={6}
            xs={12}
          >
            <EarningsSegmentation />
          </Grid>
          <Grid
            item
            container
            lg={6}
            xs={12}
            direction="row-reverse"
            justifyContent="space-evenly"
            alignItems="stretch"
          >
            <Grid
              item
              // container
              lg={12}
              xs={12}
            >
              {/* <RadialChart /> */}
              <EarningsSegmentationCopy />
            </Grid>
            <Grid
              item
              // container
              lg={12}
              xs={12}
            >
              {/* <RadialChart /> */}
              <EarningsSegmentationCopy2 />
            </Grid>
          </Grid>
          
          {/* <Grid
            item
            lg={5}
            xl={4}
            xs={12}
          >
            <TeamTasks />
          </Grid>
          <Grid
            item
            lg={7}
            xl={8}
            xs={12}
          >
            <LatestProjects />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
};

export default DashboardView;
