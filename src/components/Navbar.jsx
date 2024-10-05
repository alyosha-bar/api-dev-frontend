import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {

    const navigate = useNavigate()

    const logOut = () => {
        putUser(null)
        navigate('/login')
    }

    const {user, putUser} = useContext(UserContext);

    return ( 
        <nav className='bg-white border-b border-gray-200 py-4 px-6'>
        <div className='container mx-auto flex justify-between items-center'>
          {/* Logo */}
          <h2 className='text-2xl font-bold text-gray-800'>API-Dev</h2>
  
          {/* Navigation Links */}
          <div className='space-x-6 flex items-center'>
            {user ? (
              <div className='flex items-center space-x-4'>
                <Link
                  to='/'
                  className='text-gray-600 hover:text-blue-500 font-medium'
                >
                  Home
                </Link>
                {/* Uncomment the Dashboard link if needed */}
                {/* <Link to='/dashboard' className='text-gray-600 hover:text-blue-500 font-medium'>
                  Dashboard
                </Link> */}
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
                  className='text-gray-600 hover:text-blue-500 font-medium'
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