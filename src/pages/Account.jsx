import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";


const Account = () => {

    const { user } = useContext(UserContext)
    const [userToken, setUserToken] = useState('')

    const generateUserToken = () => {
        
        // take in user uid

        // transform using encryption algorithm with a version number
        // call backend so the process is secure
        fetch('/api/generate', {
            method: 'POST',
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

        <div className="p-2">
            <h2 className="text-black text-xl">Account info for {user.uid}</h2>
            <ul >
                <li className="text-black">Dashboard of all API usage</li>
                <li className="text-black">Pricing</li>
                <li className="text-black">Allow to regenerate user token</li>
                <li className="text-black">Reset Password</li>
                <li className="text-black">Delete Account</li>
            </ul>


            <div className="bg-gray-200 p-6">
                <p className="text-black p-2 text-lg"> Generate a user token and an api token for your api. </p>
                <div className="text-black">
                    <button onClick={generateUserToken} className="bg-gray-200 p-2"> Generate User Token </button>
                    <div className="flex justify-between">
                        <p className="text-white bg-black p-4 w-4/5 break-words whitespace-normal"> { userToken }</p>
                        <button onClick={() => {copyToken(userToken)}} className="bg-blue-500 text-white p-4"> Copy </button>
                    </div>
                </div>
            </div>


        </div>

    );
}
 
export default Account;