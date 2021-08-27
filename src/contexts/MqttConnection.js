import React ,{ useEffect } from 'react';
import { Card, Button, Form, Input, Row, Col } from 'antd';

const Connection = ({ connect, disconnect }) => {
  // const [form] = Form.useForm();
  
  const record = {
    // host: '18.222.172.59',
    host: window.location.hostname,
    clientId: `mqttjs_` + `${Math.random().toString(16).substr(2, 8)}`,
    port: 8083,
  };

  const onFinish = () => {
    // const { host, clientId, port, username, password } = values;
    fetch("../../manifest.json")
    .then(res => res.json())
    .then((json) => {
      // console.log(json.mqtt_hostname);
      record.host = json.mqtt_hostname;
      record.port = json.mqtt_port;
      // console.log("onFinish: " + record.host + " " + record.port);
      const url = `ws://${record.host}:${record.port}/mqtt`;
      const options = {
        keepalive: 30,
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        will: {
          topic: 'WillMsg',
          payload: 'Connection Closed abnormally..!',
          qos: 0,
          retain: false
        },
        rejectUnauthorized: false
      };
      options.clientId = record.clientId;
      options.username = record.username;
      options.password = record.password;
      connect(url, options);
      });
  };

  // const handleConnect = () => {
  //   form.submit();
  // };

    const handleDisconnect = () => {
      disconnect();
  };

  useEffect(() =>{
    onFinish();
  },[]);
  // const ConnectionForm = (
  //   <Form
  //     layout="vertical"
  //     name="basic"
  //     form={form}
  //     initialValues={record}
  //     onFinish={onFinish}
  //   >
  //     <Row gutter={20}>
  //       <Col span={8}>
  //         <Form.Item
  //           label="Host"
  //           name="host"
  //         >
  //           <Input />
  //         </Form.Item>
  //       </Col>
  //       <Col span={8}>
  //         <Form.Item
  //           label="Port"
  //           name="port"
  //         >
  //           <Input />
  //         </Form.Item>
  //       </Col>
  //       <Col span={8}>
  //         <Form.Item
  //           label="Client ID"
  //           name="clientId"
  //         >
  //           <Input />
  //         </Form.Item>
  //       </Col>
  //       <Col span={8}>
  //         <Form.Item
  //           label="Username"
  //           name="username"
  //         >
  //           <Input />
  //         </Form.Item>
  //       </Col>
  //       <Col span={8}>
  //         <Form.Item
  //           label="Password"
  //           name="password"
  //         >
  //           <Input />
  //         </Form.Item>
  //       </Col>
  //     </Row>
  //   </Form>
  // )

  // return (
  //   <>
  //   // <Card
  //   //   title="Connection"
  //   //   actions={[
  //   //     <Button type="primary" onClick={handleConnect}>{connectBtn}</Button>,
  //   //     <Button danger onClick={handleDisconnect}>Disconnect</Button>
  //   //   ]}
  //   // >
  //   //   {ConnectionForm}
  //   // </Card>
  // );
  return (
    <>
    </>
  );
}

export default Connection;
