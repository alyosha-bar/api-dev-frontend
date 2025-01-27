import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../stores/authStore";

export const insertUser = (user, firstname, lastname, username) => {
  // fetch request
  
  const authToken = localStorage.getItem('authToken')
  if (!authToken) {
      console.log('You need to log in first');
      return;
  }




  fetch(`${import.meta.env.VITE_SERVER_URL}/signup`, {
      method: "POST",
      headers: 
        {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${authToken}`
        },
      body: JSON.stringify({
        "uid": user.uid,
        "email": user.email,
        "firstname": firstname,
        "lastname": lastname,
        "username": username
      })
  })
  .then( (res) => {
      if (!res.ok) {
          throw new Error("Bad Request!")
      }
      return res.json()
  }).then( (data) => {
      console.log(data)
      // put the user in to the Context as well
      // later 
  }).catch( (err) => {
      console.error(err)
  })
}


export const initialiseAuth = (navigate, exemptPaths = []) => {
  console.log("Initialising Auth ... ");

  // Get the current path
  const currentPath = window.location.pathname;

  // Check if token exists
  const authtoken = localStorage.getItem("authToken");
  if (!authtoken) {
    console.log("Token doesn't exist.");
    // Remove user from state
    useAuthStore.setState({ user: null });

    // Only redirect if the path is NOT exempt
    if (!exemptPaths.includes(currentPath)) {
      navigate("/login");
    }
    return false;
  }

  // Decode token
  const decodedToken = jwtDecode(authtoken);
  const isTokenValid = decodedToken.exp * 1000 > Date.now();

  // If token is invalid, clear localStorage and redirect if needed
  if (!isTokenValid) {
    console.log("Token isn't valid.");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    useAuthStore.setState({ user: null });

    if (!exemptPaths.includes(currentPath)) {
      navigate("/login");
    }
    return false;
  }

  // Token is valid, set the user in the store
  console.log("Token is valid.");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    console.log("No user data found in localStorage.");
    if (!exemptPaths.includes(currentPath)) {
      navigate("/login");
    }
    return false;
  }

  // Set user in the Zustand store
  useAuthStore.setState({ user: user });

  console.log("Auth Initialised.");
  return true;
};



export const validateCredentials = (email, confirmEmail, password, confirmPassword) => {
    if (email != confirmEmail || password != confirmPassword) {
      return false;
    }

    return true
}