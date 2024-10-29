import { useParams } from "react-router-dom";
import Linechart from "../components/charts/Linechart";
import SimplePieChart from "../components/charts/SimplePieChart";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";



const Dashboard = () => {

    const {id} = useParams()
    const [totalreq, setTotalReq] = useState()
    const [errorRate, setErrorRate] = useState()
    const [latestMonth, setLatestMonth] = useState()
    const [lineData, setLineData] = useState([{}])
    // fetch dashboard data for specified API ID from params
    

    useEffect( () => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/trackinfo/${id}`, {
            method: 'GET',
            credentials: "include"
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


    const manageToken = () => {
        console.log("Managing Token")
    }


    return ( 
        <div className="bg-white h-screen overflow-hidden flex justify-between flex-row">
            <Sidebar></Sidebar>
            <div className="dashboard flex flex-col w-4/5 p-10">
                <button className="p-4 bg-gray-200 m-2 w-1/4" onClick={manageToken}> ManageToken </button>
                
                <div className="flex justify-around w-5/5">
                    
                    {totalreq && <div className="border rounded-sm border-solid border-green-600 w-1/4 flex flex-col justify-center p-4">
                        <h5 className="text-green-600 text-sm"> Total Requests: </h5>
                        <h3 className="text-green-600 text-3xl p-2 self-center"> {totalreq.toLocaleString()} <div className="text-green-600 text-xs">requests in {latestMonth} </div> </h3>
                    </div>}
                    {errorRate && <div className="border rounded-sm border-solid border-red-600 w-1/4 flex flex-col justify-center p-4">
                    <h5 className="text-red-600 text-sm"> Error Rate: </h5>
                        <h3 className="text-red-600 text-3xl p-2 self-center"> {errorRate.toFixed(2)}% <div className="text-red-600 text-xs"> in {latestMonth} </div> </h3>
                    </div>}
                    <div className="border rounded-sm border-solid border-gray-200 w-1/5 flex flex-col justify-center p-4">
                        <h5 className="text-black text-sm"> Avg Latency: </h5>
                        <h3 className="text-black text-3xl p-2 self-center"> 247 ms <div className="text-xs"> in {latestMonth} </div> </h3>
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