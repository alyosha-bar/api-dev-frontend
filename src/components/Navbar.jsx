import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate()

    // const logOut = () => {
    //     logout()
    //     // delete cookie
    //     cookies.remove('Authorization')
    //     navigate('/login')
    // }

    const user = "smth";

    return ( 
        <nav className='navbar'>
            <h2 className="logo"> API-Dev </h2>
            {user ? 
                <div className='links'> 
                    <Link to='/'> Home </Link>
                    {/* <Link to='/dashboard'> Dashboard </Link> */}
                    <button className="logout" > Log Out </button>
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