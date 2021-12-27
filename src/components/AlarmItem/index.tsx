import React, { useEffect, useState } from "react";
import ReactNativeAN from '../../react-native-alarm-notification';
import { zeroInLessTen } from "../../services/zeroInLessTen";

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
  hour: number;
  minute: number;
  day: number;
  month: number;
  year: number;
  message: string;
  
}
interface IDataProps {
  data: IProps;
}
export function AlarmItem({data}: IDataProps) {

  function handleRemoveAlarm(id: string) {
   ReactNativeAN.deleteAlarm(Number(id));
  }

  const [moment ,] = data.message.split('vai');
  const date = `${zeroInLessTen(data.day)}/${zeroInLessTen(data.month)}/${data.year}`;
  const hour = `${zeroInLessTen(data.hour)}:${zeroInLessTen(data.minute)}`;
  
  return(
    <Container>
      <Header>
        <Title>{moment}</Title>
      </Header>
      <Content>
        <Time>
          <Hour>{hour}</Hour>
          <Date>{date}</Date>
        </Time>
        <Button onPress={() => handleRemoveAlarm(data.id)}>
          <TitleButton>Cancelar</TitleButton>
        </Button>
      </Content>
    </Container>
  )
}