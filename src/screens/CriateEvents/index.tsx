import React from "react";
import { Alert } from "react-native";
import { create } from "react-test-renderer";

import {Container, Title, Button} from "./styles";
export function CreateEvents() {
  function HandleCreateSchedule(){
    Alert.alert("Mentorias Técnicas", "Deseja adicionar?", 
    [
      {text: "Não"},
      {text: "Sim"},
    ]);
    Alert.alert("Mentorias Técnicas", "Deseja adicionar?", 
    [
      {text: "Não"},
      {text: "Sim"},
    ]);
  }
  return (
    <Container>
        <Button onPress={HandleCreateSchedule}>
          <Title>Add</Title>
        </Button>
    </Container>
  )
}