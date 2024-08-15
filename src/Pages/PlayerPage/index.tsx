import { useAuth0, User } from '@auth0/auth0-react'
import SignOutButton from '../../Forms/Auth0/Buttons/SignOutButton'

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading ...</div>
  }

  switch (user) {
    case null:
      return <div>Not authenticated</div>
    case undefined:
      return <div>Not authenticated</div>
    default:
      console.log(user)
      return (
        <div>
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
          <SignOutButton />
        </div>
      )
  }
}

export default Profile
