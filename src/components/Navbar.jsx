import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const Navbar = () => {

    const navigate = useNavigate()

    const logOut = () => {
        logout()

        // remove cookie
        // Set the cookie's max-age to 0 to remove it
        document.cookie = "authToken=; path=/; max-age=0";
        navigate('/login')
    }

    const logout = useAuthStore((state) => state.logUserOut)
    const user = useAuthStore((state) => state.user)

    return ( 
        <nav className='bg-blue-300 py-6 px-6'>
        <div className='container mx-auto flex justify-between items-center'>
          {/* Logo */}
          <h2 className='text-2xl font-bold text-gray-800'> <Link to='/'> API-Track </Link></h2>
  
          {/* Navigation Links */}
          <div className='space-x-6 flex items-center'>
            {user ? (
              <div className='flex items-center space-x-4'>
                <Link
                  to='/home'
                  className='text-black hover:text-blue-500 font-medium'
                >
                  Home
                </Link>
                {/* Uncomment the Dashboard link if needed */}
                <Link to={`/account/${user.uid}`} className='text-black hover:text-blue-500 font-medium'>
                  Account
                </Link>
                <button
                  className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition'
                  onClick={logOut}
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className='flex items-center space-x-4'>
                <Link
                  to='/login'
                  className='text-black hover:text-blue-500 font-medium'
                >
                  Login
                </Link>
                <Link
                  to='/signup'
                  className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition'
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
}
 
export default Navbar;