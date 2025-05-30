import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthStore } from "../stores/authStore";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // const {user, putUser, logout} = useContext(UserContext)

    const user = useAuthStore((state) => state.user)

    const getUserData = useAuthStore((state) => state.getAccountInfo)

    useEffect(() => {
      if(user) {
        navigate('/home')
      }
    }, [user])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logging in...')

        signInWithEmailAndPassword(auth, email, password)
        .then( (userCredential) => {
          const userF = userCredential.user
          // putUser(userF)

          // generate an authetication token or cookie
          // generateAndStoreJWT(userF.uid, import.meta.env.VITE_AUTH_SECRET)

          // make request to server to generate token.
          fetch(`${import.meta.env.VITE_SERVER_URL}/generate-token`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include", // Include cookies (if any) in the request
            body: JSON.stringify({
                uid: userF.uid,
            })
          })
          .then(response => response.json())
          .then(data => {
            console.log("response received from the server.")
            if (data.token) {
                // Save the token in the Authorization header for future requests
                const token = data.token; 
                localStorage.setItem('authToken', token);

                // fetch.defaults.headers['Authorization'] = `Bearer ${token}`;


                // fetch account data from the server
                getUserData(userF.uid)

            } else {
                console.error("Failed to generate token");
            }
          })
          .catch(error => {
            console.error("Error generating token:", error);
          });

          navigate('/home')
        }).catch( (err) => {
          console.error(err)
        })
        
        setEmail('')
        setPassword('')
    }    
    



    return ( 
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Login Page</h1>
  
            {/* Email Input */}
            <div className="label-group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
  
            {/* Password Input */}
            <div className="label-group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
  
            {/* Submit Button & Signup Link */}
            <div className="btn-group flex justify-between items-center">
              <Link to='/signup' className="text-sm text-blue-500 hover:underline">
                Create a new account
              </Link>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
  
     );
}
 
export default Login;