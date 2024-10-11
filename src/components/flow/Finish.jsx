const Finish = () => {
    return ( 
        <div className="text-sm overflow-auto h-4/5 p-10 flex flex-col justify-center items-center">
            <h2 className="text-black text-3xl p-4"> Congratulations! </h2>
            <h3 className="text-black text-lg"> Check out your new registered API in the dashboard page. It will now track all your calls of your API in your application to ensure you do not exceed your rate limits.</h3>
            <h3 className="text-black text-lg"> Good Luck!! </h3>
        </div>
    );
}
 
export default Finish;