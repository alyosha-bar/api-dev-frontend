import PricingCard from "./PricingCard";


const Pricing = () => {
    return ( 
        <div className="bg-customGreen pricing-area flex p-10 items-center justify-center pb-16">
            {/* <h1 className="text-black text-5xl mb-10 font-bold flex items-center justify-center"> Pricing Plans </h1>
            <div className="flex justify-center items-center">
                <div className="card p-16 bg-gray-200 m-4 rounded-lg flex flex-col w-72">
                    <h1 className="text-black text-3xl"> Hobby Plan </h1>
                    <p className="text-black my-4"> Perfect for devs with a few projects, who are just starting with APIs and want to learn more about their usage. </p>
                    <div className="flex justify-center items-center"> TOTALLY FREE </div>
                    <button className="text-black price-tag p-4 bg-blue-300 rounded-xl flex items-center justify-center text-bold mt-4"> Get Started </button>
                </div>
                <div className="card p-16 bg-blue-900 border-2 border-blue-300 shadow-2xl shadow-blue-300 m-4 rounded-lg flex flex-col w-72">
                    <h1 className="text-white text-3xl"> Dev+ Plan </h1>
                    <p className="text-white my-4">Perfect for devs who have many projects, ideas and experience with APIs and want optimise their usage.</p>
                    <div className="text-white price-tag p-4 bg-blue-300 rounded-xl flex items-center justify-center text-bold"> £5.99 / month </div>
                    <button className="text-white price-tag p-4 bg-blue-300 rounded-xl flex items-center justify-center text-bold mt-4"> Get Started </button>
                </div>
                <div class="border-l border-black h-96 mx-4"></div>
                <div className="card p-16 bg-green-400 m-4 rounded-lg flex flex-col w-72">
                    <h1 className="text-black text-3xl"> Team Plan </h1>
                    <p className="text-black my-4"> Perfect for small to medium size teams of developers working on real world projects utilising many APIs </p>
                    <div className="text-black price-tag p-4 bg-blue-300 rounded-xl flex items-center justify-center text-bold"> £4.99 per team member / month </div>
                    <button className="text-black price-tag p-4 bg-blue-300 rounded-xl flex items-center justify-center text-bold mt-4"> Get Started </button>
                </div>
            </div> */}
            <PricingCard 
                title="Hobby Plan"
                price="0"
                features={[
                  'Limited Projects',
                  'Push Notifications',
                  'Basic Analytics',
                  '',
                ]}
                buttonText="Start Free"
                isPopular={true}
            />

            {/* Dev+ Plan */}
            <div class="border-l border-blue-600 h-96 mx-4"></div>
            <PricingCard
              title="Dev+ Plan"
              price="?"
              features={[
                'Unlimited Projects',
                'Push Notifications',
                'Advanced Analytics',
                'Automatic Ratelimiting',
              ]}
              buttonText="Register Interest"
              isPopular={false} // This is the popular plan
              comingSoon={true}
            />
            
            {/* Team Plan */}
            <PricingCard
              title="Team Plan"
              price="?"
              features={[
                'Unlimited Projects',
                'Push Notifications',
                'Advanced Analytics',
                'Unlimited Team Members',
                'Collaboration Features',
              ]}
              buttonText="Register Interest"
              isPopular={false}
              comingSoon={true}
            />
            </div>
    );
}
    
export default Pricing;
