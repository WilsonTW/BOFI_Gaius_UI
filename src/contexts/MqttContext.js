import React, { useEffect, useReducer, useState } from "react";
import Connection from './MqttConnection';
// import Publisher from './MqttPublisher';
// import Subscriber from './MqttSubscriber';
// import Receiver from './MqttReceiver';
import mqtt from 'mqtt';

const initialMqttState = {
  character: [
    {
      id: "01",
      name: "湯姆貓",
      feature: "很蠢"
    },
    {
      id: "02",
      name: "傑立鼠",
      feature: "很賤"
    },
    {
      id: "03",
      name: "母湯貓",
      feature: "哥哥~母湯喔!"
    }
  ],
  startCatchMouse: false,
  valueTest: 111,
  connectStatus: "",
  mqttPayload: "",
  isSubed: false,
  mqttClient: ""
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      return {
        character: [...state.character, action.payload] //payload就是傳回來的資料
      };
    case "DEL_CONTACT":
      return {
        character: state.character.filter(
          (character) => character.id !== action.payload
        )
      };
    case "START":
      return {
        startCatchMouse: true
      };
    case "COMPLETE":
      return {
        startCatchMouse: false
      };
    case "MOD":
      return {
        ...state,
        valueTest: action.payload
      };
    case "CONNSTAT":
      return {
        ...state,
        connectStatus: action.payload
      };
    case "PAYLOAD":
      return {
        ...state,
        mqttPayload: action.payload
      };
    case "SETSUB":
      return {
        ...state,
        isSubed: action.payload
      };
    default:
      throw new Error();
  }
};

const device = {
  pcs: [
    {
      id: 1,
      topic: '/BOFI/gaius/pcs/1/',
      qos: 1
    }
    // {
    //   id: 2,
    //   topic: '/BOFI/gaius/pcs/2/',
    //   qos: 1
    // }
   
  ],
  bms: [
    {
      id: 1,
      topic: '/BOFI/gaius/bms/1/',
      qos: 1
    }
    // {
    //   id: 2,
    //   topic: '/BOFI/gaius/bms/2/',
    //   qos: 1
    // }
  ],
  plc: [
    {
      id: 1,
      topic: '/BOFI/gaius/plc/1/',
      qos: 1
    }
  ],
  mppt: [
    {
      id: 1,
      topic: '/BOFI/gaius/mppt/1/',
      qos: 1
    }
  ],
  inverter: [
    {
      id: 1,
      topic: '/BOFI/gaius/inverter/1/',
      qos: 1
    },
    {
      id: 2,
      topic: '/BOFI/gaius/inverter/2/',
      qos: 1
    }
  ],
  powermeter: [
    {
      id: 1,
      topic: '/BOFI/gaius/powermeter/1/',
      qos: 1
    }
  ]
}; 

const pcsProfile = [
  "p1","p2","p3","p4","p5","p6","p7","p8","p9","p10","p11","p12","p13","p14","p15","p16"
]; 
const bmsProfile = [
  "p1","p2","p3","p4","p5","p6","p7","p8"
]; 
const plcProfile = [
  "p1","p2","p3","p4","p5","p6","p7","p8","p9","p10","p11","p12","p13","p14","p15","p16"
];
const mpptProfile = [
  "p1","p2","p3","p4","p5","p6","p7","p8","p9","p10","p11","p12","p13","p14",
  "p15","p16","p17","p18","p19","p20","p21","p22","p23","p24","p25","p26","p27","p28"
];
const inverterProfile = [
  "p1","p2","p3","p4","p5","p6","p7","p8","p9","p10","p11","p12","p13","p14",
  "p15","p16","p17","p18","p19","p20","p21","p22"
];
const powermeterProfile = [
  "p1","p2","p3","p4","p5","p6","p7","p8","p9"
];

const initialDeviceState = {
  pcs: [
    {
      id: 1,
      errorCode: '6030',
      inverterState1: '6033',
      inverterState2: '6034',
      abVoltage: '6.1',
      bcVoltage: '6.1',
      caVoltage: '6.1',
      aCurrent: '6.1',
      bCurrent: '6.1',
      cCurrent: '6.1',
      frequency: '6.01',
      power: '6.1',
      dVoltage: '6.1',
      dCurrent: '6.1',
      dPower: '6.1',
      todayDischarge: '0',
      todayCharge: '0'
    }
    // {
    //   id: '02',
    //   errorCode: '2030',
    //   inverterState1: '2033',
    //   inverterState2: '2034',
    //   abVoltage: '2.1',
    //   bcVoltage: '2.1',
    //   caVoltage: '2.1',
    //   aCurrent: '2.1',
    //   bCurrent: '2.1',
    //   cCurrent: '2.1',
    //   frequency: '2.01',
    //   power: '2.1',
    //   dVoltage: '2.1',
    //   dCurrent: '2.1',
    //   dPower: '2.1'
    // }
  ],
  bms: [
    {
      id: 1,
      name: 'STC',
      labelVoltage: '12.1',
      alarmNo: '1',
      batteryVoltage: '11.9',
      batteryTemp: '28.3',
      dischargeTest: 'C',
      lastDischargeAlarm: '20201203152226',
      lastVTscanAlarm: '20201203163324'
    }
    // {
    //   id: '02',
    //   name: 'STC',
    //   labelVoltage: '12.2',
    //   alarmNo: '2',
    //   batteryVoltage: '11.2',
    //   batteryTemp: '28.2',
    //   dischargeTest: 'C',
    //   lastDischargeAlarm: '20201203152222',
    //   lastVTscanAlarm: '20201203163322'
    // }
  ],
  plc: [
    {
      id: 1,
      rVoltage: '1.0',
      sVoltage: '1.0',
      tVoltage: '1.0',
      rCurrent: '1.0',
      sCurrent: '1.0',
      tCurrent: '1.0',
      frequency: '0.1',
      factor: '0.01',
      power: '1.0',
      rVoltageTp: '1.0',
      sVoltageTp: '1.0',
      tVoltageTp: '1.0',
      rCurrentTp: '1.0',
      frequencyTp: '0.1',
      factorTp: '0.01',
      powerTp: '1.0'
    }
  ],
  mppt: [
    {
      id: 1,
      totalInputCurrent: '0.01',
      totalInputPower: '0.01',
      totalOutputCurrent: '0.01',
      totalOutputPower: '0.01',
      module01Alarm: '1030',
      module02Alarm: '1034',
      module03Alarm: '1038',
      module01LowV: '0.01',
      module01LowC: '0.01',
      module01LowP: '0.01',
      module01HighV: '0.01',
      module01HighC: '0.01',
      module01HighP: '0.01',
      module01ChargeToday: '0.01',
      module02LowV: '0.01',
      module02LowC: '0.01',
      module02LowP: '0.01',
      module02HighV: '0.01',
      module02HighC: '0.01',
      module02HighP: '0.01',
      module02ChargeToday: '0.01',
      module03LowV: '0.01',
      module03LowC: '0.01',
      module03LowP: '0.01',
      module03HighV: '0.01',
      module03HighC: '0.01',
      module03HighP: '0.01',
      module03ChargeToday: '0.01'
    }
  ],
  inverter: [
    {
      id: 1,
      pv1Voltage: '0.1',
      pv2Voltage: '0.1',
      pv3Voltage: '0.1',
      pv1Current: '0.01',
      pv2Current: '0.01',
      pv3Current: '0.01',
      pv1Power: '1',
      pv2Power: '1',
      pv3Power: '1',
      rsVoltage: '0.1',
      stVoltage: '0.1',
      trVoltage: '0.1',
      rCurrent: '0.01',
      sCurrent: '0.01',
      tCurrent: '0.01',
      power: '1',
      dspAlarmCode: 'NA',
      dspFaultCode: 'NA',
      inverterState: 'NA',
      alarmCode: 'NA',
      powerGen: '0.1',
      powerGenToday: '1'
    },
    {
      id: 2,
      pv1Voltage: '0.2',
      pv2Voltage: '0.2',
      pv3Voltage: '0.2',
      pv1Current: '0.02',
      pv2Current: '0.02',
      pv3Current: '0.02',
      pv1Power: '1',
      pv2Power: '1',
      pv3Power: '1',
      rsVoltage: '0.1',
      stVoltage: '0.1',
      trVoltage: '0.1',
      rCurrent: '0.01',
      sCurrent: '0.01',
      tCurrent: '0.01',
      power: '1',
      dspAlarmCode: 'NA',
      dspFaultCode: 'NA',
      inverterState: 'NA',
      alarmCode: 'NA',
      powerGen: '0.1',
      powerGenToday: '1'
    }
  ],
  powermeter: [
    {
      id: 1,
      rVoltage: '1.0',
      sVoltage: '1.0',
      tVoltage: '1.0',
      rCurrent: '1.0',
      sCurrent: '1.0',
      tCurrent: '1.0',
      frequency: '0.1',
      factor: '0.01',
      power: '1.0'
    }
  ]
};

const qosOption = [
  {
    label: '0',
    value: 0,
  }, {
    label: '1',
    value: 1,
  }, {
    label: '2',
    value: 2,
  },
];

const reducerDevice = (state, action) => {
  switch (action.type) {
    case "pcs":
      switch (action.property){
        case "p1":
          state.pcs[action.id - 1].errorCode = action.payload;  
          return {
            ...state
          };
        case "p2":
          state.pcs[action.id - 1].inverterState1 = action.payload;  
          return {
            ...state
          };
        case "p3":
          state.pcs[action.id - 1].inverterState2 = action.payload;  
          return {
            ...state
          };
        case "p4":
          state.pcs[action.id - 1].abVoltage = action.payload;  
          // console.log("pcs p4: " + state.pcs[action.id - 1].abVoltage);
          return {
            ...state
          };
        case "p5":
          state.pcs[action.id - 1].bcVoltage = action.payload;  
          return {
            ...state
          };
        case "p6":
          state.pcs[action.id - 1].caVoltage = action.payload;  
          return {
            ...state
          };
        case "p7":
          state.pcs[action.id - 1].aCurrent = action.payload;  
          return {
            ...state
          };
        case "p8":
          state.pcs[action.id - 1].bCurrent = action.payload;  
          return {
            ...state
          };
        case "p9":
          state.pcs[action.id - 1].cCurrent = action.payload;  
          return {
            ...state
          };
        case "p10":
          state.pcs[action.id - 1].frequency = action.payload;  
          return {
            ...state
          };
        case "p11":
          state.pcs[action.id - 1].power = action.payload;  
          return {
            ...state
          };
        case "p12":
          state.pcs[action.id - 1].dVoltage = action.payload;  
          return {
            ...state
          };
        case "p13":
          state.pcs[action.id - 1].dCurrent = action.payload;  
          return {
            ...state
          };
        case "p14":
          state.pcs[action.id - 1].dPower = action.payload;  
          return {
            ...state
          };
        case "p15":
          state.pcs[action.id - 1].todayDischarge = action.payload;  
          return {
            ...state
          };
        case "p16":
          state.pcs[action.id - 1].todayCharge = action.payload;  
        return {
          ...state
        };
        default:
          throw new Error();
      }
    case "bms":
      switch (action.property){
        case "p1":
          state.bms[action.id - 1].name = action.payload;  
          return {
            ...state
          };
        case "p2":
          state.bms[action.id - 1].labelVoltage = action.payload;  
          return {
            ...state
          };
        case "p3":
          state.bms[action.id - 1].alarmNo = action.payload;  
          return {
            ...state
          };
        case "p4":
          state.bms[action.id - 1].batteryVoltage = action.payload;  
          return {
            ...state
          };
        case "p5":
          state.bms[action.id - 1].batteryTemp = action.payload;  
          return {
            ...state
          };
        case "p6":
          state.bms[action.id - 1].dischargeTest = action.payload;  
          return {
            ...state
          };
        case "p7":
          state.bms[action.id - 1].lastDischargeAlarm = action.payload;  
          return {
            ...state
          };
        case "p8":
          state.bms[action.id - 1].lastVTscanAlarm = action.payload;  
          return {
            ...state
          };
        default:
          throw new Error();
      }
    case "plc":
      switch (action.property){
        case "p1":
          state.plc[action.id - 1].rVoltage = action.payload;  
          return {
            ...state
          };
        case "p2":
          state.plc[action.id - 1].sVoltage = action.payload;  
          return {
            ...state
          };
        case "p3":
          state.plc[action.id - 1].tVoltage = action.payload;  
          return {
            ...state
          };
        case "p4":
          state.plc[action.id - 1].rCurrent = action.payload;  
          return {
            ...state
          };
        case "p5":
          state.plc[action.id - 1].sCurrent = action.payload;  
          return {
            ...state
          };
        case "p6":
          state.plc[action.id - 1].tCurrent = action.payload;  
          return {
            ...state
          };
        case "p7":
          state.plc[action.id - 1].frequency = action.payload;  
          return {
            ...state
          };
        case "p8":
          state.plc[action.id - 1].factor = action.payload;  
          return {
            ...state
          };
        case "p9":
          state.plc[action.id - 1].power = action.payload;  
          return {
            ...state
          };
        case "p10":
          state.plc[action.id - 1].rVoltageTp = action.payload;  
          return {
            ...state
          };
        case "p11":
          state.plc[action.id - 1].sVoltageTp = action.payload;  
          return {
            ...state
          };
        case "p12":
          state.plc[action.id - 1].tVoltageTp = action.payload;  
          return {
            ...state
          };
        case "p13":
          state.plc[action.id - 1].rCurrentTp = action.payload;  
          return {
            ...state
          };
        case "p14":
          state.plc[action.id - 1].frequencyTp = action.payload;  
          return {
            ...state
          };
        case "p15":
          state.plc[action.id - 1].factorTp = action.payload;  
          return {
            ...state
          };
        case "p16":
          state.plc[action.id - 1].powerTp = action.payload;  
          return {
            ...state
          };
        default:
          throw new Error();
      }
    case "mppt":
      switch (action.property){
        case "p1":
          state.mppt[action.id - 1].totalInputCurrent = action.payload;  
          return {
            ...state
          };
        case "p2":
          state.mppt[action.id - 1].totalInputPower = action.payload;  
          return {
            ...state
          };
        case "p3":
          state.mppt[action.id - 1].totalOutputCurrent = action.payload;  
          return {
            ...state
          };
        case "p4":
          state.mppt[action.id - 1].totalOutputPower = action.payload;  
          return {
            ...state
          };
        case "p5":
          state.mppt[action.id - 1].module01Alarm = action.payload;  
          return {
            ...state
          };
        case "p6":
          state.mppt[action.id - 1].module02Alarm = action.payload;  
          return {
            ...state
          };
        case "p7":
          state.mppt[action.id - 1].module03Alarm = action.payload;  
          return {
            ...state
          };
        case "p8":
          state.mppt[action.id - 1].module01LowV = action.payload;  
          return {
            ...state
          };
        case "p9":
          state.mppt[action.id - 1].module01LowC = action.payload;  
          return {
            ...state
          };
        case "p10":
          state.mppt[action.id - 1].module01LowP = action.payload;  
          return {
            ...state
          };
        case "p11":
          state.mppt[action.id - 1].module01HighV = action.payload;  
          return {
            ...state
          };
        case "p12":
          state.mppt[action.id - 1].module01HighC = action.payload;  
          return {
            ...state
          };
        case "p13":
          state.mppt[action.id - 1].module01HighP = action.payload;  
          return {
            ...state
          };
        case "p14":
          state.mppt[action.id - 1].module01ChargeToday = action.payload;  
          return {
            ...state
          };
        case "p15":
          state.mppt[action.id - 1].module02LowV = action.payload;  
          return {
            ...state
          };
        case "p16":
          state.mppt[action.id - 1].module02LowC = action.payload;  
          return {
            ...state
          };
        case "p17":
          state.mppt[action.id - 1].module02LowP = action.payload;  
          return {
            ...state
          };
        case "p18":
          state.mppt[action.id - 1].module02HighV = action.payload;  
          return {
            ...state
          };
        case "p19":
          state.mppt[action.id - 1].module02HighC = action.payload;  
          return {
            ...state
          };
        case "p20":
          state.mppt[action.id - 1].module02HighP = action.payload;  
          return {
            ...state
          };
        case "p21":
          state.mppt[action.id - 1].module02ChargeToday = action.payload;  
          return {
            ...state
          };
        case "p22":
          state.mppt[action.id - 1].module03LowV = action.payload;  
          return {
            ...state
          };
        case "p23":
          state.mppt[action.id - 1].module03LowC = action.payload;  
          return {
            ...state
          };
        case "p24":
          state.mppt[action.id - 1].module03LowP = action.payload;  
          return {
            ...state
          };
        case "p25":
          state.mppt[action.id - 1].module03HighV = action.payload;  
          return {
            ...state
          };
        case "p26":
          state.mppt[action.id - 1].module03HighC = action.payload;  
          return {
            ...state
          };
        case "p27":
          state.mppt[action.id - 1].module03HighP = action.payload;  
          return {
            ...state
          };
        case "p28":
          state.mppt[action.id - 1].module03ChargeToday = action.payload;  
          return {
            ...state
          };
        default:
          throw new Error();
      }
    case "inverter":
      switch (action.property){
        case "p1":
          state.inverter[action.id - 1].pv1Voltage = action.payload;
          // console.log("inverter p1: " + state.inverter[action.id - 1].pv1Voltage);  
          return {
            ...state
          };
        case "p2":
          state.inverter[action.id - 1].pv2Voltage = action.payload;  
          return {
            ...state
          };
        case "p3":
          state.inverter[action.id - 1].pv3Voltage = action.payload;  
          return {
            ...state
          };
        case "p4":
          state.inverter[action.id - 1].pv1Current = action.payload;  
          return {
            ...state
          };
        case "p5":
          state.inverter[action.id - 1].pv2Current = action.payload;  
          return {
            ...state
          };
        case "p6":
          state.inverter[action.id - 1].pv3Current = action.payload;  
          return {
            ...state
          };
        case "p7":
          state.inverter[action.id - 1].pv1Power = action.payload;  
          return {
            ...state
          };
        case "p8":
          state.inverter[action.id - 1].pv2Power = action.payload;  
          return {
            ...state
          };
        case "p9":
          state.inverter[action.id - 1].pv3Power = action.payload;  
          return {
            ...state
          };
        case "p10":
          state.inverter[action.id - 1].rsVoltage = action.payload;  
          return {
            ...state
          };
        case "p11":
          state.inverter[action.id - 1].stVoltage = action.payload;  
          return {
            ...state
          };
        case "p12":
          state.inverter[action.id - 1].trVoltage = action.payload;  
          return {
            ...state
          };
        case "p13":
          state.inverter[action.id - 1].rCurrent = action.payload;  
          return {
            ...state
          };
        case "p14":
          state.inverter[action.id - 1].sCurrent = action.payload;  
          return {
            ...state
          };
        case "p15":
          state.inverter[action.id - 1].tCurrent = action.payload;  
          return {
            ...state
          };
        case "p16":
          state.inverter[action.id - 1].power = action.payload;  
          return {
            ...state
          };
        case "p17":
          state.inverter[action.id - 1].dspAlarmCode = action.payload;  
          return {
            ...state
          };
        case "p18":
          state.inverter[action.id - 1].dspFaultCode = action.payload;  
          return {
            ...state
          };
        case "p19":
          state.inverter[action.id - 1].inverterState = action.payload;  
          return {
            ...state
          };
        case "p20":
          state.inverter[action.id - 1].alarmCode = action.payload;  
          return {
            ...state
          };
        case "p21":
          state.inverter[action.id - 1].powerGen = action.payload;  
          return {
            ...state
          };
        case "p22":
          state.inverter[action.id - 1].powerGenToday = action.payload;  
          return {
            ...state
          };
        default:
          throw new Error();
      }
    case "powermeter":
      switch (action.property){
        case "p1":
          state.powermeter[action.id - 1].rVoltage = action.payload;  
          return {
            ...state
          };
        case "p2":
          state.powermeter[action.id - 1].sVoltage = action.payload;  
          return {
            ...state
          };
        case "p3":
          state.powermeter[action.id - 1].tVoltage = action.payload;  
          return {
            ...state
          };
        case "p4":
          state.powermeter[action.id - 1].rCurrent = action.payload;  
          return {
            ...state
          };
        case "p5":
          state.powermeter[action.id - 1].sCurrent = action.payload;  
          return {
            ...state
          };
        case "p6":
          state.powermeter[action.id - 1].tCurrent = action.payload;  
          return {
            ...state
          };
        case "p7":
          state.powermeter[action.id - 1].frequency = action.payload;  
          return {
            ...state
          };
        case "p8":
          state.powermeter[action.id - 1].factor = action.payload;  
          return {
            ...state
          };
        case "p9":
          state.plc[action.id - 1].power = action.payload;  
          return {
            ...state
          };
        default:
          throw new Error();
      }    
    default:
      throw new Error();
  }
};

export const MqttContext = React.createContext();

export const MqttProvider = ({ children }) => {
  // console.log("location" + window.location.hostname);
  const [client, setClient] = useState(null);
  // const [isSubed, setIsSub] = useState(false);
  const [payload, setPayload] = useState({});
  // const [connectStatus, setConnectStatus] = useState('Connect');

  const [state, dispatch] = useReducer(reducer, initialMqttState);
  const [stateDevice, dispatchDevice] = useReducer(reducerDevice, initialDeviceState);
  
  const mqttConnect = (host, mqttOption) => {
    // setConnectStatus('Connecting');
    dispatch({
      type: "CONNSTAT",
      payload: "Connecting"
    });
    setClient(mqtt.connect(host, mqttOption));
  };

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        // setConnectStatus('Connect');
        dispatch({
          type: "CONNSTAT",
          payload: "Connect"
        });
      });
    }else{
      console.log('client is not ready before Disconnect');
    }
  };
  
  const mqttPublish = (context) => {
    if (client) {
      const { topic, qos, payload } = context;
      client.publish(topic, payload, { qos }, error => {
        if (error) {
          console.log('Publish error: ', error);
        }
      });
    }else{
      console.log('client is not ready before Publish');
    }
  };

  const mqttSub = (subscription, property) => {
    if (client) {
      const { id, topic, qos } = subscription;
      const topicSub = topic + property;
    
      client.subscribe(topicSub, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        dispatch({
          type: "SETSUB",
          payload: true
        });
      });
    }else{
      console.log('client is not ready before Subscribe');
    }
  };

  const mqttUnSub = (subscription) => {
    if (client) {
      const { topic } = subscription;
      client.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error)
          return
        }
        dispatch({
          type: "SETSUB",
          payload: false
        });
      });
    }
  };

  const setMqttPayload = (topic, message) => {
    const arr = topic.split("/");
    // console.log(arr, arr.length);
    dispatchDevice({
      type: arr[arr.length -3],
      id: arr[arr.length -2],
      property: arr[arr.length -1],
      payload: message.toString()
    });
  };

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        // setConnectStatus('Connected');
        dispatch({
          type: "CONNSTAT",
          payload: "Connected"
        });
        for (const pcs of device.pcs) {
          for (const property of pcsProfile){
            mqttSub(pcs, property);
          }
        }
        for (const bms of device.bms) {
          for (const property of bmsProfile){
            mqttSub(bms, property);
          }
        }
        for (const plc of device.plc) {
          for (const property of plcProfile){
            mqttSub(plc, property);
          }
        }
        for (const mppt of device.mppt) {
          for (const property of mpptProfile){
            mqttSub(mppt, property);
          }
        }
        for (const inverter of device.inverter) {
          for (const property of inverterProfile){
            mqttSub(inverter, property);
          }
        }
        for (const powermeter of device.powermeter) {
          for (const property of powermeterProfile){
            mqttSub(powermeter, property);
          }
        }
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        // setConnectStatus('Reconnecting');
        dispatch({
          type: "CONNSTAT",
          payload: "Reconnecting"
        });
      });
      client.on('message', (topic, message) => {
        // const payload = { topic, message: message.toString() };
        // setPayload(payload);
        // dispatch({
        //   type: "PAYLOAD",
        //   payload: message.toString()
        // });
        setMqttPayload(topic, message);
      });
    }
  }, [client]);

  return (
    // <MqttContext.Provider value={initialState}>  
    //   <Content context={MqttContext} />
    // </MqttContext.Provider>
    <>
      <Connection connect={mqttConnect} disconnect={mqttDisconnect} />
      {/* <MqttContext.Provider value={qosOption}> */}
        {/* <Subscriber sub={mqttSub} unSub={mqttUnSub} /> */}
        {/* <Publisher publish={mqttPublish} /> */}
      {/* </MqttContext.Provider> */}
      {/* <Receiver payload={payload}/> */}
      <MqttContext.Provider value={[state, dispatch, stateDevice, dispatchDevice]}>
        {children}
      </MqttContext.Provider>
    </>
  );
};

export default MqttContext;