import { useState } from "react"

const Second = () => {

    const [userToken, setUserToken] = useState('')
    const [apiToken, setApiToken] = useState('')

    const user = useAuthStore((state) => state.user)


    const generateApiToken = () => {
        
        // take in api-name & id from the previous slide
        fetch(`${import.meta.env.VITE_SERVER_URL}/generateApiToken/${id}`, {
            method: 'POST',
            credentials: "include",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: apiName
            })
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Error generating the token.")
            }
            return res.json()
        }).then( (data) => {
            setApiToken(data.token)
        }).catch( (err) => {
            console.error(err)
        })
    }


    const getRandomString = (length = 15) => {
        alert("This will invalidate your old token. ")
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
    
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    
        return result;
    }


    const copyToken = (token) => {
        navigator.clipboard.writeText(token)
    }

    return ( 
        <div className="text-black flex flex-col">
            <h2 className="text-black p-2 text-lg"> Step 2 </h2>
            <p className="text-black p-2 text-lg"> Generate a user token and an api token for your api. </p>
            {/* <div className="text-black">
                <button onClick={generateUserToken} className="bg-gray-200 p-2"> Generate User Token </button>
                <div className="flex justify-between">
                    <p className="text-white bg-black p-4 w-4/5 break-words whitespace-normal"> { userToken }</p>
                    <button onClick={() => {copyToken(userToken)}} className="bg-blue-500 text-white p-4"> Copy </button>
                </div>
            </div> */}
            <div className="text-black">
                <button onClick={generateApiToken} className="bg-gray-200 p-2"> Generate API Token </button>
                <div className="flex justify-between">
                    <p className="text-white bg-black p-4 w-4/5"> { apiToken }</p>
                    <button onClick={() => {copyToken(userToken)}} className="bg-blue-500 text-white p-4"> Copy </button>
                </div>
            </div>

            <p className="text-black text-lg p-2"> Save the user token and the api token in your application's ENV variables</p>
            <div className="flex justify-center items-center my-6">
                <p className="text-red-700 w-3/5 flex justify-center items-center border border-solid border-red-700 p-2 rounded-md bg-gray-100"> KEEP THESE TOKENS SECRET. IF THEY ARE REVEALED REGENERATE: <br /> (1) THE USER TOKEN IN YOUR USER DASHBOARD. <br /> (2) THE API TOKEN IN YOUR API DASHBOARD.</p>
            </div>

        </div>
    );
}
 
export default Second;