import { Container } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface Props {
  message?: string
}

export const Loading = ({ message }: Props) => {
  const { t } = useTranslation()
  const content: string = message ? message : t('NDBG_LOADING')
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        border: '1px dotted yellow !important',
      }}
    >
      {content}
    </Container>
  )
}
