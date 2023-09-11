import { Container, Grid, Paper } from '@mui/material'
import './board.scss'
import { QuadrantLocation } from '../../components/Quadrant/state'
import { ResponsiveSVG } from '@cutting/svg'
import { Color } from '../../game'
import React from 'react'

interface PointBackgroundProps {
  orientation: 'N' | 'S'
  position: number
}

const PointBackground = (props: PointBackgroundProps) => {
  let points: [number, number, number, number, number, number] = [
    40, 0,
    0, 600,
    80, 600
  ]
  const fillColor = props.position % 2 === 0 ? '#333355' : '#004f42'
  const className = props.orientation === 'N' ? 'point-background north' : 'point-background south'

  const svgStyle = {
    height: '100%',
    width: '100%',
    transform: ''
  }

  if (props.orientation === 'N') {
    svgStyle.transform = 'rotate(180deg)'
  }

  return (
    <svg className={className} style={svgStyle}>
      <polygon points={points.join(',')} fill={fillColor} />
      Sorry, your browser does not support inline SVG.
    </svg>
  )
}

interface CheckerProps {
  color: Color
}

const Checker = (props: CheckerProps) => {
  return (
    <svg>
      <circle cx={'1.5vw'} cy={'1.5vw'} r={'1.5vw'} style={{ fill: props.color }} />
    </svg>
  )
}

interface PointProps {
  quadrantLocation: QuadrantLocation,
  position: number
}

const Point = (props: PointProps) => {
  const orientation = QuadrantLocation[props.quadrantLocation].toLowerCase().substring(0, 1) as 'N' | 'S'

  return (
    <Paper elevation={0} className={`board-point ${QuadrantLocation[props.quadrantLocation].toLowerCase()}`}>
      <PointBackground orientation={orientation} position={props.position} />
    </Paper>
  )
}

interface QuadrantProps {
  quadrantLocation: QuadrantLocation
  startingPointPosition: number
}

const Quadrant = (props: QuadrantProps) => {
  const points: React.JSX.Element[] = []
  for (let i = props.startingPointPosition; i < props.startingPointPosition + 6; i++) {
    points.push(<Point quadrantLocation={props.quadrantLocation} position={i} />)
  }
  return (
    <Grid item className={`board-quadrant ${QuadrantLocation[props.quadrantLocation].toLowerCase()}`}>
      {points}
    </Grid>
  )
}

export const NewBoardPage = () => {
  return (
    <Container>
      <Grid className='board-grid'>
        <Grid item className='board-half'>
          <Paper className='board-half-inner'>
            <Grid>
              <Quadrant quadrantLocation={QuadrantLocation.NW} startingPointPosition={13} />
              <Grid item>Roll Surface</Grid>
              <Quadrant quadrantLocation={QuadrantLocation.SW} startingPointPosition={7} />
            </Grid>
          </Paper>
        </Grid>
        <Grid item className='board-rail'>Rail</Grid>
        <Grid item className='board-half'>
          <Paper className='board-half-inner'>
            <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
              <Quadrant quadrantLocation={QuadrantLocation.NE} startingPointPosition={18} />
              <Grid item>Roll Surface</Grid>
              <Quadrant quadrantLocation={QuadrantLocation.SE} startingPointPosition={1} />
            </Grid>
          </Paper>
        </Grid>
        <Grid item className='board-off'>Off</Grid>

      </Grid>
    </Container >
  )
}