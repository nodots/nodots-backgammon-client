import { IBoardImport } from '../types'

export const BOARD_IMPORT_DEFAULT: IBoardImport = [
  { position: 24, checkercount: 2 },
  { position: 13, checkercount: 5 },
  { position: 8, checkercount: 3 },
  { position: 6, checkercount: 5 },
]

export const BOARD_IMPORT_ALL_ACE: IBoardImport = [
  { position: 1, checkercount: 15 },
]

export const BOARD_IMPORT_ALL_OFF: IBoardImport = [
  { position: 'off', checkercount: 15 },
]

export const BOARD_IMPORT_ALL_BAR: IBoardImport = [
  { position: 'bar', checkercount: 15 },
]

export const BOARD_IMPORT_BEAR_OFF: IBoardImport = [
  { position: 1, checkercount: 2 },
  { position: 2, checkercount: 2 },
  { position: 3, checkercount: 2 },
  { position: 4, checkercount: 3 },
  { position: 5, checkercount: 3 },
  { position: 6, checkercount: 3 },
]
