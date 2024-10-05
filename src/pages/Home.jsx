import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext} from '../contexts/UserContext'

const Home = () => {

    const [apis, setApis] = useState([])
    const [loading, setLoading] = useState()

    const {user, putUser} = useContext(UserContext)

    useEffect( () => {

        if (user) {
            fetch('/api/home')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setApis(data)
                })
                .catch( (err) => {
                console.log(err)
                })
        }

        // setApis(testData)
    }, [user])

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user])


    const navigate = useNavigate()

    const goToDash = (id) => {
        navigate(`/dashboard/${id}`) //replace with actual id
    }

    const startFlow = () => {
        alert(' Starting API Registration Flow! ')

        // 


    }

    return (
        <div className="bg-white">
        <h1 className="text-black text-5xl p-10 text-bold"> Registered APIs </h1>
        <div className="bg-white p-10 h-full flex justify-center align-center">
            <div className="grid gap-12 p-2 mt-4 w-[90vw] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

            {apis &&
                apis.map((api) => (
                <div
                    className="bg-indigo-300 min-h-16 w-[350px] p-6 rounded-lg transition-transform duration-100 ease-in-out card hover:scale-105 cursor-pointer"
                    onClick={() => {
                    goToDash(api.id);
                    }}
                    key={api.id}
                >
                    <h3 className="text-xl font-bold mb-2">{api.title}</h3>
                    <p className="text-gray-700">{api.description}</p>
                    <p className="text-gray-500">Used in project name</p>
                </div>
                ))}
            <button
                className="w-[350px] min-h-16 text-black bg-white border border-black text-6xl rounded-lg transition-all duration-100 ease-in add hover:text-indigo-500 hover:border-indigo-500 hover:text-7xl focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500"
                onClick={startFlow}
            >
                +
            </button>
            </div>
        </div>
        </div>
     );
}
 
export default Home;