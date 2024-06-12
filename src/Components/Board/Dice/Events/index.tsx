import { observer } from 'mobx-react'

import { BarChart } from '@mui/x-charts/BarChart'
import HUDCard from '../../../HUD/HUDCard'
import { useTheme } from '@mui/material'
import { NodotsGame } from '../../../../stores/Game'

interface Props {
  store: NodotsGame
}

function DiceEventsNotification({ store }: Props) {
  const theme = useTheme()

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
