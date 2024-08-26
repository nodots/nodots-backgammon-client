import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'
import i18n from './i18n'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <I18nextProvider i18n={i18n}>
    <Auth0Provider
      domain="dev-8ykjldydiqcf2hqu.us.auth0.com"
      clientId="qdkexB56guy3NFhWL3hH1vqB2zqDMwtk"
      authorizationParams={{
        redirect_uri: window.location.origin + '/authorize',
      }}
    >
      <App />
    </Auth0Provider>
  </I18nextProvider>
)
