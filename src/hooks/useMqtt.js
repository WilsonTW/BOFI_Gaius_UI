import { useContext } from 'react';
import MqttContext from 'src/contexts/MqttContext';

const useMqtt = () => useContext(MqttContext);

export default useMqtt;
