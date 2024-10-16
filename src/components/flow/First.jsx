import { useState } from "react";


const First = () => {

    const [apiName, setAPIName] = useState('')
    const [limit, setLimit] = useState()
    const [description, setDescription] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        // pass token to the slide 2 (next slide)
        fetch('/api/generateApiInfo', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: apiName,
                description: description,
                limit: limit
            })
        })

        // put into the APIs doc for the USER --> apiname, description, limit



        console.log(apiName)
        console.log(limit)
        console.log(description)
    }


    return ( 
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
    );
}
 
export default First;