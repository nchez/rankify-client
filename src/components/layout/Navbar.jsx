import { Link } from 'react-router-dom'

export default function Navbar({ handleLogout, currentUser }) {
  // if the user is logged in
  const loggedIn = (
    <>
      {/* if the user is loggerd in..... */}
      <Link to="/">
        {/* todo: app function to logout */}
        <span onClick={handleLogout}>Log out</span>
      </Link>

      <Link to="/profile">Profile</Link>

      <Link to="/search">Search</Link>
    </>
  )

  // if the user is logged out
  // const loggedOut = (
  //   <>
  //     {/* if the user in logged out..... */}
  //     <Link to="/register">register</Link>

  //     <Link to="/login">login</Link>
  //   </>
  // )

  return (
    <nav>
      <Link to="/">Home</Link>

      {currentUser ? loggedIn : ''}
    </nav>
  )
}