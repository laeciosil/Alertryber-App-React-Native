import React, { useEffect, useState } from "react";
import ReactNativeAN from '../../react-native-alarm-notification';

import { 
  Container, 
  Header, 
  Content,
  Time, 
  Hour, 
  Date, 
  Button, 
  Title,
  TitleButton,
} from "./styles";

interface IProps  {
  id: string;
  hour: string;
  minute: string;
  day: string;
  month: string;
  year: string;
  message: string;
  
}
interface IDataProps {
  data: IProps;
}
export function AlarmItem({data}: IDataProps) {
  const [hourFormatted, setHourFormatted] = useState('');

  function handleRemoveAlarm(id: string) {
   ReactNativeAN.deleteAlarm(Number(id));
  }

  function formattedHour() {
    let hour = '';
    let minute = '';
    if (data.hour <='9') hour = `0${data.hour}`;
    else hour = data.hour;
    if (data.minute <='9') minute = `0${data.minute}`;
    else minute = data.minute;

    setHourFormatted(`${hour}:${minute}`);
  }

  
 
  useEffect(() => {
    formattedHour();
  }, []);

  const [moment ,] = data.message.split('vai');
  
  return(
    <Container>
      <Header>
        <Title>{moment}</Title>
      </Header>
      <Content>
        <Time>
          <Hour>{hourFormatted}</Hour>
          <Date>{`${data.day}/${data.month}/${data.year}`}</Date>
        </Time>
        <Button onPress={() => handleRemoveAlarm(data.id)}>
          <TitleButton>Cancelar</TitleButton>
        </Button>
      </Content>
    </Container>
  )
}