import { useState } from "react";
import { useAuthStore } from "../../stores/authStore";


const First = () => {

    const [apiName, setAPIName] = useState('')
    const [limit, setLimit] = useState()
    const [description, setDescription] = useState('')
    const [apiToken, setApiToken] = useState('')

    const user = useAuthStore((state) => state.user)

    const handleSubmit = (e) => {
        e.preventDefault()

        const authToken = localStorage.getItem('authToken')
        if (!authToken) {
            console.log('You need to log in first');
            return;
        }

        // pass token to the slide 2 (next slide)
        fetch(`${import.meta.env.VITE_SERVER_URL}/generateApiInfo`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                uid: user.uid,
                name: apiName,
                description: description,
                limit: limit
            })
        }).then( (res) => {
            if (!res.ok) {
                throw new Error("Error Occured.")
            }
            return res.json()
        }).then( (data) => {
            setApiToken(data.token)
        })
    }


    const copyToken = (token) => {
        navigator.clipboard.writeText(token)
    }

    return ( 
        <div className="flex flex-col">
            <div className="text-sm overflow-auto h-4/5 flex flex-col justify-center items-center">
                <h2 className="text-xl font-bold text-black"> Welcome! </h2>
                    <h2 className="text-black p-2 text-lg"> Step 1 </h2>
                    <p className="text-black p-2 text-lg"> Register your API by inputting the name, limit and a short description. </p>
                <form 
                    onSubmit={(e) => handleSubmit(e)} 
                    className="flex flex-col justify-center items-center p-6 my-6 rounded-lg text-white bg-blue-400 w-3/5">
                    <h3 className="text-2xl m-2 p-2"> API Form: </h3>
                    <div className="label-group p-4 w-4/5 flex items-center justify-between">
                        <label className="" htmlFor="name"> API Name: </label>
                        <input
                            className=" w-4/6"   
                            type="text"
                            name="name"
                            value={apiName}
                            onChange={(e) => {setAPIName(e.target.value)}}
                        />
                    </div>
                    <div className="label-group p-4 w-4/5 flex items-center justify-between">
                        <label className="" htmlFor="limit"> Monthly Limit: </label>
                        <input 
                            className=" w-4/6"
                            type="number"
                            name="limit"
                            value={limit}
                            onChange={(e) => {setLimit(e.target.value)}}
                        />
                    </div>
                    <div className="label-group p-4 w-4/5 flex items-center justify-between">
                        <label className="" htmlFor="description"> Description: </label>
                        <input 
                            className=" w-4/6"
                            type="text"
                            name="description"
                            value={description}
                            onChange={(e) => {setDescription(e.target.value)}}
                        />
                    </div>
                    <button className="text-black bg-blue-200 p-4 m-4 rounded-md" type="submit"> Register API </button>
                    {apiToken && (
                        <div className="flex items-center p-4 space-x-2">
                            <p className="font-semibold">API Token:</p>
                            <p className="text-white bg-black px-4 py-2 break-all rounded" name="token">
                            {apiToken}
                            </p>
                            <button className="text-black bg-blue-200 p-4" onClick={() => {copyToken(apiToken)}}> Copy </button>
                        </div>
                        )}
                </form>
            </div>
        </div>
    );
}
 
export default First;