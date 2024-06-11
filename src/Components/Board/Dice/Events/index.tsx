import { observer } from 'mobx-react'
import {
  NodotsGameState,
  GameRolled,
  GameRolling,
} from '../../../../GameStore/types'
import { BarChart } from '@mui/x-charts/BarChart'
import HUDCard from '../../../HUD/HUDCard'
import { useTheme } from '@mui/material'

interface Props {
  state: NodotsGameState
}

function DiceEventsNotification({ state }: Props) {
  const theme = useTheme()
  const { players, kind } = state

  const buildMessage = () => {
    switch (kind) {
      case 'game-rolled':
      case 'game-rolling':
      case 'game-rolling-for-start':
        return kind
      case 'game-doubling':
      case 'game-confirming-play':
      case 'game-moving':
      case 'game-completed':
      case 'game-dice-switched':
      case 'game-initializing':
      case 'game-play-confirmed':
      default:
        return ''
    }
  }

  const whiteRolls = 18
  const blackRolls = 18

  const whiteData = [
    3 / whiteRolls,
    3 / whiteRolls,
    1 / whiteRolls,
    3 / whiteRolls,
    3 / whiteRolls,
    5 / whiteRolls,
  ]
  const blackData = [
    4 / blackRolls,
    4 / blackRolls,
    4 / blackRolls,
    4 / blackRolls,
    0 / blackRolls,
    0 / blackRolls,
  ]
  const xLabels = ['1', '2', '3', '4', '5', '6']

  const graph: JSX.Element = (
    <BarChart
      colors={[theme.palette.secondary.dark, theme.palette.secondary.light]}
      width={380}
      height={200}
      slotProps={{ legend: { hidden: true } }}
      series={[
        { data: blackData, label: 'black', id: 'blackDiceRollDistribution' },
        { data: whiteData, label: 'white', id: 'whiteDiceRollDistribution' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
  )
  return (
    <HUDCard title="Dice roll distribution" eventSource="dice" graph={graph} />
  )
}

export default observer(DiceEventsNotification)
