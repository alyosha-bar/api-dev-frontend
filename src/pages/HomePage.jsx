import Footer from "../components/homepage/Footer";
import Pricing from "../components/homepage/Pricing";
import Tech from "../components/homepage/Tech";


const HomePage = () => {
    return ( 
        <div className="">

            {/* Curved SVG Divider */}

            <div className="hero p-36 h-full flex items-center justify-around bg-cyan-200">
                <div className="title-area w-3/5">
                    <h5 className="text-black text-xl"> Some small font description of the product. </h5>
                    <h1 className="text-black text-8xl"> TRACK YOUR API USAGE. </h1>
                    <h3 className="text-black text-5xl mt-8"> NEVER OVERPAY. </h3>
                </div>
                <div className="call-to-action p-10 w-2/5 flex flex-col items-center justify-center">
                    <p className="text-black max-w-72"> API-Dev will track and analyse your 3rd party API usage and prevent you from overpaying your plan.</p>
                    <button className="text-black text-3xl w-2/5 mt-10 p-4 bg-green-400 hover:bg-green-500 rounded-lg"> Get Started </button>
                </div>
                
            </div>

            <div className="w-full overflow-hidden leading-none bg-cyan-200 ">
                <svg
                className="block w-full h-32"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
                >
                <path
                    fill="#ffffff" /* Background color for the next section */
                    fillOpacity="1"
                    d="M0,96L48,122.7C96,149,192,203,288,192C384,181,480,107,576,80C672,53,768,75,864,90.7C960,107,1056,117,1152,106.7C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
                </svg>
            </div>


            {/* <h1 className="text-black text-2xl"> HOME PAGE FOR NEW PEOPLE! </h1>
            <p className="text-black"> Explanation to what this product is.</p>
            <p className="text-black"> What languages and frameworks does it support. </p>
            <p className="text-black"> Pricing </p>
            <button className="text-black p-2 border-solid border-black border m-2"> Get Started </button> */}


            <Tech />

            <div className="w-full overflow-hidden leading-none bg-white ">
                <svg
                className="block w-full h-32"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
                >
                <path
                    fill="#C4DAD2"
                    fillOpacity="1"
                    d="M0,96L48,122.7C96,149,192,203,288,192C384,181,480,107,576,80C672,53,768,75,864,90.7C960,107,1056,117,1152,106.7C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
                </svg>
            </div>

            <Pricing/>

            <Footer />

        </div>
    );
}
 
export default HomePage;