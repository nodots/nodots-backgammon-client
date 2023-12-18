import { isColor } from '../../../../game'
import { Player } from '../../../../game/player'
import { Checker } from '../../../Checker/state/types'
import { Checkerbox } from '../../../Checkerbox/state/types'
import { Point } from '../../../Point/state/types'
import { Off, initialize as initializeOff } from '../../../Off/state/types'
import { Bar, initialize as initializeBar } from '../../../Bar/state/types'
import {
  Quadrant,
  QuadrantLocation,
  initialize as initializeQuadrants,
} from '../../../Quadrant/state/types'
import DEFAULT_SETUP from '../config/DEFAULT.json'
import { CHECKERS_PER_PLAYER } from '../../../../game/game'
import { GameError } from '../../../../game/game'
import { CheckerProp } from '../../../Checker/state/types'

export const POINT_COUNT = 24
export type Board = {
  id: string
  quadrants: Quadrant[]
  off: {
    white: Off
    black: Off
  }
  bar: {
    white: Bar
    black: Bar
  }
}

export const isBoard = (b: any): b is Board => {
  if (typeof b !== 'object') {
    return false
  }
  const keys = Object.keys(b)

  const quadrantsIndex = keys.findIndex((k) => k === 'quadrants')
  if (quadrantsIndex === -1) return false
  const offIndex = keys.findIndex((k) => k === 'off')
  if (offIndex === -1) return false
  const railIndex = keys.findIndex((k) => k === 'bar')
  if (railIndex === -1) return false

  return true
}

export const initialize = (setup?: CheckerProp[]): Board => {
  if (!setup) {
    setup = DEFAULT_SETUP
  }

  const off = initializeOff(DEFAULT_SETUP)
  const bar = initializeBar(DEFAULT_SETUP)

  const board: Board = {
    id: Math.random.toString(), // FIXME
    quadrants: initializeQuadrants(DEFAULT_SETUP),
    off,
    bar,
  }
  return board
}

export const getCheckerboxes = (board: Board): Checkerbox[] => {
  const checkerBoxes: Checkerbox[] = []
  board.quadrants.forEach((q) => {
    checkerBoxes.push(...q.points)
  })
  checkerBoxes.push(board.off.white)
  checkerBoxes.push(board.off.black)
  checkerBoxes.push(board.bar.white)
  checkerBoxes.push(board.bar.black)
  return checkerBoxes
}

function sanityCheckSetup(setup: CheckerProp[]): boolean {
  let isSane = true
  let blackCheckerCount = 0
  let whiteCheckerCount = 0
  setup.forEach((c) => {
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

  if (
    blackCheckerCount !== CHECKERS_PER_PLAYER ||
    whiteCheckerCount !== CHECKERS_PER_PLAYER
  ) {
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
      errorMessage: 'Invalid color',
    })
  }
  const checkerboxes = getCheckerboxes(board)
  let pipCount = 0
  checkerboxes.forEach((cb) => {
    if (
      typeof cb.position === 'number' &&
      cb.checkers.length > 0 &&
      cb.checkers[0].color === player.color
    ) {
      let distance = cb.position
      if (player.moveDirection === 'clockwise') {
        distance = POINT_COUNT - distance
      }
      pipCount += distance * cb.checkers.length
    }
  })
  // FIXME
  if (
    isColor(player.color) &&
    player.color === 'black' &&
    board.bar.black.checkers.length > 0
  ) {
    pipCount += board.bar.black.checkers.length * POINT_COUNT
  }
  if (
    isColor(player.color) &&
    player.color === 'white' &&
    board.bar.white.checkers.length > 0
  ) {
    pipCount += board.bar.white.checkers.length * POINT_COUNT
  }
  return pipCount
}

export const getCheckers = (
  board: Board
): { white: Checker[]; black: Checker[] } => {
  const whiteCheckers: Checker[] = []
  const blackCheckers: Checker[] = []

  whiteCheckers.push(...board.bar.white.checkers)
  whiteCheckers.push(...board.off.white.checkers)

  blackCheckers.push(...board.bar.black.checkers)
  blackCheckers.push(...board.off.black.checkers)

  board.quadrants.forEach((q) => {
    q.points.forEach((p) => {
      whiteCheckers.push(...p.checkers.filter((c) => c.color === 'white'))
      blackCheckers.push(...p.checkers.filter((c) => c.color === 'black'))
    })
  })

  return { white: whiteCheckers, black: blackCheckers }
}

export const findChecker = (
  board: Board,
  checkerId: string
): Point | Bar | Off | void => {
  let checkerLocation: Point | Bar | Off | void

  checkerLocation = board.quadrants.forEach((q) => {
    q.points.forEach((p) => {
      if (p.checkers.find((c) => c.id === checkerId)) {
        return p
      }
    })
  })
  return checkerLocation
}

export const sanityCheckBoard = (board: Board): boolean => {
  let isSane = true

  const checkers = getCheckers(board)
  const whiteCheckers = checkers.white
  const blackCheckers = checkers.black

  if (
    whiteCheckers.length !== CHECKERS_PER_PLAYER ||
    blackCheckers.length !== CHECKERS_PER_PLAYER
  ) {
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

export function getCheckerboxCoordinates(board: Board, id: string | undefined) {
  let quadrantIndex: number | undefined = undefined
  let pointIndex: number | undefined = undefined
  const checkerbox = getCheckerboxes(board).find((cb) => cb.id === id)

  if (checkerbox) {
    if (typeof checkerbox.position === 'number') {
      if (checkerbox.position <= 6) {
        quadrantIndex = board.quadrants.findIndex(
          (q) => q.location === QuadrantLocation.SE
        )
      } else if (checkerbox.position >= 7 && checkerbox.position <= 12) {
        quadrantIndex = board.quadrants.findIndex(
          (q) => q.location === QuadrantLocation.SW
        )
      } else if (checkerbox.position >= 13 && checkerbox.position <= 18) {
        quadrantIndex = board.quadrants.findIndex(
          (q) => q.location === QuadrantLocation.NW
        )
      } else if (checkerbox.position >= 19 && checkerbox.position <= 24) {
        quadrantIndex = board.quadrants.findIndex(
          (q) => q.location === QuadrantLocation.NE
        )
      } else {
        throw new GameError({ model: 'Move', errorMessage: 'No quadrant' })
      }

      if (
        typeof quadrantIndex !== 'number' ||
        quadrantIndex < 0 ||
        quadrantIndex > 3
      ) {
        throw new GameError({
          model: 'Move',
          errorMessage: 'No Quadrant Index',
        })
      }
      pointIndex = board.quadrants[quadrantIndex].points.findIndex(
        (p) => p.id === id
      )
    } else {
      throw new GameError({
        model: 'Move',
        errorMessage: 'No Quadrant',
      })
    }
    return { quadrantIndex, pointIndex }
  } else {
    throw new GameError({
      model: 'Move',
      errorMessage: 'No checkerbox',
    })
  }
}
