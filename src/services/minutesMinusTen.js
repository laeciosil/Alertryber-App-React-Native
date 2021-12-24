export function minutesMinusTen(isoDate) {
  let minutes = isoDate.getMinutes();
  let hours = isoDate.getHours();
  let day = isoDate.getDate();

  // para compensar o fuso horário
  if (hours <= 20) hours += 3;
  else if (hours ===  21){
    day += 1;
    hours = 0;
  }
  else if (hours ===  22) {
    day += 1;
    hours = 1;
  }else if (hours ===  23) {
    day += 1;
    hours = 2;
  }

  if(hours === 0 && minutes <= 9) {
    minutes = `5${minutes}`;
    hours = 23;
    day -= 1;
  } else if (minutes <= 9) {
    minutes = `5${minutes}`;
    hours -= 1;
  } else{
    minutes -= 10;
  }

  if(minutes <= 9){
   minutes = `0${minutes}`;
  }
  if(hours <= 9){
   hours = `0${hours}`;
  }
  return new Date(`${isoDate.getFullYear()}-${isoDate.getMonth() + 1}-${day}T${hours}:${minutes}:00.000Z`);
  
}
