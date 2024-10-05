import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const Signup = () => {

    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const newUser = {
            "Email": email,
            "Password": password
        }

        const signUp = (newUser) => {
            
            // validate inputs


            // fetch request
            fetch('/api/signup', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newUser)
            })
            .then( (res) => {
                if (!res.ok) {
                    throw new Error("Bad Request!")
                }
                return res.json()
            }).then( (data) => {
                console.log(data)
                navigate('/')
                // put the user in to the Context as well
                // later 
            }).catch( (err) => {
                console.error(err)
            })


        }

        console.log("Registering")
        signUp(newUser)
        console.log("Registered")
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
          </form>
        </div>
      </div>
     );
}
 
export default Signup;