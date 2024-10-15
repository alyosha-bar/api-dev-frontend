import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import TabbedComponent from "./TabbedComponent";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Third = () => {

    const { user } = useContext(UserContext)

    const scriptTag = `<script src="https://tracker-api-gateway.onrender.com/tracking?user=<YOUR USER TOKEN>" async></script>`

    const codeSnippet = `
    <!doctype html> 
    <html lang="en" class="antialiased dark:bg-gray-950">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title> YOUR APP </title>
        ${scriptTag}
      </head>
      <body class="min-h-screen bg-white">
        <div id="root"></div>
        <script type="module" src="/src/main.jsx"></script>
      </body>
    </html>
    `;

    return ( 
        <div className="text-sm overflow-auto h-4/5">
            <h2 className="text-xl font-bold text-black"> Welcome! </h2>
            <h2 className="text-black p-2 text-lg"> Step 1 </h2>
            <p className="text-black p-2 text-lg"> Paste this script tag into the head of html documentation like so: </p>
            <div className="flex flex-col"> 
                <SyntaxHighlighter language="html" style={dracula}>
                    {scriptTag} 
                </SyntaxHighlighter>
                <button className="text-white bg-black p-2 w-1/5"> Copy </button>
            </div>
            <p className="text-black p-2"> </p>
            <TabbedComponent exampleReact={
                <div className="m-1 rounded-b-md relative">
                    <SyntaxHighlighter className='' language="html" style={darcula}>
                        {codeSnippet}
                    </SyntaxHighlighter>
                </div>
            }
            exampleVue={
                <div className="text-black"> VUE Example </div>
            }
            exampleSvelte={
                <div className="text-black"> Svelte Example </div>
            }
            />
        </div>
    );
}
 
export default Third;