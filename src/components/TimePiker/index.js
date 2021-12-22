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

export  function TimePiker() {
  const [isDateTimePickerVisible, setDateTimePickerVisibility] = useState(false);
  const [dateToday, setDateToday] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [dataAlarm, setDataAlarm] = useState({});
  
  useEffect(() => {
    const currentDate = new Date();
    const today = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate() + 1}`;
    setCurrentDate(currentDate.getTime());
    setDateToday(today);
  }, []);

 
  function showDateTimePicker(){
    setDateTimePickerVisibility(true);
  };

  function hideDateTimePicker(){
    setDateTimePickerVisibility(false);
  };

  async function handleCreateAlarm(isoDate, messageAlarm){ 
  
    const fireDate = ReactNativeAN.parseDate(isoDate);
    try {
     await ReactNativeAN.scheduleAlarm(
       {fire_date: fireDate},  
       messageAlarm
      );
    } catch (error) {
      console.log('Failed to schedule alarm: ', error);
    }

    hideDateTimePicker();
  };

  function minutesMinusTen(isoDate) {
    let minutes = isoDate.getMinutes();
    let hours = isoDate.getHours() + 3; // para compensar o fuso horário
    
    if (minutes <= 9) {
      minutes = `5${minutes}`;
      hours -= 1;
    } else{
      minutes -= 10;
    }

    if(minutes <= 9){
     minutes = `0${minutes}`;
    }

     return new Date(`${isoDate.getFullYear()}-${isoDate.getMonth() + 1}-${isoDate.getDate()}T${hours}:${minutes}:00.000Z`);
    
  }
  
  async function initialMentoringAlert(){
    const alarms = await ReactNativeAN.getScheduledAlarms()
    const initialMentoringData = {
      fireDate: new Date(`${dateToday}T15:50:00.000Z`),//12:50:00,
      message: 'A mentoria das 13h00 vai começar!'
    };
    const alarmFind = alarms.find(alarm => alarm.message === initialMentoringData.message);
    console.log('alarm', alarmFind);
    if(initialMentoringData.fireDate.getTime() < currentDate || alarmFind){
     initialMomentAlert();
    }else{
      Alert.alert("Mentorias Técnicas das 13h00", "Deseja adicionar?", 
      [
        {text: "Não", onPress: () => initialMomentAlert()},
        {text: "Sim", onPress: () => 
          {
            handleCreateAlarm(
              initialMentoringData.fireDate, 
              initialMentoringData.message),
              initialMomentAlert()
          }
        },
      ]
    );
    }
  };

  async function initialMomentAlert() {
    const alarms = await ReactNativeAN.getScheduledAlarms()
    const initialMomentData = {
     fireDate: new Date(`${dateToday}T16:50:00.000Z`),//13:50:00
     message: 'Momento inicial vai começar!',
    }
    const alarmFind = alarms.find(alarm => alarm.message === initialMomentData.message);
    if(initialMomentData.fireDate.getTime() < currentDate || alarmFind){
      liveClassAlert();
    }else{
      handleCreateAlarm(initialMomentData.fireDate, initialMomentData.message);
      liveClassAlert();
    }
  };

  async function liveClassAlert(datePiked) {
    const alarms = await ReactNativeAN.getScheduledAlarms()
    const liveClassData = {
      fireDate: datePiked || new Date(`${dateToday}T19:10:00.000Z`),//16:10:00
      message: 'Aula ao vivo vai começar!',
    }
    // if(hourAlarm > 1830 && hourAlarm < 1930){
    //   addAlarm();
    // }else {
    //   Alert.alert(
    //     'Hora fora do padrão de 15h30 até 16h30!',
    //     'Realmente deseja adicionar!',
    //     [
    //       {text: 'Não',  onPress: () => {handleOptions()}},
    //       {text: 'Sim', onPress: () => {addAlarm(), handleOptions()}},
    //     ],
        
    //   );
    // }
    if(datePiked){
      handleCreateAlarm(liveClassData.fireDate, liveClassData.message)
      finalMentoringAlert();
      return;
    }
    setDataAlarm(liveClassData);
    const alarmFind = alarms.find(alarm => alarm.message === liveClassData.message);
    if(liveClassData.fireDate.getTime() < currentDate || alarmFind){
       finalMentoringAlert();
    }else{
   
      Alert.alert("Aula ao vivo", "Aula ao vivo começa às 16:20?", 
        [
          {text: "Não", onPress: () => {showDateTimePicker()}},
          {text: "Sim", onPress: () => 
            {
            handleCreateAlarm(
              liveClassData.fireDate, 
              liveClassData.message
              ), 
              finalMentoringAlert()
            }
          },
        ]
      );
    }
  };

  async function finalMentoringAlert()  {
    const alarms = await ReactNativeAN.getScheduledAlarms()
    const finalMentoringData = {
     fireDate: new Date(`${dateToday}T21:20:00.000Z`),//18:20:00
     message: 'A mentoria das 18h20 vai começar!',
    }
    const alarmFind = alarms.find(alarm => alarm.message === finalMentoringData.message);
    
    if(finalMentoringData.fireDate.getTime() < currentDate || alarmFind){
      closingDayAlert();
    }else{
      Alert.alert("Mentorias Técnicas 18h30", "Deseja adicionar?", 
      [
        {text: "Não", onPress: () => closingDayAlert()},
          {text: "Sim", onPress: () =>{
            handleCreateAlarm(
              finalMentoringData.fireDate, 
              finalMentoringData.message
              ),
               closingDayAlert()
              }
          }
      ]);
    }
  };
   
  async function closingDayAlert(datePiked)  {
    
    const closingDayData = {
      fireDate:  datePiked || new Date(`${dateToday}T22:20:00.000Z`),//19:20:00
      message: 'Fechamento vai começar!',
    }
    if(datePiked){
      handleCreateAlarm(closingDayData.fireDate, closingDayData.message)
      Alert.alert("Tudo certo tryber!", "Agenda ok, #VQV!");
      return;
    }
    setDataAlarm(closingDayData);
    
      const alarms = await ReactNativeAN.getScheduledAlarms()
      const alarmFind = alarms.find(alarm => alarm.message === closingDayData.message);
        
      if(alarmFind){
          Alert.alert("Tudo certo tryber!", "Agenda ok, #VQV!")
      } else if(closingDayData.fireDate.getTime() < currentDate){
          Alert.alert("Tarde demais tryber🙃", "Bom descanso!") 
      }else{
          
          Alert.alert("Encerramento", "Encerramento começa às 19h30?", 
          [
          {text: "Não", onPress: () => showDateTimePicker()},
          {text: "Sim", onPress: () => handleCreateAlarm(closingDayData.fireDate, closingDayData.message)},
          ]);
      }
    
  } 
 
  function handleHourPikedUser(datePiked) {
    const a = minutesMinusTen(datePiked);
    console.log('a', a);
    hideDateTimePicker();
    if(dataAlarm.message === 'Aula ao vivo vai começar!'){
      liveClassAlert(a);
    }else{
      closingDayAlert(a)
    }
    
    
    // console.log('hourAlarm', hourAlarm);
    

    // if(msgAlarm === 'Fechamento vai começar!' && (hourAlarm > 2200 && hourAlarm < 2300)){
    //   addAlarm();
    // }else{
    //   Alert.alert(
    //     'Hora fora do padrão de 19h00 até 20h00!',
    //     'Realmente deseja adicionar!',
    //     [
    //       {text: 'Não',  onPress: () => {handleOptions()}},
    //       {text: 'Sim', onPress: () => {addAlarm(), handleOptions()}},
    //     ],
    //   );
      
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
  

  return (
    <Container>
      <Button onPress={initialMentoringAlert}>
        <Title>Criar agenda do dia</Title>
      </Button>
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={handleHourPikedUser}
        onCancel={handleHourPikedUser}
        mode="time"
        is24Hour={true}
      />
    </Container>
  );
}
