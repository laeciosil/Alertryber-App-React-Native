export function zeroInMinutes(minutes: number) {
    
  if (minutes <= 9) return `0${minutes}`;
  else return `${minutes}`;
}
