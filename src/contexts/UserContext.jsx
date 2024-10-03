import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    
    // const [cookies, setCookie, removeCookie] = useCookies(['Authorization']);
    const [user, setUser] = useState(null);

    const putUser = (newUser) => {
        setUser(newUser)
    }

    const logout = () => {
        setUser(null)
        // remove authorisation cookies
    }

    const updateUser = (newUser) => {
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
    }

    return (
        <UserContext.Provider value={{ user, putUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}