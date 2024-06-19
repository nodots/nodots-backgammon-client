import { observer } from 'mobx-react'
import { LineChart } from '@mui/x-charts/LineChart'
import HUDCard from '../../HUD/HUDCard'
import { useTheme } from '@mui/material'
import { NodotsGameStore } from '../../../stores/Game/Types'

interface Props {
  store: NodotsGameStore
}

function GameWinProbabilityNotification({ store }: Props) {
  const theme = useTheme()
  const buildGraph = () => {
    const blackProbability = [50, 50, 60, 70, 75, 80, 90, 100]
    const whiteProbability = [50, 50, 40, 30, 25, 20, 10, 0]
    return (
      <LineChart
        colors={[theme.palette.secondary.dark, theme.palette.secondary.light]}
        width={380}
        height={200}
        slotProps={{ legend: { hidden: true } }}
        series={[
          { data: blackProbability, label: 'black' },
          { data: whiteProbability, label: 'white' },
        ]}
        xAxis={[{ scaleType: 'point', data: [1, 2, 3, 4, 5, 6, 7, 8] }]}
      />
    )
  }
  const graph = buildGraph()
  const buildMessage = () => {
    return 'buildMessage not implemented for GameWinProbabilityNotification'
  }

  return (
    <HUDCard
      title="Win Probability"
      eventSource="game"
      message={buildMessage()}
      graph={graph}
    />
  )
}

export default observer(GameWinProbabilityNotification)
