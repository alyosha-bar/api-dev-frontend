import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";


const Account = () => {

    const { user } = useContext(UserContext)
    const [userToken, setUserToken] = useState('asdawd12knasd12e')

    const navigate = useNavigate()

    useEffect( () => {
        if(!user) {
            navigate('/login')
        }
    }, [user])


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
        <div className="flex justify-center my-10">
            <div className="flex flex-col justify-center items-center w-2/5 border-l border-r border-solid border-black">

                {/* <h2 className="text-black text-xl">Account info for {user.uid}</h2>
                <ul >
                    <li className="text-black">Dashboard of all API usage</li>
                    <li className="text-black">Pricing - which plan they are on?</li>
                    <li className="text-black">Allow to regenerate user token</li>
                    <li className="text-black">Reset Password</li>
                    <li className="text-black">Delete Account</li>
                </ul> */}

                <div className="p-10 px-36 w-full">
                    <h1 className="text-black text-2xl font-bold p-4"> Profile Details: </h1>
                    <div className="flex justify-between py-4">
                        <div className="text-black"> Username: <i className="text-black"> Alyosha </i> </div>
                        <div className="text-black"> Email: <i className="text-black"> alohahoy@gmail.com </i> </div>
                    </div>
                    <div className="flex justify-between py-4">
                        <div className="text-black"> Firstname: <i className="text-black"> Alexey </i> </div>
                        <div className="text-black"> Lastname: <i className="text-black"> Baryshnikov </i> </div>
                    </div>
                    <button className="text-red-300 font-semibold p-3 border border-solid border-red-300 bg-gray-200"> Reset Password </button>
                </div>

                <div className="divider border-t border-solid border-black w-4/5 p-4"></div>

                <div className="py-4">
                    <h1 className="text-black text-2xl font-bold p-4"> User Token Management: </h1>

                    <div className="flex justify-between w-full items-center">
                        <button className="text-black p-1 border border-black "> Show Token </button>
                        <div className="flex justify-between">
                            <p className="text-white bg-black p-4 w-3/5 break-words whitespace-normal"> { userToken } </p>
                            <button onClick={() => {copyToken(userToken)}} className="bg-blue-500 text-white p-4"> Copy </button>
                        </div>
                    </div>

                    <div className="bg-gray-200 p-6">
                        <p className="text-black p-2 text-lg"> Regenerate token if revealed. </p>
                        <div className="text-black">
                            <button onClick={generateUserToken} className="bg-blue-200 p-2"> Generate User Token </button>
                            <div className="flex justify-between">
                                <p className="text-white bg-black p-4 w-4/5 break-words whitespace-normal"> { userToken }</p>
                                <button onClick={() => {copyToken(userToken)}} className="bg-blue-500 text-white p-4"> Copy </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="divider border-t border-solid border-black w-4/5 p-4 my-10"></div>

                <div className="py-4">
                    <button className="text-red-300 font-semibold p-3 border border-solid border-red-300 bg-gray-200"> Delete Account </button>
                </div>


            </div>
        </div>

    );
}
 
export default Account;