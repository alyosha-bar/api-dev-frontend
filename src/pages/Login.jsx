import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../contexts/UserContext'

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {user, putUser, logout} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logging in...')


        fetch('api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "Email": email, "Password": password })
        }).then((res) => {
            console.log(res)
            if(!res.ok){
                console.log('Login validating')
                throw new Error("Invalid Login.")
            } 
            return res.json()
        }).then ( (data) => {
            putUser(data)
            console.log(user)
            navigate('/')
        })
        .catch((err) => {
            console.error('Error:', err); // Log network or server errors
        });

        

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