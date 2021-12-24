export function zeroInMinutes(isoDate) {
  let minutes = isoDate.getMinutes();
    
  if (minutes <= 9) {
    minutes = `0${minutes}`;
  } else{
    minutes = `${minutes}`;
  }
  return minutes;
}
