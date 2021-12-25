import React, { useState } from "react";
import ReactNativeAN from '../../react-native-alarm-notification';

import { AlarmItem } from "../AlarmItem";
import {Container, Text, AlarmList} from "./styles";
function handleRemoveAlarm(id: string) {
  ReactNativeAN.deleteAlarm(Number(id));
 }
interface IDataProps  {
  id: string;
  hour: string;
  day: string;
  date: string;
  month: string;
  year: string;
  minute: string;
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