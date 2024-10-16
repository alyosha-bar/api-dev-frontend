import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";


const Account = () => {

    const { user } = useContext(UserContext)

    return ( 

        <div className="p-2">
            <h2 className="text-black text-xl">Account info for {user.uid}</h2>
            <ul >
                <li className="text-black">Dashboard of all API usage</li>
                <li className="text-black">Pricing</li>
                <li className="text-black">Allow to regenerate user token</li>
                <li className="text-black">Reset Password</li>
                <li className="text-black">Delete Account</li>
            </ul>
        </div>

    );
}
 
export default Account;