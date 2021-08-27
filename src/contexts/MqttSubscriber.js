import React, { useContext, useEffect } from 'react';
// import { Card, Form, Input, Row, Col, Button, Select } from 'antd';
import { MqttContext } from './MqttContext'

const Subscriber = ({ sub, unSub }) => {
  // const [form] = Form.useForm();
  const qosOptions = useContext(MqttContext);

  const record = {
    topic: 'testtopic/react',
    qos: 1,
  };

  const onFinish = (values) => {
    sub(values);
  };

  const handleUnsub = () => {
    const values = record.topic;
    unSub(values);
  };

  useEffect(() =>{
    onFinish(record);
    // console.log("subscribe:"+ record.topic + record.qos);
  },[]);
  // const SubForm = (
  //   <Form
  //     layout="vertical"
  //     name="basic"
  //     form={form}
  //     initialValues={record}
  //     onFinish={onFinish}
  //   >
  //     <Row gutter={20}>
  //       <Col span={12}>
  //         <Form.Item
  //           label="Topic"
  //           name="topic"
  //         >
  //           <Input />
  //         </Form.Item>
  //       </Col>
  //       <Col span={12}>
  //         <Form.Item
  //           label="QoS"
  //           name="qos"
  //         >
  //           <Select options={qosOptions} />
  //         </Form.Item>
  //       </Col>
  //       <Col span={8} offset={16} style={{ textAlign: 'right' }}>
  //         <Form.Item>
  //           <Button type="primary" htmlType="submit">
  //             Subscribe
  //           </Button>
  //           {
  //             showUnsub ?
  //               <Button type="danger" style={{ marginLeft: '10px' }} onClick={handleUnsub}>
  //                 Unsubscribe
  //               </Button>
  //               : null
  //           }
  //         </Form.Item>
  //       </Col>
  //     </Row>
  //   </Form>
  // )

  return (
    // <Card
    //   title="Subscriber"
    // >
    //   {SubForm}
    // </Card>
     <>
     </>
  );
}

export default Subscriber;
