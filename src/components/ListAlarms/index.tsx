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
    const alarmsList = await ReactNativeAN.getScheduledAlarms();
    
    alarmsList.forEach((alarm: IDataProps )=> {
      //Remove automaticamente o alarme 10 minutos depois de disparar.
      const dateAlarm = new Date(`${alarm.year}-${alarm.month}-${alarm.day}T${alarm.hour + 4}:${alarm.minute}:00.000Z`);
      const dateNow = new Date();

      if(dateAlarm < dateNow){
        ReactNativeAN.deleteAlarm(Number(alarm.id));
      }
    });
    
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