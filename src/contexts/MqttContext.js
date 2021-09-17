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
      topic: '/BOFI/gaius/sp4k/1/',
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
      topic: '/BOFI/gaius/zdaf/1/',
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
  "error0","error1","wMode","bV","bT","acInAcP","acOutV","acOutAcP","acOutF","acOutC","bCap","sInP1","bC","sInV1","maxT","acInToAcP",
  "acInC","sInC1","acOutAppP","acInV","acInF","acOutPP","innT","status0","status1","acOutToP","bP","totGenE","genEnH","genEnD","genEnM","genEnY","saveT",
  "dateHourE","dateDayE","dateMonE","dateYearE","con1","con2","con3","con4","sysTime"
]; 
const bmsProfile = [
  "vM","v1","v2","v3","v4","v5","v6","v7","v8","v9","v10","v11","v12","v13","v14","v15",
  "v16","tN","t1","t2","t3","t4","t5","t6","t7","t8","t9","t10","t11","t12","t13","t14",
  "t15","t16","tA","tV","sAh","tAh","cycle","soc","soh","equal","humidity",
  "vMWarn","v1Warn","v2Warn","v3Warn","v4Warn","v5Warn","v6Warn","v7Warn","v8Warn","v9Warn","v10Warn","v11Warn","v12Warn","v13Warn","v14Warn","v15Warn",
  "v16Warn","tNWarn","t1Warn","t2Warn","t3Warn","t4Warn","t5Warn","t6Warn","t7Warn","t8Warn","t9Warn","t10Warn","t11Warn","t12Warn","t13Warn","t14Warn",
  "t15Warn","t16Warn","tAWarn","tVWarn","totWarn"
]; 
// const plcProfile = [
//   "p1","p2","p3","p4","p5","p6","p7","p8","p9","p10","p11","p12","p13","p14","p15","p16"
// ];
// const mpptProfile = [
//   "p1","p2","p3","p4","p5","p6","p7","p8","p9","p10","p11","p12","p13","p14",
//   "p15","p16","p17","p18","p19","p20","p21","p22","p23","p24","p25","p26","p27","p28"
// ];
// const inverterProfile = [
//   "p1","p2","p3","p4","p5","p6","p7","p8","p9","p10","p11","p12","p13","p14",
//   "p15","p16","p17","p18","p19","p20","p21","p22"
// ];
// const powermeterProfile = [
//   "p1","p2","p3","p4","p5","p6","p7","p8","p9"
// ];

const initialDeviceState = {
  pcs: [
    {
      id: 1,
      error0: '0',
      error1: '0',
      wMode: '0',
      bV: '0',
      bT: '0',
      acInAcP: '0',
      acOutV: '0',
      acOutAcP: '0',
      acOutF: '0',
      acOutC: '0',
      bCap: '0',
      sInP1: '0',
      bC: '0',
      sInV1: '0',
      maxT: '0',
      acInToAcP: '0',
      acInC: '0',
      sInC1: '0',
      acOutAppP: '0',
      acInV: '0',
      acInF: '0',
      acOutPP: '0',
      innT: '0',
      status0: '0',
      status1: '0',
      acOutToP: '0',
      bP: '0',
      totGenE: '0',
      genEnH: '0',
      genEnD: '0',
      genEnM: '0',
      genEnY: '0',
      saveT: '0',
      dateHourE: '0',
      dateDayE: '0',
      dateMonE: '0',
      dateYearE: '0',
      con1: '0',
      con2: '0',
      con3: '0',
      con4: '0',
      sysTime: '0'
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
      vM: '0', v1: '0', v2: '0', v3: '0', v4: '0', v5: '0', v6: '0', v7: '0', v8: '0', v9: '0', v10: '0', v11: '0', v12: '0', v13: '0', v14: '0', v15: '0', v16: '0',
      tN: '0', t1: '0', t2: '0', t3: '0', t4: '0', t5: '0', t6: '0', t7: '0', t8: '0', t9: '0', t10: '0', t11: '0', t12: '0', t13: '0', t14: '0', t15: '0', t16: '0',
      tA: '0',
      tV: '0',
      sAh: '0',
      tAh: '0',
      cycle: '0',
      soc: '0',
      soh: '0',
      equal: '0',
      humidity: '0',
      vMWarn: '0', v1Warn: '0', v2Warn: '0', v3Warn: '0', v4Warn: '0', v5Warn: '0', v6Warn: '0', v7Warn: '0', v8Warn: '0', v9Warn: '0', v10Warn: '0', v11Warn: '0', v12Warn: '0', v13Warn: '0', v14Warn: '0', v15Warn: '0', v16Warn: '0',
      tNWarn: '0', t1Warn: '0', t2Warn: '0', t3Warn: '0', t4Warn: '0', t5Warn: '0', t6Warn: '0', t7Warn: '0', t8Warn: '0', t9Warn: '0', t10Warn: '0', t11Warn: '0', t12Warn: '0', t13Warn: '0', t14Warn: '0', t15Warn: '0', t16Warn: '0',
      tAWarn: '0',
      tVWarn: '0',
      totWarn: '0'
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
    case "sp4k":
      switch (action.property){
        case "error0":
          state.pcs[action.id - 1].error0 = action.payload;  
          return {
            ...state
          };
        case "error1":
          state.pcs[action.id - 1].error1 = action.payload;  
          return {
            ...state
          };
        case "wMode":
          state.pcs[action.id - 1].wMode = action.payload;  
          return {
            ...state
          };
        case "bV":
          state.pcs[action.id - 1].bV = action.payload;  
          // console.log("pcs p4: " + state.pcs[action.id - 1].abVoltage);
          return {
            ...state
          };
        case "bT":
          state.pcs[action.id - 1].bT = action.payload;  
          return {
            ...state
          };
        case "acInAcP":
          state.pcs[action.id - 1].acInAcP = action.payload;  
          return {
            ...state
          };
        case "acOutV":
          state.pcs[action.id - 1].acOutV = action.payload;  
          return {
            ...state
          };
        case "acOutAcP":
          state.pcs[action.id - 1].acOutAcP = action.payload;  
          return {
            ...state
          };
        case "acOutF":
          state.pcs[action.id - 1].acOutF = action.payload;  
          return {
            ...state
          };
        case "acOutC":
          state.pcs[action.id - 1].acOutC = action.payload;  
          return {
            ...state
          };
        case "bCap":
          state.pcs[action.id - 1].bCap = action.payload;  
          return {
            ...state
          };
        case "sInP1":
          state.pcs[action.id - 1].sInP1 = action.payload;  
          return {
            ...state
          };
        case "bC":
          state.pcs[action.id - 1].bC = action.payload;  
          return {
            ...state
          };
        case "sInV1":
          state.pcs[action.id - 1].sInV1 = action.payload;  
          return {
            ...state
          };
        case "maxT":
          state.pcs[action.id - 1].maxT = action.payload;  
          return {
            ...state
          };
        case "acInToAcP":
          state.pcs[action.id - 1].acInToAcP = action.payload;  
          return {
            ...state
          };
        case "acInC":
          state.pcs[action.id - 1].acInC = action.payload;  
          return {
            ...state
          };
        case "sInC1":
          state.pcs[action.id - 1].sInC1 = action.payload;  
          return {
            ...state
          };
        case "acOutAppP":
          state.pcs[action.id - 1].acOutAppP = action.payload;  
          return {
            ...state
          };
        case "acInV":
          state.pcs[action.id - 1].acInV = action.payload;  
          // console.log("pcs p4: " + state.pcs[action.id - 1].abVoltage);
          return {
            ...state
          };
        case "acInF":
          state.pcs[action.id - 1].acInF = action.payload;  
          return {
            ...state
          };
        case "acOutPP":
          state.pcs[action.id - 1].acOutPP = action.payload;  
          return {
            ...state
          };
        case "innT":
          state.pcs[action.id - 1].innT = action.payload;  
          return {
            ...state
          };
        case "status0":
          state.pcs[action.id - 1].status0 = action.payload;  
          return {
            ...state
          };
        case "status1":
          state.pcs[action.id - 1].status1 = action.payload;  
          return {
            ...state
          };
        case "acOutToP":
          state.pcs[action.id - 1].acOutToP = action.payload;  
          return {
            ...state
          };
        case "bP":
          state.pcs[action.id - 1].bP = action.payload;  
          return {
            ...state
          };
        case "totGenE":
          state.pcs[action.id - 1].totGenE = action.payload;  
          return {
            ...state
          };
        case "genEnH":
          state.pcs[action.id - 1].genEnH = action.payload;  
          return {
            ...state
          };
        case "genEnD":
          state.pcs[action.id - 1].genEnD = action.payload;  
          return {
            ...state
          };
        case "genEnM":
          state.pcs[action.id - 1].genEnM = action.payload;  
          return {
            ...state
          };
        case "genEnY":
          state.pcs[action.id - 1].genEnY = action.payload;  
          return {
            ...state
          };
        case "saveT":
          state.pcs[action.id - 1].saveT = action.payload;  
          return {
            ...state
          };
        case "dateHourE":
          state.pcs[action.id - 1].dateHourE = action.payload;  
          return {
            ...state
          };
        case "dateDayE":
          state.pcs[action.id - 1].dateDayE = action.payload;  
          return {
            ...state
          };
        case "dateMonE":
          state.pcs[action.id - 1].dateMonE = action.payload;  
          return {
            ...state
          };
        case "dateYearE":
          state.pcs[action.id - 1].dateYearE = action.payload;  
          return {
            ...state
          };
        case "con1":
          state.pcs[action.id - 1].con1 = action.payload;  
          return {
            ...state
          };
        case "con2":
          state.pcs[action.id - 1].con2 = action.payload;  
          return {
            ...state
          };
        case "con3":
          state.pcs[action.id - 1].con3 = action.payload;  
          return {
            ...state
          };
        case "con4":
          state.pcs[action.id - 1].con4 = action.payload;  
          return {
            ...state
          };
        case "sysTime":
          state.pcs[action.id - 1].sysTime = action.payload;  
          return {
            ...state
          };
        default:
          throw new Error();
      }
    case "zdaf":
      switch (action.property){
        case "vM":
          state.bms[action.id - 1].vM = action.payload;  
          return {
            ...state
          };
        case "v1":
          state.bms[action.id - 1].v1 = action.payload;  
          return {
            ...state
          };
        case "v2":
          state.bms[action.id - 1].v2 = action.payload;  
          return {
            ...state
          };
        case "v3":
          state.bms[action.id - 1].v3 = action.payload;  
          return {
            ...state
          };
        case "v4":
          state.bms[action.id - 1].v4 = action.payload;  
          return {
            ...state
          };
        case "v5":
          state.bms[action.id - 1].v5 = action.payload;  
          return {
            ...state
          };
        case "v6":
          state.bms[action.id - 1].v6 = action.payload;  
          return {
            ...state
          };
        case "v7":
          state.bms[action.id - 1].v7 = action.payload;  
          return {
            ...state
          };
        case "v8":
          state.bms[action.id - 1].v8 = action.payload;  
          return {
            ...state
          };
        case "v9":
          state.bms[action.id - 1].v9 = action.payload;  
          return {
            ...state
          };
        case "v10":
          state.bms[action.id - 1].v10 = action.payload;  
          return {
            ...state
          };
        case "v11":
          state.bms[action.id - 1].v11 = action.payload;  
          return {
            ...state
          };
        case "v12":
          state.bms[action.id - 1].v12 = action.payload;  
          return {
            ...state
          };
        case "v13":
          state.bms[action.id - 1].v13 = action.payload;  
          return {
            ...state
          };
        case "v14":
          state.bms[action.id - 1].v14 = action.payload;  
          return {
            ...state
          };
        case "v15":
          state.bms[action.id - 1].v15 = action.payload;  
          return {
            ...state
          };
        case "v16":
          state.bms[action.id - 1].v16 = action.payload;  
          return {
            ...state
          };
        case "tN":
          state.bms[action.id - 1].tN = action.payload;  
          return {
            ...state
          };
        case "t1":
          state.bms[action.id - 1].t1 = action.payload;  
          return {
            ...state
          };
        case "t2":
          state.bms[action.id - 1].t2 = action.payload;  
          return {
            ...state
          };
        case "t3":
          state.bms[action.id - 1].t3 = action.payload;  
          return {
            ...state
          };
        case "t4":
          state.bms[action.id - 1].t4 = action.payload;  
          return {
            ...state
          };
        case "t5":
          state.bms[action.id - 1].t5 = action.payload;  
          return {
            ...state
          };
        case "t6":
          state.bms[action.id - 1].t6 = action.payload;  
          return {
            ...state
          };
        case "t7":
          state.bms[action.id - 1].t7 = action.payload;  
          return {
            ...state
          };
        case "t8":
          state.bms[action.id - 1].t8 = action.payload;  
          return {
            ...state
          };
        case "t9":
          state.bms[action.id - 1].t9 = action.payload;  
          return {
            ...state
          };
        case "t10":
          state.bms[action.id - 1].t10 = action.payload;  
          return {
            ...state
          };
        case "t11":
          state.bms[action.id - 1].t11 = action.payload;  
          return {
            ...state
          };
        case "t12":
          state.bms[action.id - 1].t12 = action.payload;  
          return {
            ...state
          };
        case "t13":
          state.bms[action.id - 1].t13 = action.payload;  
          return {
            ...state
          };
        case "t14":
          state.bms[action.id - 1].t14 = action.payload;  
          return {
            ...state
          };
        case "t15":
          state.bms[action.id - 1].t15 = action.payload;  
          return {
            ...state
          };
        case "t16":
          state.bms[action.id - 1].t16 = action.payload;  
          return {
            ...state
          };
        case "tA":
          state.bms[action.id - 1].tA = action.payload;  
          return {
            ...state
          };
        case "tV":
          state.bms[action.id - 1].tV = action.payload;  
          return {
            ...state
          };
        case "sAh":
          state.bms[action.id - 1].sAh = action.payload;  
          return {
            ...state
          };
        case "tAh":
          state.bms[action.id - 1].tAh = action.payload;  
          return {
            ...state
          };
        case "cycle":
          state.bms[action.id - 1].cycle = action.payload;  
          return {
            ...state
          };
        case "soc":
          state.bms[action.id - 1].soc = action.payload;  
          return {
            ...state
          };
        case "soh":
          state.bms[action.id - 1].soh = action.payload;  
          return {
            ...state
          };
        case "equal":
          state.bms[action.id - 1].equal = action.payload;  
          return {
            ...state
          };
        case "humidity":
          state.bms[action.id - 1].humidity = action.payload;  
          return {
            ...state
          };
        case "vMWarn":
          state.bms[action.id - 1].vMWarn = action.payload;  
          return {
            ...state
          };
        case "v1Warn":
          state.bms[action.id - 1].v1Warn = action.payload;  
          return {
            ...state
          };
        case "v2Warn":
          state.bms[action.id - 1].v2Warn = action.payload;  
          return {
            ...state
          };
        case "v3Warn":
          state.bms[action.id - 1].v3Warn = action.payload;  
          return {
            ...state
          };
        case "v4Warn":
          state.bms[action.id - 1].v4Warn = action.payload;  
          return {
            ...state
          };
        case "v5Warn":
          state.bms[action.id - 1].v5Warn = action.payload;  
          return {
            ...state
          };
        case "v6Warn":
          state.bms[action.id - 1].v6Warn = action.payload;  
          return {
            ...state
          };
        case "v7Warn":
          state.bms[action.id - 1].v7Warn = action.payload;  
          return {
            ...state
          };
        case "v8Warn":
          state.bms[action.id - 1].v8Warn = action.payload;  
          return {
            ...state
          };
        case "v9Warn":
          state.bms[action.id - 1].v9Warn = action.payload;  
          return {
            ...state
          };
        case "v10Warn":
          state.bms[action.id - 1].v10Warn = action.payload;  
          return {
            ...state
          };
        case "v11Warn":
          state.bms[action.id - 1].v11Warn = action.payload;  
          return {
            ...state
          };
        case "v12Warn":
          state.bms[action.id - 1].v12Warn = action.payload;  
          return {
            ...state
          };
        case "v13Warn":
          state.bms[action.id - 1].v13Warn = action.payload;  
          return {
            ...state
          };
        case "v14Warn":
          state.bms[action.id - 1].v14Warn = action.payload;  
          return {
            ...state
          };
        case "v15Warn":
          state.bms[action.id - 1].v15Warn = action.payload;  
          return {
            ...state
          };
        case "v16Warn":
          state.bms[action.id - 1].v16Warn = action.payload;  
          return {
            ...state
          };
        case "tNWarn":
          state.bms[action.id - 1].tNWarn = action.payload;  
          return {
            ...state
          };
        case "t1Warn":
          state.bms[action.id - 1].t1Warn = action.payload;  
          return {
            ...state
          };
        case "t2Warn":
          state.bms[action.id - 1].t2Warn = action.payload;  
          return {
            ...state
          };
        case "t3Warn":
          state.bms[action.id - 1].t3Warn = action.payload;  
          return {
            ...state
          };
        case "t4Warn":
          state.bms[action.id - 1].t4Warn = action.payload;  
          return {
            ...state
          };
        case "t5Warn":
          state.bms[action.id - 1].t5Warn = action.payload;  
          return {
            ...state
          };
        case "t6Warn":
          state.bms[action.id - 1].t6Warn = action.payload;  
          return {
            ...state
          };
        case "t7Warn":
          state.bms[action.id - 1].t7Warn = action.payload;  
          return {
            ...state
          };
        case "t8Warn":
          state.bms[action.id - 1].t8Warn = action.payload;  
          return {
            ...state
          };
        case "t9Warn":
          state.bms[action.id - 1].t9Warn = action.payload;  
          return {
            ...state
          };
        case "t10Warn":
          state.bms[action.id - 1].t10Warn = action.payload;  
          return {
            ...state
          };
        case "t11Warn":
          state.bms[action.id - 1].t11Warn = action.payload;  
          return {
            ...state
          };
        case "t12Warn":
          state.bms[action.id - 1].t12Warn = action.payload;  
          return {
            ...state
          };
        case "t13Warn":
          state.bms[action.id - 1].t13Warn = action.payload;  
          return {
            ...state
          };
        case "t14Warn":
          state.bms[action.id - 1].t14Warn = action.payload;  
          return {
            ...state
          };
        case "t15Warn":
          state.bms[action.id - 1].t15Warn = action.payload;  
          return {
            ...state
          };
        case "t16Warn":
          state.bms[action.id - 1].t16Warn = action.payload;  
          return {
            ...state
          };
        case "tAWarn":
          state.bms[action.id - 1].tAWarn = action.payload;  
          return {
            ...state
          };
        case "tVWarn":
          state.bms[action.id - 1].tVWarn = action.payload;  
          return {
            ...state
          };
        case "totWarn":
          state.bms[action.id - 1].totWarn = action.payload;  
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
        // for (const plc of device.plc) {
        //   for (const property of plcProfile){
        //     mqttSub(plc, property);
        //   }
        // }
        // for (const mppt of device.mppt) {
        //   for (const property of mpptProfile){
        //     mqttSub(mppt, property);
        //   }
        // }
        // for (const inverter of device.inverter) {
        //   for (const property of inverterProfile){
        //     mqttSub(inverter, property);
        //   }
        // }
        // for (const powermeter of device.powermeter) {
        //   for (const property of powermeterProfile){
        //     mqttSub(powermeter, property);
        //   }
        // }
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
      <MqttContext.Provider value={[state, dispatch, stateDevice, dispatchDevice, mqttPublish]}>
        {children}
      </MqttContext.Provider>
    </>
  );
};

export default MqttContext;