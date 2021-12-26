import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ReactNativeAN from '../../react-native-alarm-notification';
import { minutesMinusTen } from '../../services/minutesMinusTen';
import { zeroInMinutes } from '../../services/zeroInMinutes';

import { 
  Container, 
  Button, 
  Title 
} from './styles';

export  function CreateAlarms() {
  const [isDateTimePickerVisible, setDateTimePickerVisibility] = useState(false);
  const [dateToday, setDateToday] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [dataAlarm, setDataAlarm] = useState({});
  
  useEffect(() => {
    const currentDate = new Date();
    const today = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
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

  async function initialMentoringAlert(){
    const alarms = await ReactNativeAN.getScheduledAlarms()
    const initialMentoringData = {
      fireDate: new Date(`${dateToday}T15:50:00.000Z`),//12:50:00,
      message: 'Mentoria das 13h00 vai começar!'
    };
    const alarmFind = alarms.find(alarm => alarm.message === initialMentoringData.message);

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
    
    if(datePiked){
      if(datePiked < currentDate) {
        Alert.alert(
          'Olá Tryber!',
          `Não é possível adicionar no passado!😆`,
          [
            {text: 'Escolher novamente',  onPress: () =>  showDateTimePicker()},
            {text: 'Próximo', onPress: () => {finalMentoringAlert()}},
          ],
          
        );
        return;
      }

      const hourPiked = datePiked.getHours();
      const minutesPiked = zeroInMinutes(datePiked);
      if(hourPiked >= 15 && hourPiked < 17){
        handleCreateAlarm(liveClassData.fireDate, liveClassData.message)
        finalMentoringAlert();
        return;
      }
      if(hourPiked >= 18){
       
        Alert.alert(
          'Olá Tryber!',
          `Não é possível adicionar para depois das 18h00!😆`,
          [
            {text: 'Escolher novamente',  onPress: () =>  showDateTimePicker()},
            {text: 'Proximo', onPress: () => {
              finalMentoringAlert();
              return;
            }},
          ],
          
        );
        return
        
        
      } else{
        Alert.alert(
          'Hora fora do padrão de 15h30 até 16h30!🤔',
          `Realmente deseja adicionar para ${datePiked.getHours()}:${minutesPiked}?`,
          [
            {text: 'Escolher novamente',  onPress: () =>  showDateTimePicker()},
            {text: 'Sim', onPress: () => {
              handleCreateAlarm(liveClassData.fireDate, liveClassData.message)
              finalMentoringAlert();
              return;
            }},
          ],
          
        );
        return
      }
     
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
    const alarms = await ReactNativeAN.getScheduledAlarms();
    const finalMentoringData = {
     fireDate: new Date(`${dateToday}T21:20:00.000Z`),//18:20:00
     message: 'Mentoria das 18h30 vai começar!',
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
   
    const hourLimit = new Date(`${dateToday}T23:00:00.000Z`)
    const closingDayData = {
      fireDate:  datePiked || new Date(`${dateToday}T22:20:00.000Z`),//19:20:00
      message: 'Fechamento vai começar!',
    }
    if(datePiked){
      const hourPiked = datePiked.getHours();
      const minutesPiked = zeroInMinutes(datePiked);
      if(datePiked < currentDate) {
        Alert.alert(
          'Olá Tryber!',
          `Não é possível adicionar no passado!😆`,
          [
            {text: 'Escolher novamente',  onPress: () =>  showDateTimePicker()},
            {text: 'Não adicionar', onPress: () => {return}},
          ],
          
        );
        return;
      }
      if(`${hourPiked}:${minutesPiked}` >= '18:50' && hourPiked < 20){
        handleCreateAlarm(closingDayData.fireDate, closingDayData.message);
        Alert.alert("Tudo certo tryber!", "Agenda ok, #VQV! 🚀");
        return;
      }
      if(hourPiked >= 20){
        Alert.alert(
          'Olá Tryber!',
          `Não é possível adicionar para depois das 20h00!😆`,
          [
            {text: 'Escolher novamente',  onPress: () =>  showDateTimePicker()},
            {text: 'Não adicionar', onPress: () => {return}},
          ],
          
        );
        return;
      } else{
        Alert.alert(
          'Hora fora do padrão de 19h00 até 19h45! 🤔',
          `Realmente deseja adicionar para ${datePiked.getHours()}:${minutesPiked}?`,
          [
            {text: 'Escolher novamente',  onPress: () =>  showDateTimePicker()},
            {text: 'Sim', onPress: () => {
              handleCreateAlarm(closingDayData.fireDate, closingDayData.message)
              finalMentoringAlert();
              return;
            }},
          ],
          
        );
        return
      }
     
    }
    setDataAlarm(closingDayData);
    
      const alarms = await ReactNativeAN.getScheduledAlarms()
      const alarmFind = alarms.find(alarm => alarm.message === closingDayData.message);
        
      if(alarmFind){
          Alert.alert("Tudo certo tryber!", "Agenda ok, #VQV! 🚀");
      } else if(hourLimit < currentDate){
          Alert.alert("Tarde demais tryber🙃", "Bom descanso! 😴") 
      }else{
          
        Alert.alert("Fechamento do dia", "Fechamento começa às 19h30?", 
          [
            {text: "Não", onPress: () => showDateTimePicker()},
            {text: "Sim", onPress: () => handleCreateAlarm(closingDayData.fireDate, closingDayData.message)},
          ]);
      }
  } 
 
  function handleHourPikedUser(datePiked) {
    hideDateTimePicker();
    const liveClassMessage ='Aula ao vivo vai começar!';

    if(datePiked) {
      const alarmDate = minutesMinusTen(datePiked);
      if(dataAlarm.message === liveClassMessage  && alarmDate){
        liveClassAlert(alarmDate);

      }else if (dataAlarm.message !== liveClassMessage && alarmDate){
        closingDayAlert(alarmDate);
      }
      return;
    }

    if(dataAlarm.message === 'Aula ao vivo vai começar!'){
      liveClassAlert();
    }else{
      closingDayAlert();
    }
    
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