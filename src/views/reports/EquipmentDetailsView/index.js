import React, {
  useCallback,
  useState,
  useEffect,
  useContext
} from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import PCSs from './PCSs';
import BMSs from './BMSs';
// import PLCs from './PLCs';
// import MPPTs from './MPPTs';
// import INVERTERs from './INVERTERs';
// import POWERs from './POWERs';

import { MqttContext } from 'src/contexts/MqttContext';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const EquipmentDetailsView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [pcs, setPcs] = useState('pcs');
  const [bms, setBms] = useState('bms');
  // const [plc, setPlc] = useState('plc');
  // const [mppt, setMppt] = useState('mppt');
  // const [inverter1, setInverter1] = useState('inverter1');
  // const [inverter2, setInverter2] = useState('inverter2');
  // const [powermeter, setPowermeter] = useState('powermeter');
  const [currentTab, setCurrentTab] = useState('pcs');
  
  const [state, dispatch, stateDevice, dispatchDevice, mqttPublish] = useContext(MqttContext);

  const tabs = [
    { value: 'pcs', label: 'PCS' },
    { value: 'bms', label: 'BMS' },
    // { value: 'plc', label: 'PLC' },
    // { value: 'mppt', label: 'MPPT' },
    // { value: 'inverter', label: 'Inverter' }
    // { value: 'powerMeter', label: 'Power Meter' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
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
  const getBms = useCallback(async () => {
    try {
      // const responseBms = await axios.get('/api/equipments/bms');

      // if (isMountedRef.current) {
      //   setBms(responseBms.data.bms);
      // }
      setBms(stateDevice.bms[0]);
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);
  const getPlc = useCallback(async () => {
    try {
      // const responsePlc = await axios.get('/api/equipments/plc');

      // if (isMountedRef.current) {
      //   setPlc(responsePlc.data.plc);
      // }
      setPlc(stateDevice.plc[0]);
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);
  const getMppt = useCallback(async () => {
    try {
      // const responseMppt = await axios.get('/api/equipments/mppt');

      // if (isMountedRef.current) {
      //   setMppt(responseMppt.data.mppt);
      // }
      setMppt(stateDevice.mppt[0]);
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);
  const getInverter1 = useCallback(async () => {
    try {
      // const responseInverter = await axios.get('/api/equipments/inverter');

      // if (isMountedRef.current) {
      //   setInverter(responseInverter.data.inverter);
      // }
      setInverter1(stateDevice.inverter[0]);
      // setInverter(stateDevice.inverter[1]);
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);
  const getInverter2 = useCallback(async () => {
    try {
      // const responseInverter = await axios.get('/api/equipments/inverter');

      // if (isMountedRef.current) {
      //   setInverter(responseInverter.data.inverter);
      // }
      setInverter2(stateDevice.inverter[1]);
      // setInverter(stateDevice.inverter[1]);
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);
  const getPowermeter = useCallback(async () => {
    try {
      // const responsePowermeter = await axios.get('/api/equipments/powermeter');

      // if (isMountedRef.current) {
      //   setPowermeter(responsePowermeter.data.powermeter);
      // }
      setPowermeter(stateDevice.powermeter[0]);
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);
  useEffect(() => {
    getPcs();
    getBms();
    // getPlc();
    // getMppt();
    // getInverter1();
    // getInverter2();
    // getPowermeter();
  }, [getPcs, getBms/*, getPlc, getMppt, getInverter1, getInverter2,getPowermeter*/]);

  if (!pcs) {
    return null;
  }
  if (!bms) {
    return null;
  }
  // if (!plc) {
  //   return null;
  // }
  // if (!mppt) {
  //   return null;
  // }
  // if (!inverter1) {
  //   return null;
  // }
  // if (!inverter2) {
  //   return null;
  // }
  // if (!powermeter) {
  //   return null;
  // }

  return (
    <Page
      className={classes.root}
      title="Equipments"
    >
      <Container maxWidth={false}>
        <Header/>
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {currentTab === 'pcs' && <PCSs equipment={[pcs]} publish={mqttPublish}/>}
          {currentTab === 'bms' && <BMSs equipment={[bms]} />}
          {/* {currentTab === 'plc' && <PLCs equipment={[plc]} />} */}
          {/* {currentTab === 'mppt' && <MPPTs equipment={[mppt]} />} */}
          {/* {currentTab === 'inverter' && <INVERTERs equipment={[inverter1, inverter2]} />} */}
          {/* {currentTab === 'powerMeter' && <POWERs equipment={[powermeter]} />} */}
        </Box>
      </Container>
    </Page>
  );
};

export default EquipmentDetailsView;
