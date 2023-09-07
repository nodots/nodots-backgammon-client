import { isColor } from '../../../../game/'
import { Player, isPlayer } from '../../../Player/state'
import { Checker } from '../../../Checker/state'
import { CheckerBox } from '../../../CheckerBox/state/types'
import { Point } from '../../../Point/state/types'
import { Off, initialize as initializeOff } from '../../../Off/state/types'
import { Rail, initialize as initializeRail } from '../../../Rail/state/types'
import { Quadrant, initialize as initializeQuadrants } from '../../../Quadrant/state/types'
import DEFAULT_SETUP from '../config/DEFAULT.json'
import { CHECKERS_PER_PLAYER } from '../../../../game/game'
import { GameError } from '../../../../game/game'

export const POINT_COUNT = 24
// For importing setup
export interface CheckerProp {
  color: string,
  checkerCount: number,
  position: any
}

export enum BOARD_ACTION_TYPE {
  MOVE_CHECKER
}

export type Board = {
  id: string,
  quadrants: Quadrant[]
  off: {
    white: Off,
    black: Off,
  }
  rail: {
    white: Rail,
    black: Rail
  }
}

export const isBoard = (b: any): b is Board => {
  if (typeof b !== 'object') {
    return false
  }
  const keys = Object.keys(b)

  const quadrantsIndex = keys.findIndex(k => k === 'quadrants')
  if (quadrantsIndex === -1) return false
  const offIndex = keys.findIndex(k => k === 'off')
  if (offIndex === -1) return false
  const railIndex = keys.findIndex(k => k === 'rail')
  if (railIndex === -1) return false

  return true
}

export const initialize = (setup?: CheckerProp[]): Board => {
  if (!setup) {
    setup = DEFAULT_SETUP
  }
  // if (!sanityCheckSetup(setup)) {
  //   throw new GameError({
  //     model: 'Configuration',
  //     errorMessage: 'Board initialization failed'
  //   })
  // }

  const off = initializeOff(DEFAULT_SETUP)
  const rail = initializeRail(DEFAULT_SETUP)

  const board: Board = {
    id: Math.random.toString(), // Math.random().toString(),
    quadrants: initializeQuadrants(DEFAULT_SETUP),
    off,
    rail
  }
  return board
}

export const getCheckerBoxes = (board: Board): CheckerBox[] => {
  const checkerBoxes: CheckerBox[] = []
  board.quadrants.forEach(q => {
    checkerBoxes.push(...q.points)
  })
  checkerBoxes.push(board.off.white)
  checkerBoxes.push(board.off.black)
  checkerBoxes.push(board.rail.white)
  checkerBoxes.push(board.rail.black)
  return checkerBoxes
}

function sanityCheckSetup (setup: CheckerProp[]): boolean {
  let isSane = true
  let blackCheckerCount = 0
  let whiteCheckerCount = 0
  setup.forEach(c => {
    if (c.color === 'black') {
      blackCheckerCount += c.checkerCount
    } else if (c.color === 'white') {
      whiteCheckerCount += c.checkerCount
    } else {
      console.log(blackCheckerCount)
      console.log(whiteCheckerCount)
      return false
    }
  })

  if (blackCheckerCount !== CHECKERS_PER_PLAYER || whiteCheckerCount !== CHECKERS_PER_PLAYER) {
    // return false
    console.log(blackCheckerCount)
    console.log(whiteCheckerCount)
    isSane = false
  }
  return isSane
}

export const getPipCountForPlayer = (board: Board, player: Player): number => {
  if (!isColor(player.color)) {
    throw new GameError({
      model: 'Player',
      errorMessage: 'Invalid color'
    })
  }
  const checkerboxes = getCheckerBoxes(board)
  let pipCount = 0
  checkerboxes.forEach(cb => {
    if (typeof cb.position === 'number' && cb.checkers.length > 0 && cb.checkers[0].color === player.color) {
      let distance = cb.position
      if (player.moveDirection === 'clockwise') {
        distance = POINT_COUNT - distance
      }
      pipCount += distance * cb.checkers.length
    }
  })
  // FIXME
  if (isColor(player.color) && player.color === 'black' && board.rail.black.checkers.length > 0) {
    pipCount += board.rail.black.checkers.length * POINT_COUNT
  }
  if (isColor(player.color) && player.color === 'white' && board.rail.white.checkers.length > 0) {
    pipCount += board.rail.white.checkers.length * POINT_COUNT
  }
  return pipCount
}


export const getCheckers = (board: Board): { white: Checker[], black: Checker[] } => {
  const whiteCheckers: Checker[] = []
  const blackCheckers: Checker[] = []

  whiteCheckers.push(...board.rail.white.checkers)
  whiteCheckers.push(...board.off.white.checkers)

  blackCheckers.push(...board.rail.black.checkers)
  blackCheckers.push(...board.off.black.checkers)

  board.quadrants.forEach(q => {
    q.points.forEach(p => {
      whiteCheckers.push(...p.checkers.filter(c => c.color === 'white'))
      blackCheckers.push(...p.checkers.filter(c => c.color === 'black'))
    })
  })

  return { white: whiteCheckers, black: blackCheckers }
}

interface CheckerLocation {
  checkerId: string,
  location: Point | Rail | Off | undefined
}

export const findChecker = (board: Board, checkerId: string): Point | Rail | Off | void => {
  let checkerLocation: Point | Rail | Off | void

  checkerLocation = board.quadrants.forEach(q => {
    q.points.forEach((p) => {
      if (p.checkers.find(c => c.id === checkerId)) {
        return p
      }
    })
  })

  console.log(checkerLocation)

  return checkerLocation
}

export const sanityCheckBoard = (board: Board): boolean => {
  let isSane = true

  const checkers = getCheckers(board)
  const whiteCheckers = checkers.white
  const blackCheckers = checkers.black

  if (whiteCheckers.length !== CHECKERS_PER_PLAYER || blackCheckers.length !== CHECKERS_PER_PLAYER) {
    return false
  }

  const whiteCheckerSet = new Set(whiteCheckers)
  const blackCheckerSet = new Set(blackCheckers)

  if (whiteCheckerSet.size !== whiteCheckers.length) {
    return false
  }

  if (blackCheckerSet.size !== blackCheckers.length) {
    return false

  }


  return isSane

}