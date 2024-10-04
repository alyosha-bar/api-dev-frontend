import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {

    const navigate = useNavigate()

    const logOut = () => {
        putUser(null)
        // delete cookie
        // cookies.remove('Authorization')
        navigate('/login')
    }

    const {user, putUser} = useContext(UserContext);

    return ( 
        <nav className='navbar'>
            <h2 className="logo"> API-Dev </h2>
            {user ? 
                <div className='links'> 
                    <Link to='/'> Home </Link>
                    {/* <Link to='/dashboard'> Dashboard </Link> */}
                    <button className="logout" onClick={logOut}> Log Out </button>
                </div>
             : <div className="links">
                    <Link to='/login'> Login </Link>
                    <Link to='/signup'> Signup </Link>
                </div>
            }
        </nav>
    );
}
 
export default Navbar;