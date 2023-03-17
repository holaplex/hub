export function round(value: number, precision: number = 4): number {
  var multiplier = Math.pow(10, precision);

  return Math.round(value * multiplier) / multiplier;
}
