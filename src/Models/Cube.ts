import { Color, CubeValue, generateId, modelDebug, MAX_CUBE_VALUE } from '.'

/**
 * The Cube is the large die and used to double the current point-value of the game 
 * in the match. At the start of play it is not controlled by any player. After play 
 * begins, the active player (game.players[Color].active = true) controls the Cube
 * until it's first use "double" at which point control of the cube passes back and 
 * forth after each "double"
 */
export class Cube {
  id: string
  value: CubeValue
  controllingColor: Color | undefined

  constructor ({ value, controllingColor }: { value?: CubeValue; controllingColor?: Color } = {}) {
    this.id = generateId()
    this.value = value ? value : 2
    this.controllingColor = controllingColor ? controllingColor : undefined
  }

  static double (currentValue: CubeValue): CubeValue {
    if (modelDebug) {
      console.log(`[Cube Model]: double(${currentValue})`)
    }
    if (currentValue === MAX_CUBE_VALUE) {
      return currentValue
    }
    const newValue = currentValue * 2 as CubeValue
    if (modelDebug) {
      console.log(`[Cube Model] double: newValue = ${newValue}`)
    }
    return newValue
  }
}
