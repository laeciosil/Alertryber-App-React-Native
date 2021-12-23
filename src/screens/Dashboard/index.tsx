import React, { useEffect } from 'react';
import { ListAlarms } from '../../components/ListAlarms';
import { CreateAlarms } from '../../components/CreateAlarms';
import ReactNativeAN from '../../react-native-alarm-notification';
import {
  Container, 
  Header, 
  Logo, 
  Content
}from './styles';

export function Dashboard() {

  return (
    <Container>
      <Header>
        <Logo source={require('../../assets/logo.png')}/>
      </Header>
      <Content>
        <ListAlarms/>
      </Content>
        <CreateAlarms/>
    </Container>
  );
}