import { useParams } from "react-router-dom";
import Linechart from "../components/charts/linechart";
import SimplePieChart from "../components/charts/SimplePieChart";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";



const Dashboard = () => {

    const {id} = useParams()
    const [totalreq, setTotalReq] = useState()
    const [errorRate, setErrorRate] = useState()
    const [latestMonth, setLatestMonth] = useState()
    const [lineData, setLineData] = useState([{}])
    // fetch dashboard data for specified API ID from params
    

    useEffect( () => {
        fetch(`/api/trackinfo/${id}`, {
            method: 'GET'
        }).then( (res) => {
            if (!res.ok) {
                throw new Error("Error fetching dashboard.")
            }
            return res.json()
        }).then( (data) => {
            console.log(data)
            
            // iterate thru data to make a new structure with month instead of the dates
            const monthData = formatData(data)

            setLineData(monthData)

            // must get latest entry --> should be the last in the data array
            const latestEntry = data[data.length - 1]
            const month = monthData[data.length - 1].month
            setTotalReq(latestEntry.total_req)
            setLatestMonth(month)
            setErrorRate((latestEntry.errorcount / latestEntry.total_req) * 100)
        })
    }, [])


    const getMonthName = (startDate) => {
        const date = new Date(startDate);
        const options = { month: 'long' };
        return date.toLocaleString('en-US', options);
    }

    const formatData = (data) => {

        const monthData = []


        // Loop through each item in the data array
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            // Create a new object for the current item
            const newItem = {
                id: item.id,
                api_id: item.api_id,
                // Convert start_date and end_date to month names
                month: getMonthName(item.start_date),
                total_req: item.total_req,
                limitreq: item.limitreq
            };
            // Add the new item to the newData array
            monthData.push(newItem);
        }

        return monthData;
    }


    return ( 
        <div className="bg-white h-screen overflow-hidden flex justify-center flex-row">
            {/* <nav className="sidebar w-1/6 bg-blue-200">
                <div className="flex justify-between items-center p-4">
                    <h2 className="p-8 text-black text-2xl"> All APIs: </h2>
                    <button className="text-black text-2xl"> {"<"}</button>
                </div>
                <ul className="flex flex-col p-10">
                    <li className="text-black p-2 my-4 w-2/3"> <button onClick={() => {alert("Modal to regenerate API token")}} className="border border-solid border-black p-4"> Manage API Token </button> </li>
                </ul>
            </nav> */}

            <div className="dashboard flex flex-col w-3/5 p-10">
                <div className="flex justify-around w-5/5">
                    
                    {totalreq && <div className="border border-solid border-green-600 w-1/5 flex flex-col justify-center p-4">
                        <h5 className="text-green-600 text-sm"> Total Requests: </h5>
                        <h3 className="text-green-600 text-3xl p-2 self-center"> {totalreq.toLocaleString()} <div className="text-green-600 text-sm">requests in {latestMonth} </div> </h3>
                    </div>}
                    {errorRate && <div className="border border-solid border-red-600 w-1/5 flex flex-col justify-center p-4">
                    <h5 className="text-red-600 text-sm"> Error Rate: </h5>
                        <h3 className="text-red-600 text-3xl p-2 self-center"> {errorRate.toFixed(2)}% </h3>
                    </div>}
                    <div className="border border-solid border-gray-200 w-1/5 flex flex-col justify-center p-4">
                        <h5 className="text-black text-sm"> Avg Latency: </h5>
                        <h3 className="text-black text-3xl p-2 self-center"> 247 ms </h3>
                    </div>
                </div>
                <div className="flex p-4 w-full justify-center items-center">
                    <div className="text-black h-full p-10">
                        <Linechart totalreq={totalreq} data={lineData}/>
                    </div>
                    {/* <div className="text-black h-full p-10">
                        <SimplePieChart />
                    </div> */}
                </div>
            </div>
        </div>
     );
}
 
export default Dashboard;