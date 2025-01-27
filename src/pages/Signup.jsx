import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { insertUser, validateCredentials } from "../auth/authFunctions";

const Signup = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')

    const [error, setError] = useState('')

    const navigate = useNavigate()

    // validate credentials 

    // generate auth token

    // generate user token

    // signup user


    const handleSubmit = (e) => {
        e.preventDefault()

        const valid = validateCredentials(email, confirmEmail, password, confirmPassword)

        if (!valid) {
          setError("Invalid Credentials.")
          setEmail("")
          setConfirmEmail("")
          setConfirmPassword("")
          setPassword("")
          setFirstname("")
          setLastname("")
          return
        }


        
        createUserWithEmailAndPassword(auth, email, password)
        .then( (userCredential) => {
          //signed up
          const userF = userCredential.user
          
          console.log("User created in Firebase.")

          // replace / remove
          // putUser(userF)
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
                console.log(data.token)
                // Save the token in the Authorization header for future requests
                const token = data.token; 
                localStorage.setItem('authToken', token);
            } else {
                console.error("Failed to generate token");
            }
          })
          .catch(error => {
            console.error("Error generating token:", error);
          });
          
          const authToken = localStorage.getItem('authToken')
          if (!authToken) {
              console.log('You need to log in first');
              return;
          }
          

          // return firebase user
          return userF
        }).then( (userF) => {
          
          console.log("inserting user")
          
          // insert user into database
          insertUser(userF, firstname, lastname, username)
        
        }).catch( (err) => {
          console.error(err)
        })

        // navigate to Login --> where authToken and local storage will be managed
        navigate('/login')
        
        
    }


    return ( 
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Signup Page</h1>
            
            {/* Username Input */}
            <div className="label-group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
              />
            </div>
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