import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const [apis, setApis] = useState([])

    useEffect( () => {

        fetch('/api/home')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setApis(data)
        })
        .catch( (err) => {
        console.log(err)
        })

        // setApis(testData)
    }, [])


    const navigate = useNavigate()

    const goToDash = (id) => {
        navigate(`/dashboard/${id}`) //replace with actual id
    }

    const startFlow = () => {
        alert(' Starting API Registration Flow! ')

        // 


    }

    return ( 
        <div className="page">
            <h1> Home Page! </h1>
            {/* <h3> Here we will have: </h3>
            <ul>
                <li> All APIs currently registered</li>
                <li> Button to register new API</li>
            </ul> */}
             <div className="api-cards">
            {apis && apis.map( (api) => (
                <div className="card" onClick={() => {goToDash(api.id)}}>
                    <h3> {api.title} </h3>
                    <p> {api.description}</p>
                    <p> used in project name </p>
                </div>
            ))}
            <button className="add" onClick={startFlow}> + </button>
            </div>

        </div>
     );
}
 
export default Home;