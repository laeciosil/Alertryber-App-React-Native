import React, { useEffect, useState } from "react";
import ReactNativeAN from '../../react-native-alarm-notification';

import { Container, Time, Hour, Date, Button, Title } from "./styles";

interface IProps  {
  id: string;
  hour: string;
  minute: string;
  day: string;
  month: string;
  year: string;
  
}
interface IDataProps {
  data: IProps;
}
export function AlarmItem({data}: IDataProps) {
  const [hourFormatted, setHourFormatted] = useState('');
  function handleRemoveAlarm(id: string) {
   ReactNativeAN.deleteAlarm(Number(id));
  }
 
  useEffect(() => {
    let hour = '';
    if(+data.hour < 10 && +data.minute < 10){
      hour =`0${data.hour}:0${data.minute }`;
    }else if(+data.hour < 10 && +data.minute > 9){
     hour =`0${data.hour}:${data.minute}`;
    }else if(+data.hour >= 10 && +data.minute <= 9){
      hour =`${data.hour}:0${data.minute}`;
     }else {
      hour= `${data.hour}:${data.minute}`;
    }
    setHourFormatted(hour);
    
  }, []);
 
  return(
    <Container>
      <Time>
        <Hour>{hourFormatted}</Hour>
        <Date>{`${data.day}/${data.month}/${data.year}`}</Date>
      </Time>
      <Button onPress={() => handleRemoveAlarm(data.id)}>
        <Title>Cancelar</Title>
      </Button>
    </Container>
  )
}