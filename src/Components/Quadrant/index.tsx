import {
  generateId,
  Confirming,
  Moving,
  Rolling,
  RollingForStart,
  Rolled,
} from '../../GameStore/types'
import {
  Longitude,
  Latitude,
  Points,
  NodotsBoardStore,
} from '../../GameStore/types/Board'
import { Point } from '../../GameStore/types/Checkercontainer'
import PointComponent from '../Point'
import PointLabels from '../PointLabels'
import { NodotsGameState } from '../../GameStore/types'
import { observer } from 'mobx-react'
import NodotsGameStore from '../../GameStore'
import React from 'react'

type QuadrantPoints = Array<Point>

const buildQuadrant = (
  store: NodotsGameStore,
  boardStore: NodotsBoardStore,
  latitude: Latitude,
  longitude: Longitude,
  start: number,
  points: QuadrantPoints
) => {
  switch (store.state.kind) {
    case 'initializing':
      break
    case 'confirming':
    case 'moving':
    case 'rolling':
    case 'rolled':
    case 'rolling-for-start':
      return (
        <Quadrant
          store={store}
          boardStore={boardStore}
          state={store.state}
          latitude={latitude}
          longitude={longitude}
          start={start}
          points={points}
        />
      )
  }
}

export const buildQuadrants = (
  store: NodotsGameStore,
  boardStore: NodotsBoardStore
): any[] => {
  switch (store.state.kind) {
    case 'initializing':
      return []
    case 'confirming':
    case 'moving':
    case 'rolling':
    case 'rolled':
    case 'rolling-for-start':
      return [
        buildQuadrant(store, boardStore, 'south', 'east', 1, []),
        buildQuadrant(store, boardStore, 'south', 'west', 7, []),
        buildQuadrant(store, boardStore, 'north', 'west', 13, []),
        buildQuadrant(store, boardStore, 'north', 'east', 19, []),
      ]
  }
}

interface Props {
  store: NodotsGameStore
  boardStore: NodotsBoardStore
  state: Confirming | Rolling | Rolled | RollingForStart | Moving
  latitude: Latitude
  longitude: Longitude
  start: number
  points: QuadrantPoints
}

function Quadrant({
  store,
  boardStore,
  state,
  latitude,
  longitude,
  start,
  points,
}: Props) {
  return (
    <div className={`quadrant-container ${latitude} ${longitude}`}>
      <PointLabels latitude={latitude} longitude={longitude} start={start} />
      <div className={`quadrant ${latitude} ${longitude}`}>
        {points.map((p) => (
          <PointComponent
            id={generateId()}
            store={store}
            checkers={p.checkers}
            position={p.position}
            latitude={latitude}
            key={generateId()}
            state={state}
          />
        ))}
      </div>
    </div>
  )
}

export default observer(Quadrant)
