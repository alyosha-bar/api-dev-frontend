export const insertUser = (uid) => {
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
          "uid": uid,
          "email": email,
          "firstname": firstname,
          "lastname": lastname
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


export const validateCredentials = (email, confirmEmail, password, confirmPassword) => {
    if (email != confirmEmail || password != confirmPassword) {
      return false;
    }

    return true
  }