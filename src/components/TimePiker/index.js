import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ReactNativeAN from '../../react-native-alarm-notification';
//import AsyncStorage from '@react-native-async-storage/async-storage';

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
    
    try {
     const alarm = await ReactNativeAN.scheduleAlarm({fire_date: fireDate},  messageAlarm);
      console.log('alarm', alarm);
    } catch (error) {
      console.log('Failed to schedule alarm: ', error);
    }

    hideDateTimePicker();
  };
  }

  function handleHourPikedUser(datePiked) {
    let minutes = datePiked.getMinutes();
    let hours = datePiked.getHours() + 3; // +3 to Brazil time
    
    if (minutes <= 9) {
      minutes = `5${minutes}`;
      hours -= 1;
    } else{
      minutes -= 10;
    }

    if(minutes <= 9){
     minutes = `0${minutes}`;
    }

    const hourAlarm = `${hours}${minutes}`;
    
    console.log('hourAlarm', hourAlarm);
    if(msgAlarm === 'Aula ao vivo vai começar!' && (hourAlarm > 1830 && hourAlarm < 1930)){
      addAlarm();
    }else {
      Alert.alert(
        'Hora fora do padrão de 15h30 até 16h30!',
        'Realmente deseja adicionar!',
        [
          {text: 'Não',  onPress: () => {handleOptions()}},
          {text: 'Sim', onPress: () => {addAlarm(), handleOptions()}},
        ],
        
      );
    }

    if(msgAlarm === 'Fechamento vai começar!' && (hourAlarm > 2200 && hourAlarm < 2300)){
      addAlarm();
    }else{
      Alert.alert(
        'Hora fora do padrão de 19h00 até 20h00!',
        'Realmente deseja adicionar!',
        [
          {text: 'Não',  onPress: () => {handleOptions()}},
          {text: 'Sim', onPress: () => {addAlarm(), handleOptions()}},
        ],
      );
      
    }
    
    function addAlarm() {
        const date = `${datePiked.getFullYear()}-${datePiked.getMonth() + 1}-${datePiked.getDate()}T${hours}:${minutes}:00.000Z`;
      const currentDate = Date.now();
      const alarmDate = new Date(date);
      console.log(alarmDate)
      const fireDate = ReactNativeAN.parseDate(alarmDate);
    
      if(alarmDate.getTime() < currentDate){
        Alert.alert('Não é possível agendar uma data anterior a data atual🤨');
        hideDateTimePicker();
        return; 
      }
     handleCreateAlarm(fireDate, msgAlarm);

    }
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
  

  async function handleOptions(){
     //21-12-2021 08:27:0
     const date = new Date();
     const currentDate = Date.now();
     const alarmDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;
     
      //hora no formato iso.
     const initialTechnicalMentoring = new Date(`${alarmDate}T15:50:00.000Z`)//12:50:00
     const initialMoment = new Date(`${alarmDate}T16:50:00.000Z`)//13:50:00
     const liveClass =  new Date(`${alarmDate}T19:10:00.000Z`)//16:10:00
     const finalTechnicalMentoring = new Date(`${alarmDate}T21:20:00.000Z`)//18:20:00
     const closingDay =  new Date(`${alarmDate}T22:20:00.000Z`)//19:20:00
    
    const alarmList = await ReactNativeAN.getScheduledAlarms();

    initialMentoringAlert();

    function initialMentoringAlert(){
      const message = 'A mentoria das 13h00 vai começar!';
      const alarmFind = alarmList.find(alarm => alarm.message === message);

      if(initialTechnicalMentoring.getTime() < currentDate || alarmFind){
       initialMomentAlert()
      }else{
        Alert.alert("Mentorias Técnicas das 13h00", "Deseja adicionar?", 
        [
        {text: "Não", onPress: () => {initialMomentAlert()}},
        {text: "Sim", onPress: () => {verifyDate(initialTechnicalMentoring, message), initialMomentAlert()}},
        ]
      );
      }
    }
    function initialMomentAlert () {
      const message = 'Momento inicial vai começar!';
      const alarmFind = alarmList.find(alarm => alarm.message === message);
      if(initialMoment.getTime() < currentDate || alarmFind){
        liveClassAlert();
      }else{
      
      verifyDate(initialMoment, message);
      liveClassAlert();
      }
    };
    function liveClassAlert() {
      const message = 'Aula ao vivo vai começar!';
      const alarmFind = alarmList.find(alarm => alarm.message === message);
      if(liveClass.getTime() < currentDate || alarmFind){
        finalMentoringAlert();
      }else{
     
      Alert.alert("Aula ao vivo", "Aula ao vivo começa às 16:20?", 
      [
      {text: "Não", onPress: () => {verifyDate('', message), finalMentoringAlert()}},
      {text: "Sim", onPress: () => {verifyDate(liveClass, message), finalMentoringAlert()}},
      ]
      );
    }
    }
    function finalMentoringAlert()  {
      const message = 'A mentoria das 18h30  vai começar!';
      const alarmFind = alarmList.find(alarm => alarm.message === message);
      
      if(finalTechnicalMentoring.getTime() < currentDate || alarmFind){
        closingDayAlert();
      }else{
        Alert.alert("Mentorias Técnicas 18h30", "Deseja adicionar?", 
        [
          {text: "Não", onPress: () => closingDayAlert()},
            {text: "Sim", onPress: () =>{verifyDate(finalTechnicalMentoring, message), closingDayAlert()}}
        ]);
      }
     }
     
     function closingDayAlert()  {
       const message = 'Fechamento vai começar!';
       const alarmFind = alarmList.find(alarm => alarm.message === message);
      if(alarmFind){
        Alert.alert("Tudo certo tryber!", "Agenda ok, #VQV!")
      } else if(closingDay.getTime() < currentDate){
        Alert.alert("Tarde demais tryber🙃", "Bom descanso!") 
      }else{
        
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
      <Button onPress={handleOptions}>
        <Title>Criar agenda do dia</Title>
      </Button>
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={handleHourPikedUser}
        onCancel={hideDateTimePicker}
        mode="time"
        is24Hour={true}
      />
    </Container>
  );
}
