import { useParams } from "react-router-dom";
import Tokenmanagement from "./Tokenmanagement";


const Apisettings = () => {

    const { apiId } = useParams()

    return ( 
        <>
            <div className="flex justify-center items-center">
                <Tokenmanagement apiId={apiId}/>
            </div>
        </>
    );

}
 
export default Apisettings;