

const Tech = () => {
    return ( 
        <div className="p-16 h-96 flex flex-col justify-center items-center">
            <h1 className="text-black text-3xl pb-10"> Supports <b className="text-black">Fetch API</b> and <b className="text-black">Axios</b> in: </h1>
            <ul className="tech-stack flex p-6 justify-around items-center w-3/5">
                <li className="text-black p-3 bg-blue-400 rounded w-24 flex items-center justify-center"> React </li>
                <li className="text-black p-3 bg-green-400 rounded w-24 flex items-center justify-center"> Vue </li>
                <li className="text-black p-3 bg-orange-400 rounded w-24 flex items-center justify-center"> Svelte </li>
                <li className="text-black p-3 bg-red-400 rounded w-24 flex items-center justify-center"> Angular </li>
                <li className="text-black p-3 bg-purple-400 rounded w-24 flex items-center justify-center"> Qwik </li>
            </ul>
        </div>
    );
}
 
export default Tech;
