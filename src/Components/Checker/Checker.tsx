import { useGame } from '../../State'
import { Checker as CheckerModel, GameMove, generateId } from '../../Models'
import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone'

export interface CheckerProps {
  checker: CheckerModel
}

const Checker = (props: CheckerProps) => {
  const ctx = useGame()
  const classes = `checker ${props.checker.color}`

  // FIXME: move all of this logic into the model
  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(`move checker ${props.checker.id} ${props.checker}`)
    if (!ctx?.board?.quadrants) {
      throw Error('No quadrants on the board')
    }
    ctx.board.quadrants.forEach(q => {
      if (!q.points) {
        throw Error('No points in quadrant')
      }
      q.points.forEach(p => {
        const roll: [number, number] = [1, 1]
        const checkers = p.checkerBox.checkers
        const checkerIndex = checkers.findIndex(c => c.id === props.checker.id)
        if (checkerIndex !== -1) {
          console.log(`checker is in: `)
          console.log(p.checkerBox)
          if (p.checkerBox.type === 'point') {
            // FIXME: Logic only works for white rolls w white going counter clockwise
            const destinationPoint = ctx.board?.points.find(pt => pt.position === p.position - roll[0])
            if (!destinationPoint) {
              throw Error('Cannot find destination point')
            }
            const player = ctx.players[props.checker.color]
            if (!player) {
              throw Error('Cannot find player for checker ')
            }
            console.log('checker moved')
            console.log(ctx.board?.quadrants)
          }
        }
      })
    })

  }
  return <div className={classes} key={generateId()} ><RadioButtonCheckedTwoToneIcon sx={{ fill: 'rgba(69, 109, 157, .4)' }} /></div>
}

export default Checker