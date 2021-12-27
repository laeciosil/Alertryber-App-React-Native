import React, { useState } from "react";
import ReactNativeAN from '../../react-native-alarm-notification';

import { AlarmItem } from "../AlarmItem";
import {Container, AlarmList} from "./styles";

interface IDataProps  {
  id: string;
  hour: number;
  minute: number;
  day: number;
  month: number;
  year: number;
  message: string;
  
}


export function ListAlarms() {
  const [alarms, setAlarms] = useState<IDataProps[]>([]);
  async function listAllAlarm() {
   setAlarms(await ReactNativeAN.getScheduledAlarms());
  }
  listAllAlarm();
  return (
    <Container>
     <AlarmList 
      data={alarms}
      keyExtractor={item => item.id}
      renderItem={({item}) => <AlarmItem data={item}/>}
      />
    </Container>
  );
}