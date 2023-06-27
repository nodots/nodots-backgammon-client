import { Off as OffModel } from '../../Models/Backgammon'
import { Paper } from '@mui/material'
import Cube from '../Cube/Cube'
import CheckerContainer from '../CheckerContainer/CheckerContainer'

interface OffProps {
  off: OffModel
}

const Off = (props: OffProps) => {
  return <>
    <CheckerContainer checkerContainer={props.off.checkerContainers.black} />
    <Cube controllingColor={undefined} />
    <CheckerContainer checkerContainer={props.off.checkerContainers.white} />
  </>
}

export default Off
