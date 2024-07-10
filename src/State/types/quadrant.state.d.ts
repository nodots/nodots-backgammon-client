import { QuadrantLocation } from '../../models'
import { PointState } from './point.state'

export type QuadrantState = {
  id: string
  location: QuadrantLocation
  points: PointState[]
}
