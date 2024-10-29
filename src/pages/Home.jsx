import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext} from '../contexts/UserContext'
import Modal from "../components/Modal";

const Home = () => {

    const [apis, setApis] = useState()
    const [loading, setLoading] = useState()
    const [error, setError] = useState(null)

    const {user, putUser} = useContext(UserContext)

    const navigate = useNavigate()

    useEffect( () => {

        if (user) {
            // fetch(`/api/home/${user.uid}`)
            fetch(`/api/home/${user.uid}`)
            .then((response) => {
                if (!response.ok) {
                    // If the response status is not OK (e.g., 404 or 500), throw an error
                    return response.json().then((errorData) => {
                        // Store the full error response in state
                        setError(errorData); // errorData contains the message, status, etc.
                        throw new Error(errorData.message || "Something went wrong");
                    });
                }
                // If the response is OK, return the parsed JSON data
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setApis(data.apis); // Assuming setApis updates state with API response data
            })
            .catch((err) => {
                // Optionally handle other unexpected errors (network issues, etc.)
                console.log(err.message); // Log error to console for debugging
            });        
        }

        // setApis(testData)
    }, [user])

    useEffect(() => {
        if (!user) {
            console.log("bruh bruh")
            navigate('/login')
        }
    }, [user])


    const goToDash = (id) => {
        navigate(`/dashboard/${id}`) //replace with actual id
    }


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);


    const nextSlide = () => {
        if (currentSlide < 3) {
            setCurrentSlide(currentSlide + 1);
        } else {
            console.log(currentSlide)
            setIsModalOpen(false); // Close modal after last slide
        }
    }

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        } else {
            setIsModalOpen(false); // Close modal after last slide
        }
    }


    const finishFlow = () => {
        setIsModalOpen(false); // Close modal when finishing
        setCurrentSlide(0)
        console.log("Flow finished!");
    };

    const checkAuthToken = () => {
        // Check for the 'authToken' cookie in document.cookie
        const cookies = document.cookie.split("; ").find(row => row.startsWith("authToken="));

        // Update the state based on whether the authToken cookie is found
        if (cookies) {
            console.log("Auth token cookie exists!");
        } else {
            console.log("Auth token cookie not found.");
        }
    };


    return (
        <div className="bg-white h-full mb-32">
            
            {/* <button onClick={checkAuthToken}> Check cookie </button>
            <button onClick={() => {document.cookie = `testCookie=testValue; path=/; max-age=${60 * 60}; samesite=strict`;
}}> Basic Cookie </button> */}

            <h1 className="text-black text-5xl p-10 text-bold"> Registered APIs </h1>
            <div className="bg-white p-10 h-full flex justify-center align-center">
                {/* <button className="text-black" onClick={() => {console.log(apis)}}>APIS</button> */}
                {/* {error && (
                        <div className="text-black-500">
                            <h3 className="text-black"> {error.message || "Unknown error occurred"}</h3>
                            {error.details && <p>{error.details}</p>}
                        </div>
                    )} */}
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
                        <h3 className="text-xl font-bold mb-2">{api.name}</h3>
                        <p className="text-gray-700">{api.description}</p>
                        <p className="text-gray-500 text-sm"> Additional Information which fills up space </p>
                    </div>
                    ))}
                <button
                    className="w-[350px] p-10 min-h-40 text-black bg-white border border-black text-6xl rounded-lg transition-all duration-100 ease-in add hover:text-indigo-500 hover:border-indigo-500 hover:text-7xl focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500"
                    onClick={() => {
                        setIsModalOpen(true)
                    }}
                >
                    +
                </button>
                </div>
            </div>
            <Modal isOpen={isModalOpen} closeModal={() => {
                    setIsModalOpen(false)
                    setCurrentSlide(0)
                }} index={currentSlide}>

                {/* pass in the components for each slide */}
                {/* <p className="mt-4 text-black">{slides[currentSlide].content}</p> */}

                <div className="flex justify-between py-4 ">
                    {currentSlide > 0 && (
                        <button
                            onClick={prevSlide}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Back
                        </button>)}

                    
                    
                    <div className="flex justify-end">
                        {currentSlide < 3? (
                            <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mx-2"
                            onClick={nextSlide}
                            >
                            Next
                            </button>
                        ) : (
                            <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
                            onClick={finishFlow}
                            >
                            Finish
                            </button>
                        )}

                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mx-2"
                            onClick={() => {
                                setIsModalOpen(false)
                                setCurrentSlide(0)}}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
     );
}
 
export default Home;