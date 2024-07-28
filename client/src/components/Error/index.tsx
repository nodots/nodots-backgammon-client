import { Alert, AlertColor } from '@mui/material'

export interface ErrorProps {
  message: string,
  severity: AlertColor
}

const Error = (props: ErrorProps) => {
  return <Alert severity={props.severity}>{props.message}</Alert>
}

export default Error