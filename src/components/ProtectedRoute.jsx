import { useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
    const navigate = useNavigate();

    const user = useAuthStore((state) => state.user)

    if (!user) {
      navigate("/login");
    }
    return (
      <div className="bg-white"> </div>
    );
  };