import { useTranslation } from 'react-i18next'

export const Loading = () => {
  const { t } = useTranslation()
  return <div>{t('NDBG_LOADING')}</div>
}
