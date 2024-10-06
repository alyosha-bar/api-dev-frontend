import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext} from '../contexts/UserContext'
import Modal from "../components/Modal";

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
    }, [])


    const navigate = useNavigate()

    const goToDash = (id) => {
        navigate(`/dashboard/${id}`) //replace with actual id
    }


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { title: "Welcome", content: "This is the first slide" },
        { title: "Step 1", content: "This is the second slide" },
        { title: "Step 2", content: "This is the third slide" },
        { title: "Finish", content: "You have completed all the steps!" },
    ];


    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
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
                onClick={() => {setIsModalOpen(true)}}
            >
                +
            </button>
            </div>
        </div>
        <Modal isOpen={isModalOpen} closeModal={() => {
                setIsModalOpen(false)
                setCurrentSlide(0)
            }}>

            {/* pass in the components for each slide */}
            <h2 className="text-xl font-bold text-black">{slides[currentSlide].title}</h2>
            <p className="mt-4 text-black">{slides[currentSlide].content}</p>

            <div className="flex justify-end">
            
            {currentSlide > 0 && (
                <button
                    onClick={prevSlide}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Back
                </button>)}

            
            

            {currentSlide < slides.length - 1 ? (
                <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
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
            </div>
        </Modal>
        </div>
     );
}
 
export default Home;