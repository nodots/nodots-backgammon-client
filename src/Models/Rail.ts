import { Checker } from './Checker';

export class Rail {
  checkers?: Checker[];

  constructor(checkers?: Checker[]) {
    this.checkers = checkers || [];
  }
}
