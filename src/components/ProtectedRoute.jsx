import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export const ProtectedRoute = () => {
    const navigate = useNavigate();

    const {user} = useContext(UserContext);

    if (!user) {
      navigate("/login");
    }
    return (
      <div className="bg-white"> </div>
    );
  };