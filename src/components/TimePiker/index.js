import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ReactNativeAN from 'react-native-alarm-notification';

import { 
  Container, 
  Button, 
  Title 
} from './styles';

export function TimePiker() {
  const [isDateTimePickerVisible, setDateTimePickerVisibility] = useState(false);
  const [msgAlarm, setMsgAlarm] = useState('');
  function showDateTimePicker(){
    setDateTimePickerVisibility(true);
  };

  function hideDateTimePicker(){
    setDateTimePickerVisibility(false);
  };

  async function handleCreateAlarm(fireDate, messageAlarm){ {
    

    const alarmNotifData = {
      channel: 'alarm-channel', 
      ticker: 'My Notification Ticker',
      auto_cancel: false, 
      vibrate: true,
      hasButton: true,
      loop_sound: true, 
      vibration: 100,
      small_icon: 'ic_launcher', 
      large_icon: 'ic_launcher',
      play_sound: true,
      sound_name: null, 
      color: 'red',
      schedule_once: true,
      tag: 'some_tag',
      
    };
    try {
     const alarm = await ReactNativeAN.scheduleAlarm({alarmNotifData, fire_date: fireDate},  messageAlarm);
      console.log('alarm', alarm);
    } catch (error) {
      console.log('Failed to schedule alarm: ', error);
    }

    hideDateTimePicker();
  };
  }

  function handleHourPiked(datePiked) {
   const fireDate = ReactNativeAN.parseDate(datePiked);
   const currentDate = Date.now();

    if(datePiked.getTime() < currentDate){
      Alert.alert('Não é possível agendar uma data anterior a data atual🤨');
      hideDateTimePicker();
      return; 
    }
   handleCreateAlarm(fireDate, msgAlarm);

  }

  function verifyDate(datePiked, message ) {
    let messageAlarm = message;
   
    if(datePiked === ''){
     
      setMsgAlarm(messageAlarm);
      showDateTimePicker()
     
    } else {
      const fireDate = ReactNativeAN.parseDate(datePiked);
      handleCreateAlarm(fireDate, messageAlarm);
    }
    
  }
  

   function HandleOptions(){
     //21-12-2021 08:27:0
     const date = new Date();
     const alarmDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
     
 
     const initialTechnicalMentoring = new Date(`${alarmDate}T15:49:00.000Z`)
     const initialMoment = new Date(`${alarmDate}T16:49:00.000Z`)
     const liveClass =  new Date(`${alarmDate}T19:09:00.000Z`)
     const finalTechnicalMentoring = new Date(`${alarmDate}T21:20:00.000Z`)
     const closingDay =  new Date(`${alarmDate}T22:19:00.000Z`)
    
    const currentDate = Date.now();

    initialMentoringAlert();
    
    function initialMentoringAlert(){
      
      if(initialTechnicalMentoring.getTime() < currentDate){
       initialMomentAlert()
      }else{
        const message = 'A mentoria vai começar!';
        Alert.alert("Mentorias Técnicas das 13h00", "Deseja adicionar?", 
        [
        {text: "Não", onPress: () => {verifyDate('', message), initialMomentAlert()}},
        {text: "Sim", onPress: () => {verifyDate(initialTechnicalMentoring, message), initialMomentAlert()}},
        ]
      );
      }
    }
    function initialMomentAlert () {
      if(initialMoment.getTime() < currentDate){
        liveClassAlert();
      }else{
      const message = 'Momento inicial vai começar!';
      verifyDate(initialMoment, message);
      liveClassAlert();
      }
    };
    function liveClassAlert() {
      if(liveClass.getTime() < currentDate){
        finalMentoringAlert();
      }else{
      const message = 'Aula ao vivo vai começar!';
      Alert.alert("Aula ao vivo", "Aula ao vivo começa às 16:20?", 
      [
      {text: "Não", onPress: () => {verifyDate('', message), finalMentoringAlert()}},
      {text: "Sim", onPress: () => {verifyDate(liveClass, message), finalMentoringAlert()}},
      ]
      );
    }
    }
    function finalMentoringAlert()  {
      if(finalTechnicalMentoring.getTime() < currentDate){
        closingDayAlert();
      }else{
        const message = 'A mentoria vai começar!';
        Alert.alert("Mentorias Técnicas 18h30", "Deseja adicionar?", 
        [
          {text: "Não", onPress: () => closingDayAlert()},
            {text: "Sim", onPress: () =>{verifyDate(finalTechnicalMentoring, message), closingDayAlert()}}
        ]);
      }
     }
     
     function closingDayAlert()  {
      if(closingDay.getTime() < currentDate){
        Alert.alert("Tarde demais🙃", "Bom descanso!") 
      }else{
        const message = 'Fechamento vai começar!';
        Alert.alert("Encerramento", "Encerramento começa às 19h30?", 
        [
        {text: "Não", onPress: () => verifyDate('', message)},
        {text: "Sim", onPress: () => verifyDate(closingDay, message)},
        ]);
     }
     } 

    
    
  }
 

  return (
    <Container>
      <Button onPress={HandleOptions}>
        <Title>Criar agenda do dia</Title>
      </Button>
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={handleHourPiked}
        onCancel={hideDateTimePicker}
        mode="time"
        is24Hour={true}
      />
    </Container>
  );
}
