import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { useAuthStore } from "../stores/authStore";

const Home = () => {

    const [apis, setApis] = useState()
    const [loading, setLoading] = useState()
    const [error, setError] = useState(null)

    const user = useAuthStore((state) => state.user)

    const navigate = useNavigate()

    useEffect( () => {
        
        if (user) {
            const authToken = localStorage.getItem('authToken')
            if (!authToken) {
                console.log('You need to log in first');
                return;
            }

            console.log(user)

            fetch(`${import.meta.env.VITE_SERVER_URL}/home/${user.uid}`, {
                credentials: "include",
                headers: {
                    'Content-Type' : "application/json",
                    'Authorization': `Bearer ${authToken}`
                }
            })
            .then((response) => {
                if (!response.ok) {
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

    }, [user])

    useEffect(() => {
        if (!user) {
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

    return (
        <div className="bg-white h-full mb-32">
            {/* <button onClick={() => console.log(apis)}> Check APIS </button> */}
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
                        <h3 className="text-xl font-bold mb-2">{api.name}</h3>
                        <p className="text-gray-700">{api.description}</p>
                        {/* <p className="text-gray-500 text-sm"> Additional Information which fills up space </p> */}
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