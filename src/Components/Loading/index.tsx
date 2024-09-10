import { useTranslation } from 'react-i18next'

interface Props {
  message?: string
}

export const Loading = ({ message }: Props) => {
  const { t } = useTranslation()
  return (
    <div>
      {t('NDBG_LOADING')} {message && message}
    </div>
  )
}
