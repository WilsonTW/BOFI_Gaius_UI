//provider.js
import React, { useEffect, useReducer, useState } from "react";
import Content from "./content";
import { CatStateContext } from "./context";
import Connection from './MqttConnection';
import mqtt from 'mqtt';

const initialState = {
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
  startCatchMouse: false
};
const initialStateMqtt = {
    valueTest: 111,
    connectStatus: "null",
    mqttPayload: "null",
    isSubed: false,
    mqttClient: "null"
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
const record = {
    topic: 'testtopic/react',
    qos: 1,
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
        valueTest: action.payload
      };
    case "CONNSTAT":
      return {
        connectStatus: action.payload
      };
    case "PAYLOAD":
      return {
        ...state,
        mqttPayload: action.payload
      };
    case "SETSUB":
      return {
        isSubed: action.payload
      };
    default:
      throw new Error();
  }
};

export const ProviderContext = () => {
  const [client, setClient] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [state1, dispatch1] = useReducer(reducer, initialStateMqtt);
  const mqttConnect = (host, mqttOption) => {
    // setConnectStatus('Connecting');
    // dispatch({
    //   type: "CONNSTAT",
    //   payload: "Connecting"
    // });
    setClient(mqtt.connect(host, mqttOption));
  };

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        // setConnectStatus('Connect');
        // dispatch({
        //   type: "CONNSTAT",
        //   payload: "Connect"
        // });
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

  const mqttSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        // dispatch({
        //   type: "SETSUB",
        //   payload: true
        // });
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
        // dispatch({
        //   type: "SETSUB",
        //   payload: false
        // });
      });
    }
  };

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        // setConnectStatus('Connected');
        // dispatch({
        //   type: "CONNSTAT",
        //   payload: "Connected"
        // });
        mqttSub(record);
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        // setConnectStatus('Reconnecting');
        // dispatch({
        //   type: "CONNSTAT",
        //   payload: "Reconnecting"
        // });
      });
      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() };
        // setPayload(payload);
        dispatch1({
          type: "PAYLOAD",
          payload: message.toString()
        });
      });
    }
  }, [client]);
  return (
    <>
    <CatStateContext.Provider value={[state, dispatch, state1, dispatch]}>
      <Content />
    </CatStateContext.Provider>
    <Connection connect={mqttConnect} disconnect={mqttDisconnect} />
    </>
  );
};
