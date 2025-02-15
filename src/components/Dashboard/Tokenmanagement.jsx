import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Tokenmanagement = ({apiId}) => {

    const [token, setToken] = useState("asfowufasfvawdd")
    const [isHidden, setIsHidden] = useState(true)

    useEffect(() => {
        const fetchToken = async () => {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api-token/${apiId}`)

            if (!response.ok) {
                throw new Error("Error fetching token.")
            }

            const data = await response.json()
            console.log(data)
            setToken(data.token.token)
        }

        fetchToken()
    }, [apiId])


    const regenrateToken = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/regenerate/${apiId}`)

        if (!response.ok) {
            throw new Error("Error fetching token.")
        }

        const data = await response.json()
        console.log(data)
        setToken(data.token)
    }

    return ( 
        <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {token && (
          <div className="mb-4 text-center text-lg font-medium text-gray-700">
            <p className="mb-1">Token:</p>
            <div 
              className="font-mono bg-gray-200 text-gray-900 px-3 py-2 rounded-md block w-full min-h-[2.5rem] overflow-x-auto break-all"
            >
              {isHidden ? "******************" : token}
            </div>
          </div>
        )}
        <div className="flex justify-between space-x-4">
          <button
            className="w-1/2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
            onClick={() => setIsHidden(!isHidden)}
          >
            {isHidden ? "Show" : "Hide"} Token
          </button>
          <button
            className="w-1/2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
            onClick={regenrateToken}
          >
            Regenerate Token
          </button>
        </div>
      </div>
    </div>
    );
}
 
export default Tokenmanagement;