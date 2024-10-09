import { useParams } from "react-router-dom";
import Linechart from "../components/charts/linechart";
import SimplePieChart from "../components/charts/SimplePieChart";
import { Link } from "react-router-dom";

const Dashboard = () => {

    const {id} = useParams()

    // fetch dashboard data for specified API ID from params
      


    return ( 
        <div className="bg-white h-screen flex justify-between flex-row">
            <nav className="sidebar w-1/6 bg-blue-200">
                <div className="flex justify-between items-center p-4">
                    <h2 className="p-8 text-black text-2xl"> All APIs: </h2>
                    <button className="text-black text-2xl"> {"<"}</button>
                </div>
                <ul className="flex flex-col p-10">
                    <li className="text-black p-2 my-4"> <Link className="border border-solid border-black p-4"> Open AI API </Link> </li>
                    <li className="text-black p-2 my-4 w-2/3"> <Link className="border border-solid border-black p-4"> News API </Link> </li>
                    <li className="text-black p-2 my-4 w-2/3"> <Link className="border border-solid border-black p-4"> Weather API </Link> </li>
                    <li className="text-black p-2 my-4 w-2/3"> <Link className="border border-solid border-black p-4"> Surfing API </Link> </li>
                    <li className="text-black p-2 my-4 w-2/3"> <Link className="border border-solid border-black p-4"> Youtube API </Link> </li>
                </ul>
            </nav>

            <div className="dashboard w-4/5 p-32">
                <div className="flex justify-around w-5/5">
                    <div className="border border-solid border-gray-200 w-1/5 flex flex-col justify-center p-4">
                        <h5 className="text-black text-sm"> Total Requests: </h5>
                        <h3 className="text-black text-3xl p-2 self-center"> 10,820</h3>
                    </div>
                    <div className="border border-solid border-gray-200 w-1/5 flex flex-col justify-center p-4">
                    <h5 className="text-black text-sm"> Total Requests: </h5>
                        <h3 className="text-black text-3xl p-2 self-center"> 10,820</h3>
                    </div>
                    <div className="border border-solid border-gray-200 w-1/5 flex flex-col justify-center p-4">
                        <h5 className="text-black text-sm"> Total Requests: </h5>
                        <h3 className="text-black text-3xl p-2 self-center"> 10,820</h3>
                    </div>
                </div>
                <div className="flex p-4 w-full justify-center items-center">
                    <div className="text-black h-full p-10">
                        <Linechart/>
                    </div>
                    <div className="text-black h-full p-10">
                        <SimplePieChart />
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Dashboard;