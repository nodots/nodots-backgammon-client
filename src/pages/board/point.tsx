import { Box, Paper, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import './point.scss'
import { QuadrantLocation } from '../../components/Quadrant/state'
import { Color } from '../../game'
import React from 'react'

interface PointProps {
  orientation: 'N' | 'S'
  position: number
}

interface CheckerProps {
  color: Color
}
const Checker = (props: CheckerProps) => {
  const theme = useTheme()
  console.log(theme.palette)
  const fillColor =
    props.color === 'white' ?
      '#fff' :
      '#ca1b22'

  return (
    <IconButton sx={{ margin: 0, padding: 0 }}>
      <svg fill={fillColor} stroke='black' strokeWidth={1} height="3vw" width="3vw">
        <circle cx="1.5vw" cy="1.5vw" r="1.5vw" />
      </svg>
    </IconButton>
  )
}

const Point = (props: PointProps) => {
  let className = props.orientation === 'N' ? 'point north' : 'point south'
  className = props.position % 2 === 0 ?
    className += ` even` :
    className += ` odd`

  return <Box className={className}>
    <Checker color='black' />
    <Checker color='black' />
  </Box>
}

interface QuadrantProps {
  startingPosition: number,
  quadrantLocation: QuadrantLocation
}

const PointLabelContainer = (props: QuadrantProps) => {
  const labels: React.JSX.Element[] = []

  for (let i = props.startingPosition; i < props.startingPosition + 6; i++) {
    labels.push(<Box className='point-label'>{i}</Box>)
  }

  return <Box className={`point-labels ${QuadrantLocation[props.quadrantLocation]}`}>
    {labels}
  </Box>

}

const Quadrant = (props: QuadrantProps) => {
  const points: React.JSX.Element[] = []
  const orientation = QuadrantLocation[props.quadrantLocation].substring(0, 1) as 'N' | 'S'

  for (let i = props.startingPosition; i < props.startingPosition + 6; i++) {
    points.push(<Point orientation={orientation} position={i} />)
  }

  return <Box className='quadrant NW'>
    {points}
  </Box>
}

const Cube = () => {
  const theme = useTheme()
  console.log(theme.palette)
  const fillColor = '#ca1b22'

  return (
    <IconButton sx={{ margin: 0, padding: 0 }}>
      <svg fill={fillColor} stroke='black' strokeWidth={1} height="3vw" width="3vw">
        <rect height='2.8vw' width='2.8vw' />
      </svg>
    </IconButton>
  )
}

export const PointPage = (): JSX.Element => {
  return (
    <Paper className='board' elevation={8}>
      <Paper className='board-half' elevation={4}>
        <PointLabelContainer startingPosition={13} quadrantLocation={QuadrantLocation.NW} />
        <Quadrant startingPosition={13} quadrantLocation={QuadrantLocation.NW} />
        <Box className='roll-surface'></Box>
        <Quadrant startingPosition={7} quadrantLocation={QuadrantLocation.SW} />
        <PointLabelContainer startingPosition={7} quadrantLocation={QuadrantLocation.SW} />
      </Paper>
      <Box className='rail'>
        <Paper className='rail-checker-box white'></Paper>
        <Paper className='rail-checker-box black'></Paper>
      </Box>
      <Paper className='board-half'>
        <PointLabelContainer startingPosition={19} quadrantLocation={QuadrantLocation.NE} />
        <Quadrant startingPosition={19} quadrantLocation={QuadrantLocation.NE} />
        <Box className='roll-surface'></Box>
        <Quadrant startingPosition={1} quadrantLocation={QuadrantLocation.SW} />
        <PointLabelContainer startingPosition={1} quadrantLocation={QuadrantLocation.SW} />
      </Paper>

      <Box className='off'>
        <Paper className='cube-container'></Paper>
        <Paper className='dice-container'></Paper>
        <Paper className='off-checker-box black'></Paper>
        <Paper className='cube-container'><Cube /></Paper>
        <Paper className='off-checker-box white'></Paper>
        <Paper className='dice-container'></Paper>
        <Paper className='cube-container'></Paper>
      </Box>
    </Paper>
  )


}