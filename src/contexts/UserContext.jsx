import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);

    // add useEffect
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        console.log("Stored user:", storedUser); // This logs the correct stringified value from localStorage
      
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Set the user state with the parsed object
        }
      
        // This console log will still show the previous value of 'user' (possibly null)
        // because setUser does not immediately update the state.
      }, []);
      
      // This effect will run every time the 'user' state changes, allowing you to see the updated value
      useEffect(() => {
        console.log("User state updated:", user); // This will log the updated value of 'user'
      }, [user]); // Trigger this effect whenever 'user' changes

    const putUser = (newUser) => {
        setUser(newUser)
        localStorage.setItem('user', JSON.stringify(newUser));
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
        localStorage.removeItem('authToken')
        console.log(localStorage.getItem("user"))
    }

    // const updateUser = (newUser) => {
    //     localStorage.setItem('user', JSON.stringify(newUser));
    //     setUser(newUser);
    // }

    return (
        <UserContext.Provider value={{ user, putUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}