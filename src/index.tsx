import ReactDOM from 'react-dom/client'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Auth0Provider
    domain="dev-8ykjldydiqcf2hqu.us.auth0.com"
    clientId="qdkexB56guy3NFhWL3hH1vqB2zqDMwtk"
    authorizationParams={{
      redirect_uri: window.location.origin + '/lobby',
    }}
  >
    <App />
  </Auth0Provider>
)
