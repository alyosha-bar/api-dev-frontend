import { useParams } from "react-router-dom";

const Dashboard = () => {

    const {id} = useParams()


    return ( 
        <div className="bg-white h-screen p-10">
            <h3 className="text-black"> API Name - {id} - Dashboard </h3>
            <ul className="text-black">
                <li className="text-black"> Limit percentage </li>
                <li className="text-black"> Past months data </li>
                <li className="text-black"> Average status code </li>
                <li className="text-black"> Average response time </li>
            </ul>
        </div>
     );
}
 
export default Dashboard;