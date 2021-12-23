import React from 'react';
import { ListAlarms } from '../../components/ListAlarms';
import { CreateAlarms } from '../../components/CreateAlarms';
import {
  Container, 
  Header, 
  Logo, 
  Content} 
from './styles';

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