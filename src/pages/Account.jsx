import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";


const Account = () => {

    const { user } = useContext(UserContext)
    const [userToken, setUserToken] = useState('asdawd12knasd12e')

    const [accountInfo, setAccountInfo] = useState()


    const navigate = useNavigate()

    useEffect( () => {
        if(!user) {
            navigate('/login')
        }
    }, [user])


    useEffect( () => {
        // fetch /api/account/:uid
        fetch(`${import.meta.env.VITE_SERVER_URL}/account/${user.uid}`, {
            method: 'GET',
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
        }).then( (data) => {
            // setUserToken(data.token)
            console.log("account info: ")
            console.log(data)
            setAccountInfo(data[0])
        }).catch( (err) => {
            console.error(err)
        })

    }, [])


    const generateUserToken = () => {
        
        // take in user uid

        // transform using encryption algorithm with a version number
        // call backend so the process is secure
        fetch(`${import.meta.env.SERVER_URL}/generate`, {
            method: 'POST',
            credentials: "include",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                uid: user.uid
            })
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
        }).then( (data) => {
            setUserToken(data.token)
        }).catch( (err) => {
            console.error(err)
        })

        // save to db?


        // setUserToken(getRandomString())
    }


    const copyToken = (token) => {
        navigator.clipboard.writeText(token)
    }

    return ( 
        <div className="flex justify-center my-10 mb-32">
        <div className="flex flex-col justify-center items-center w-full max-w-lg border border-gray-300 rounded-lg shadow-md p-4 md:p-6 bg-white">
            
            {/* Basic Information Section */}
            {accountInfo && (
                <div className="w-full mb-6">
                    <h2 className="text-gray-800 text-xl md:text-2xl font-bold mb-4">Profile Details:</h2>
                    <div className="flex flex-col sm:flex-row sm:justify-between text-gray-700 mb-2">
                        <p>Username: <span className="font-semibold">{accountInfo.username}</span></p>
                        <p>Email: <span className="font-semibold">{accountInfo.email}</span></p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between text-gray-700 mt-2">
                        <p>First Name: <span className="font-semibold">{accountInfo.firstname}</span></p>
                        <p>Last Name: <span className="font-semibold">{accountInfo.lastname}</span></p>
                    </div>
                    <button className="mt-6 text-red-500 font-semibold px-4 py-2 border border-red-500 rounded hover:bg-red-500 hover:text-white w-full sm:w-auto">
                        Reset Password
                    </button>
                </div>
            )}

            <div className="w-full border-t border-gray-300 my-4"></div>

            {/* User Token Management Section */}
            <div className="w-full">
                <h2 className="text-gray-800 text-xl md:text-2xl font-bold mb-4">User Token Management:</h2>
                
                <div className="flex flex-col sm:flex-row items-center justify-between mb-4 space-y-2 sm:space-y-0">
                    <button className="text-gray-700 px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 hover:text-white w-full sm:w-auto">
                        Show Token
                    </button>
                    <div className="flex items-center w-full sm:w-auto">
                        <p className="text-white bg-black px-4 py-2 rounded-l break-all w-full sm:w-48">{userToken}</p>
                        <button 
                            onClick={() => copyToken(userToken)} 
                            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
                        >
                            Copy
                        </button>
                    </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-gray-700 mb-2">Regenerate token if necessary.</p>
                    <button 
                        onClick={generateUserToken} 
                        className="bg-blue-200 text-blue-800 px-3 py-1 rounded hover:bg-blue-300 w-full sm:w-auto"
                    >
                        Generate User Token
                    </button>
                </div>
            </div>

            <div className="w-full border-t border-gray-300 my-4"></div>

            {/* Account Deletion Section */}
            <div className="w-full text-center">
                <button className="text-red-500 font-semibold px-4 py-2 border border-red-500 rounded hover:bg-red-500 hover:text-white w-full sm:w-auto">
                    Delete Account
                </button>
            </div>
        </div>
    </div>

    );
}
 
export default Account;