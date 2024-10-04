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
        <div className="login-page">
            <form className="login-form"  onSubmit={handleSubmit}>
                <h1 className="title"> Signup Page</h1>

                <div className="label-group">
                    <label htmlFor="email"> Email: </label>
                    <input 
                        type="email" 
                        name="email" 
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="label-group">
                    <label htmlFor="email"> Confirm Email: </label>
                    <input 
                        type="email" 
                        name="email" 
                        value = {confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                    />
                </div>

                <div className="label-group">
                    <label htmlFor="password"> Password: </label>
                    <input 
                        type="password" 
                        name="password" 
                        value = {password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="label-group">
                    <label htmlFor="password"> Confirm Password: </label>
                    <input 
                        type="password" 
                        name="password" 
                        value = {confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className="btn-group">
                    <Link to='/login'> Login </Link>
                    <button type="submit"> Sign Up </button>
                </div>
            </form>
        </div>
     );
}
 
export default Signup;