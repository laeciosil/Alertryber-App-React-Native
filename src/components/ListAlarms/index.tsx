import React, { useState } from "react";
import ReactNativeAN from '../../react-native-alarm-notification';
import { zeroInLessTen } from "../../services/zeroInLessTen";

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

  async function listAllAlarms() {
    const alarmsList = await ReactNativeAN.getScheduledAlarms();
    
    //Remove automaticamente o alarme uma hora depois de disparar.
    alarmsList.forEach((alarm: IDataProps )=> {
      const dateAlarm = new Date(`${alarm.year}-${zeroInLessTen(alarm.month)}-${zeroInLessTen(alarm.day)}T${zeroInLessTen(alarm.hour + 4)}:${zeroInLessTen(alarm.minute)}:00.000Z`);
      const dateNow = new Date();
      
      if(dateAlarm < dateNow){
        ReactNativeAN.deleteAlarm(Number(alarm.id));
      }
    });
    
   setAlarms(await ReactNativeAN.getScheduledAlarms());
  }
  listAllAlarms();
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