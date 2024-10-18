

const Pricing = () => {
    return ( 
        <div className="bg-customGreen pricing-area flex-col items-center justify-center">
            <h1 className="text-black text-5xl mb-10 font-bold flex items-center justify-center"> Pricing Plans </h1>
            <div className="flex justify-center items-center">
                <div className="card p-16 bg-gray-200 m-4 rounded-lg flex flex-col w-72">
                    <h1 className="text-black text-3xl"> Hobby Plan </h1>
                    <p className="text-black my-4"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum consequuntur soluta blanditiis! Ea, repellat ipsa?</p>
                    <div className="text-black price-tag p-4 bg-blue-300 rounded-xl flex items-center justify-center text-bold"> £0.00 / month </div>
                    <button className="text-black price-tag p-4 bg-blue-300 rounded-xl flex items-center justify-center text-bold mt-4"> Get Started </button>
                </div>
                <div className="card p-16 bg-cyan-200 m-4 rounded-lg flex flex-col w-72">
                    <h1 className="text-black text-3xl"> Dev+ Plan </h1>
                    <p className="text-black my-4"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum consequuntur soluta blanditiis! Ea, repellat ipsa?</p>
                    <div className="text-black price-tag p-4 bg-blue-300 rounded-xl flex items-center justify-center text-bold"> £9.99 / month </div>
                    <button className="text-black price-tag p-4 bg-blue-300 rounded-xl flex items-center justify-center text-bold mt-4"> Get Started </button>
                </div>
                <div class="border-l border-black h-96 mx-4"></div>
                <div className="card p-16 bg-green-400 m-4 rounded-lg flex flex-col w-72">
                    <h1 className="text-black text-3xl"> Team Plan </h1>
                    <p className="text-black my-4"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum consequuntur soluta blanditiis! Ea, repellat ipsa?</p>
                    <div className="text-black price-tag p-4 bg-blue-300 rounded-xl flex items-center justify-center text-bold"> £59.99 / month </div>
                    <button className="text-black price-tag p-4 bg-blue-300 rounded-xl flex items-center justify-center text-bold mt-4"> Get Started </button>
                </div>
            </div>
        </div>
    );
}
    
export default Pricing;
