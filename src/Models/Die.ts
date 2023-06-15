import { Color, DieValue } from './Backgammon';

export class Die {
  color: Color;
  value: DieValue;

  constructor(color: Color, currentValue?: DieValue) {
    this.color = color;
    this.value = currentValue || 1;
  }
}
