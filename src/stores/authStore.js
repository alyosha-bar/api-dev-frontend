import { create } from "zustand";


// firstname, lastname, username, token, email

export const useAuthStore = create((set) => ({
    user: null,
    // asynchronous functions
    getAccountInfo: async (uid) => {

        console.log("Getting data to store in the authStore")

        const authToken = localStorage.getItem('authToken')
        if (!authToken) {
            console.log('You need to log in first');
            return;
        }

        // fetch /api/account/:uid
        fetch(`${import.meta.env.VITE_SERVER_URL}/account/${uid}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
        }).then( (data) => {
            // setUserToken(data.token)
            console.log("account info: ")
            console.log(data)
            set((state) => ({
                user: data[0]
            })) 
        }).catch( (err) => {
            console.error(err)
        })
        
    },
    logUserOut: () => {
        console.log("Logging out.")
        set((state) => ({
            user: null
        }))
    }
}))