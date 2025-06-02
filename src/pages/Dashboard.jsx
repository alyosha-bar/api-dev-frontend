import { useParams } from "react-router-dom";
import Linechart from "../components/charts/Linechart";
import SimplePieChart from "../components/charts/SimplePieChart";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import SimpleBarChart from "../components/charts/SimpleBarChart";



const Dashboard = () => {

    const {id} = useParams()
    const [totalreq, setTotalReq] = useState()
    const [errorRate, setErrorRate] = useState()
    const [avgLatency, setAvgLatency] = useState(0)

    const [latestMonth, setLatestMonth] = useState()
    const [lineData, setLineData] = useState([{}])
    // fetch dashboard data for specified API ID from params
    

    useEffect( () => {

        const authToken = localStorage.getItem('authToken')
        if (!authToken) {
            console.log('You need to log in first');
            return;
        }

        fetch(`${import.meta.env.VITE_SERVER_URL}/trackinfo/${id}`, {
            method: 'GET',
            credentials: "include",
            headers : {
                'Authorization': `Bearer ${authToken}`
            }
        }).then( (res) => {
            if (!res.ok) {
                throw new Error("Error fetching dashboard.")
            }
            return res.json()
        }).then( (data) => {
            console.log(data)
            
            // NIGHTMARE DATA HANDLING HERE

            // iterate thru data to make a new structure with month instead of the dates
            const monthData = formatData(data)
            
            console.log(monthData)

            setLineData(monthData)

            // must get latest entry --> should be the last in the data array
            const latestEntry = data[data.length - 1]
            const month = monthData[data.length - 1].month
            setTotalReq(latestEntry.total_req)
            setAvgLatency(latestEntry.avg_latency)
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
            


            const newItem = {
                name: item.name,
                // Convert start_date and end_date to month names
                month: getMonthName(item.start_date),
                total_req: item.total_req,
                limitreq: item.limitreq,
                avgLatency: item.avg_latency
            };
            // Add the new item to the newData array
            monthData.push(newItem);
        }

        return monthData;
    }


    return ( 
        <div className="bg-white h-screen overflow-hidden flex flex-row px-10">
        {/* Main Dashboard Area */}
        <div className="dashboard flex flex-col w-full p-10 gap-6">
            
            {/* Metrics Summary Section */}
            <div className="w-full border rounded-md border-gray-300 p-4 flex justify-around divide-x divide-gray-300 bg-white">
                {/* Total Requests */}
                <div className="flex-1 px-4 flex flex-col justify-center">
                    {totalreq && (
                    <>
                        <h5 className="text-green-600 text-sm">Total Requests:</h5>
                        <h3 className="text-green-600 text-3xl p-2 self-center">
                        {totalreq.toLocaleString()}
                        <div className="text-green-600 text-xs">requests in {latestMonth}</div>
                        </h3>
                    </>
                    )}
                </div>

                {/* Error Rate */}
                <div className="flex-1 px-4 flex flex-col justify-center">
                    {errorRate !== null && errorRate !== undefined && !isNaN(errorRate) && (
                    <>
                        <h5 className="text-red-600 text-sm">Error Rate:</h5>
                        <h3 className="text-red-600 text-3xl p-2 self-center">
                        {errorRate.toFixed(2)}%
                        <div className="text-red-600 text-xs">in {latestMonth}</div>
                        </h3>
                    </>
                    )}
                </div>

                {/* Avg Latency */}
                <div className="flex-1 px-4 flex flex-col justify-center">
                    <h5 className="text-black text-sm">Avg Latency:</h5>
                    <h3 className="text-black text-3xl p-2 self-center">
                    {avgLatency} ms
                    <div className="text-xs">per request in {latestMonth}</div>
                    </h3>
                </div>
                
                {/* Avg Latency */}
                <div className="flex-1 px-4 flex flex-col justify-center">
                    <h5 className="text-black text-sm">Avg Latency:</h5>
                    <h3 className="text-black text-3xl p-2 self-center">
                    {avgLatency} ms
                    <div className="text-xs">per request in {latestMonth}</div>
                    </h3>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-row gap-6 w-full h-full">
                {/* Line Chart - Main Content */}
                <div className="flex-1 border rounded-md border-gray-200 bg-white p-6 shadow-sm">
                    <h1> Request Tracking </h1>
                    <Linechart totalreq={totalreq} data={lineData} />
                </div>

                {/* Sidebar with Pie and Bar Charts */}
                <div className="w-1/3 flex flex-col gap-6">
                    {/* Bar Chart */}
                    <div className="border rounded-md border-gray-200 bg-white p-6 shadow-sm">
                        <SimpleBarChart />
                    </div>
                    
                    {/* Pie Chart */}
                    <div className="border rounded-md border-gray-200 bg-white p-6 shadow-sm">
                        <SimplePieChart />
                    </div>
                </div>
                </div>
            </div>
        </div>

     );
}
 
export default Dashboard;