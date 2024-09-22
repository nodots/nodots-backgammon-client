import { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

interface User {
  email: string
  locale: string
  source: string
  externalId: string
}

const u: User = {
  email: 'kenr@nodots.com',
  locale: 'en',
  source: 'google',
  externalId: '123456',
}

export const ProtectedRoutes = () => {
  const [user] = useState<User>(u)

  return user ? <Outlet /> : <Navigate to="/sign-in" />
}
