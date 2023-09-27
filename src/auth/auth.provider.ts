import { useState, createContext, useContext, ReactElement } from 'react'

type GameUser = {

  id: string,
  displayName: string,
  name?: {
    familyName?: string,
    givenName?: string
  },
  emails: string[],
  photos: string[],
  provider: string
}

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined
}

export const AuthProvider = ({ children }: ChildrenType): ReactElement => {
  const AuthContext = createContext(null)
  const [user, setUser] = useState<GameUser | null>(null)

  const login = (user: GameUser) => {
    setUser(user)
  }
  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider

}

export const useAuth = () => {
  return useContext(AuthContext)
}

import { useAuth } from './auth'
import React from 'react'
import { Navigate } from 'react-router-dom'

export const RequireAuth = ({ children }) => {
  const auth = useAuth()
  if (!auth.user) {
    return <Navigate to='/sign-in' />
  }
  return children
}
