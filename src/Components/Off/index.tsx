// interface OffProps {
//   off: OffType
// }

import Cube from '../Cube'

const Off: React.FC = () => (
  <div id="Off">
    <div className="checkerbox clockwise"></div>
    <Cube />
    <div className="checkerbox counterclockwise"></div>
  </div>
)

export default Off
