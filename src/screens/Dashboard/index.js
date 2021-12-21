import React from 'react';
import { ListAlarms } from '../../components/ListAlarms';
import { TimePiker } from '../../components/TimePiker';
import ReactNativeAN from 'react-native-alarm-notification';

import {Container, Header, Text, Content} from './styles';

export function Dashboard() {

  async function handleAddAlarm() {
   
   
    const a = await ReactNativeAN.getScheduledAlarms();
    for (let i = 0; i < a.length; i++) {
      console.log('alarm', a[i],"\n");
    }
    
    

  }
  handleAddAlarm() 
  return (
    <Container>
      <Header>
        <Text>alertryber</Text>
      </Header>
      <Content>
        <ListAlarms/>
      </Content>
        <TimePiker/>
    </Container>
  );
}