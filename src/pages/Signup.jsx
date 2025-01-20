import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { UserContext } from "../contexts/UserContext";

const Signup = () => {

    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')

    const [error, setError] = useState('')

    const navigate = useNavigate()
    
    const {user, putUser} = useContext(UserContext)

    const validateCredentials = (email, confirmEmail, password, confirmPassword) => {
      if (email != confirmEmail || password != confirmPassword) {
        return false;
      }

      return true
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        const valid = validateCredentials(email, confirmEmail, password, confirmPassword)

        if (valid) {
          createUserWithEmailAndPassword(auth, email, password)
          .then( (userCredential) => {
            //signed up
            const userF = userCredential.user
            putUser(userF)
            return userF
          }).then( (userF) => {
            insertUser(userF)

            const authToken = localStorage.getItem('authToken')
            if (!authToken) {
                console.log('You need to log in first');
                return;
            }

            // generate an authetication token or cookie
            // generateAndStoreJWT(userF.uid, import.meta.env.VITE_AUTH_SECRET)
            fetch(`${import.meta.env.VITE_SERVER_URL}/generate-token`, {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${authToken}`
              },
              credentials: "include", // Include cookies (if any) in the request
              body: JSON.stringify({
                  userId: userF.uid
              })
            })
            .then(response => response.json())
            .then(data => {
              if (data.token) {
                  // Save the token in the Authorization header for future requests
                  const token = data.token;
  
                  console.log("Token: " + token)
  
                  // Example: setting token in Authorization header for future requests
                  // You can use localStorage, sessionStorage, or in-memory storage based on your use case
                  localStorage.setItem('authToken', token); // Save token to localStorage
  
                  // Example: setting token in the Authorization header for all future requests
                  // You can set the Authorization header globally for your fetch requests
                  // For example, using a custom function or a library like axios:
                  fetch.defaults.headers['Authorization'] = `Bearer ${token}`;
              } else {
                  console.error("Failed to generate token");
              }
            })
            .catch(error => {
              console.error("Error generating token:", error);
            });
  

            navigate('/')
          }).catch( (err) => {
            console.error(err)
          })
        } else {
          setError('Invalid Credentials.')
        }
        


        const insertUser = (newUser) => {
            
            // validate inputs
            

            // fetch request
            fetch(`${import.meta.env.VITE_SERVER_URL}/signup`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                  "uid": newUser.uid,
                  "email": newUser.email,
                  "firstname": firstname,
                  "lastname": lastname
                })
            })
            .then( (res) => {
                if (!res.ok) {
                    throw new Error("Bad Request!")
                }
                return res.json()
            }).then( (data) => {
                console.log(data)
                // put the user in to the Context as well
                // later 
            }).catch( (err) => {
                console.error(err)
            })
        }
    }

    return ( 
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Signup Page</h1>
  
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
  
            {/* Confirm Email Input */}
            <div className="label-group">
              <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-600">
                Confirm Email
              </label>
              <input
                type="email"
                name="confirmEmail"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Re-enter your email"
              />
            </div>

            {/* Confirm Email Input */}
            <div className="label-group">
              <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-600">
                Firstname:
              </label>
              <input
                type="text"
                name="confirmEmail"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Firstname"
              />
            </div>

            {/* Confirm Email Input */}
            <div className="label-group">
              <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-600">
                Lastname:
              </label>
              <input
                type="text"
                name="confirmEmail"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Lastname"
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
  
            {/* Confirm Password Input */}
            <div className="label-group">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Re-enter your password"
              />
            </div>
  
            {/* Submit Button & Login Link */}
            <div className="btn-group flex justify-between items-center">
              <Link to='/login' className="text-sm text-blue-500 hover:underline">
                Login
              </Link>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
              >
                Sign Up
              </button>
            </div>
            {error && <div className="text-red-700 flex justify-center items-center border border-solid border-red-700 p-4 rounded-md bg-gray-100">{error}</div> }
          </form>
        </div>
      </div>
     );
}
 
export default Signup;