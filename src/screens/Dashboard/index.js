import React from 'react';
import { ListAlarms } from '../../components/ListAlarms';
import { TimePiker } from '../../components/TimePiker';
import ReactNativeAN from 'react-native-alarm-notification';

import {Container, Header, Logo, Content} from './styles';

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
        <Logo source={require('../../assets/logo.png')}/>
      </Header>
      <Content>
        <ListAlarms/>
      </Content>
        <TimePiker/>
    </Container>
  );
}