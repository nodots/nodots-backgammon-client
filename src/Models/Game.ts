import { Checker } from './Checker';
import { Die } from './Die';
import { Cube } from './Cube';
import { Player } from './Player';
import { Rail } from './Rail'
import { generateId, Color } from './Backgammon';
import { Board } from './Board';
import { Quadrant } from './Quadrant';

export class Game {
  id: string;
  board: Board;
  cube: Cube;
  whitePlayer: Player;
  blackPlayer: Player;

  neQuadrant = new Quadrant('ne', [])
  nwQuadrant = new Quadrant('nw', [])
  seQuadrant = new Quadrant('se', [])
  swQuadrant = new Quadrant('sw', [])
  rail = new Rail()

  constructor(whitePlayer: Player, blackPlayer: Player) {
    this.id = generateId();
    this.cube = new Cube();
    this.board = new Board([this.neQuadrant, this.nwQuadrant, this.swQuadrant, this.seQuadrant], this.rail);
    this.whitePlayer = whitePlayer;
    this.blackPlayer = blackPlayer;
    this.whitePlayer.dice = [new Die('white'), new Die('white')];
    this.blackPlayer.dice = [new Die('black'), new Die('black')];

    // TODO: Refactor to be less awful
    // this.initializePoint('black', 1, 2);
    // this.initializePoint('white', 24, 2);

    // this.initializePoint('black', 12, 5);
    // this.initializePoint('white', 13, 5);

    // this.initializePoint('black', 17, 3);
    // this.initializePoint('white', 18, 3);

    // this.initializePoint('black', 19, 5);
    // this.initializePoint('white', 6, 5);

  }

  // initializePoint(color: Color, position: number, checkerCount: number) {
  //   const point = this.board.points[position - 1];
  //   for (let i = 0; i < checkerCount; i++) {
  //     point.addChecker(new Checker(color, point));
  //   }
  // }

}
