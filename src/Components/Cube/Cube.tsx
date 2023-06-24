import './Cube.scss'

interface CubeProps {
  colorScheme?: string
}

const Cube = (props: CubeProps) => {
  const clickHandler = () => {
    alert('Double')
  }

  return <div className='cube' onClick={clickHandler}>2</div>
}

export default Cube