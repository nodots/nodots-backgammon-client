import { withAuthenticationRequired } from '@auth0/auth0-react'
import React, { ComponentType } from 'react'
import PageLoader from './PageLoader'

interface Props {
  component: ComponentType
}

export const AuthGuard: React.FC<Props> = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <PageLoader />
      </div>
    ),
  })

  return <Component />
}
