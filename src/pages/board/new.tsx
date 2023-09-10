import { Container, Grid, Paper } from '@mui/material'
import './board.scss'
import { QuadrantLocation } from '../../components/Quadrant/state'
import { Color } from '../../game'
import React from 'react'

interface PointBackgroundProps {
  orientation: 'N' | 'S'
  position: number
}

const PointBackground = (props: PointBackgroundProps) => {
  let points: [number, number, number, number, number, number] = [
    30, 0,
    0, 400,
    60, 400
  ]
  console.log(props.orientation)
  if (props.orientation === 'N') {
    points = [
      30, 400, //30, 0,
      0, 0, // 0, 400,
      60, 0// 60, 400
    ]
  }
  const fillColor = props.position % 2 === 0 ? '#333355' : '#004f42'
  const className = props.orientation === 'N' ? 'point-background north' : 'point-background south'

  return (
    <svg className={className} >
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
  return (
    <Paper elevation={0} className={`board-point ${QuadrantLocation[props.quadrantLocation].toLowerCase()}`}>
      <PointBackground position={props.position} orientation={QuadrantLocation[props.quadrantLocation].substring(0, 1) as 'N' | 'S'} />
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