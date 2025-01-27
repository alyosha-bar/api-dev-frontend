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


export const initialiseAuth = (navigate, exemptPaths) => {
  console.log("Initialising Auth ... ")


  // Get the current path from the browser
  const currentPath = window.location.pathname;

  // Check if the current path is exempt
  if (exemptPaths.includes(currentPath)) {
    console.log(`Path "${currentPath}" is exempt from authentication.`);
    return true;
  }


  // check if token exists
  const authtoken = localStorage.getItem('authToken');
  if (!authtoken) {
    console.log("Token doesn't exist.");
    navigate("/login");
    return false;
  }

  // decode token
  const decodedToken = jwtDecode(authtoken);
  const isTokenValid = decodedToken.exp * 1000 > Date.now();

  // check if token is valid
  if (!isTokenValid) {
    console.log("Token isn't valid.");
    localStorage.removeItem('authToken');
    navigate("/login");
    return false;
  }

  console.log("Token is valid.");
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    console.log("No user for some reason.");
    navigate("/login");
    return false;
  }

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