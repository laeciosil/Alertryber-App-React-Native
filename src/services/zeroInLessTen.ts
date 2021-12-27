export function zeroInLessTen(value: number) {
    
  if (value <= 9) return `0${value}`;
  else return `${value}`;
}
