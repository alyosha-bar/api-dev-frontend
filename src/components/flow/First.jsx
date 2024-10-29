import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";


const First = () => {

    const [apiName, setAPIName] = useState('')
    const [limit, setLimit] = useState()
    const [description, setDescription] = useState('')
    const [apiToken, setApiToken] = useState('')

    const {user} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()

        // pass token to the slide 2 (next slide)
        fetch(`${import.meta.env.VITE_SERVER_URL}/generateApiInfo`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
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
        <div className="flex">
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
                </form>
            </div>
            {apiToken && <div className="flex flex-col justify-between items-center w-4/5 p-4 bg-blue-400 rounded-lg">
                <label htmlFor="token" className=""> API Token: </label> 
                <p className="text-white bg-black p-4 w-4/6 text-wrap break-all" name="token"> { apiToken }</p>
                <button className="text-black bg-blue-200 p-4" onClick={() => {copyToken(apiToken)}}> Copy </button>

                <div>
                    <p className="text-black text-lg p-2"> Save the user token and the api token in your application's ENV variables</p>
                    <div className="flex justify-center items-center my-6">
                        <p className="text-red-700 w-3/5 flex justify-center items-center border border-solid border-red-700 p-2 rounded-md bg-gray-100"> KEEP THE TOKEN SECRET. IF IT IS REVEALED REGENERATE: <br /> (1) THE API TOKEN IN YOUR API DASHBOARD.</p>
                    </div>
                </div>

            </div> }
        </div>
    );
}
 
export default First;