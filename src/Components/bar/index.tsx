// Types
import { Bar as RailType } from './state/types'
// Components
import Checkerbox from '../Checkerbox'

// interface RailProps {
//   bar: RailType
// }

const Rail: React.FC = () => (
  <div id="Bar">
    <div className="checkerbox clockwise"></div>
    <div className="checkerbox counterclockwise"></div>
  </div>
)

export default Rail
