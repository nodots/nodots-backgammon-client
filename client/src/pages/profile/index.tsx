import { useAuth0 } from "@auth0/auth0-react"

const ProfilePage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  console.log(user)

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    isAuthenticated && user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  )
}

export default ProfilePage