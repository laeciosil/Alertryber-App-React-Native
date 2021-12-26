import sub from "date-fns/sub";
import { zeroInMinutes } from "./zeroInMinutes";
export function minutesMinusTen(isoDate: Date) {
  const dateFormatted = sub(isoDate, { minutes: 10 });
  let minutes = zeroInMinutes(dateFormatted.getMinutes());
  let hours = dateFormatted.getHours();
  let day = dateFormatted.getDate();

  // para compensar o fuso horário +3
  if (hours <= 20) hours += 3;
  else if (hours ===  21){
    day += 1;
    hours = 0;
  }else if (hours ===  22) {
    day += 1;
    hours = 1;
  }else if (hours === 23) {
    day += 1;
    hours = 2;
  }

 return new Date(`${isoDate.getFullYear()}-${isoDate.getMonth() + 1}-${day}T${hours}:${minutes}:00.000Z`);
  
}
