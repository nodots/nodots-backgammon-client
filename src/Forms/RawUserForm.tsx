import { Box, TextField, Button } from '@mui/material'

const externalToken = 'c732a94e-fda2-4d1f-8949-7355290a2809'

export interface Props {
  clickHandler: () => void
}

export const SignInForm = ({ clickHandler }: Props) => (
  <Box component="form" id="SignInForm">
    <TextField
      type="text"
      id="token"
      name="token"
      label="Token"
      defaultValue={externalToken}
    />
    <TextField
      type="text"
      id="externalId"
      name="externalId"
      label="External ID"
      defaultValue="7ee6d2a6-8807-49db-b299-3b8eda132e93"
    />
    <TextField
      type="text"
      id="email"
      name="email"
      label="Email"
      defaultValue="white-stripes@nodots.com"
    />
    <Button variant="contained" color="primary" onClick={clickHandler}>
      Submit
    </Button>
  </Box>
)
