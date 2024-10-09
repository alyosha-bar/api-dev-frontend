import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import TabbedComponent from "./TabbedComponent";


const First = () => {

    const { user } = useContext(UserContext)

    const scriptTag = `<script src="https://MY-SERVER-URL/?userId=<YOUR TOKEN>api=<YOUR API NAME KEY><script>`

    return ( 
        <div className="text-sm overflow-auto h-4/5">
            <h2 className="text-xl font-bold text-black"> Welcome! </h2>
            <h2 className="text-black p-2 text-lg"> Step 1 </h2>
            <p className="text-black p-2 text-lg"> Paste this script tag into the head of html documentation like so: </p>
            <div className="bg-black p-2">   
                <code className="text-white p-2"> {scriptTag} </code>
            </div>
            <p className="text-black p-2"> </p>
            <TabbedComponent example={
                <div className="p-2 m-1 rounded-b-md bg-black">
                    <code className="text-white">
                        {`<!doctype html>`}
                        <br />
                        {`<html lang="en" class="antialiased dark:bg-gray-950">`}
                        <br />
                        {`<head>`} <br />

                            {`<meta charset="UTF-8" />`} <br />
                            {`<link rel="icon" type="image/svg+xml" href="/vite.svg" />`} <br />
                            {`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`} <br />
                            {`<title> Moneyz PLZZ </title>`} <br />
                        {`</head>`} <br />

                        {`<body class="min-h-screen bg-white">
                            <div id="root"></div>
                            <script type="module" src="/src/main.jsx"></script>
                            ${scriptTag}
                        </body>
                    </html>`}
                    </code>
                </div>
            }/>
        </div>
    );
}
 
export default First;