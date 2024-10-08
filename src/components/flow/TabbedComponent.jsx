import React, { useState } from 'react';

const TabbedComponent = ({example}) => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState('React');

  // Function to render content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'React':
        return <div className='text-black'> {example} </div>;
      case 'Vue':
        return <div className='text-black'> {example} </div>;
      case 'Svelte':
        return <div className='text-black'> {example} </div>;
      default:
        return null;
    }
  };

  return (
    <div className="py-8 px-8">
      {/* Tab Headers */}
      <div className="tab-headers">
        <button
            className={`p-2 mx-1 text-black border border-blue-500 rounded-t-md transition-all duration-200 ease-in-out ${
                activeTab === 'React' ? 'bg-blue-500 text-white' : 'bg-blue-200'
            }`}
            onClick={() => setActiveTab('React')}
            >
            React
        </button>

        <button
            className={`p-2 mx-1 text-black border border-green-500 rounded-t-md transition-all duration-200 ease-in-out ${
                activeTab === 'Vue' ? 'bg-green-500 text-white' : 'bg-green-200'
            }`}
            onClick={() => setActiveTab('Vue')}
            >
            Vue
        </button>

        <button
            className={`p-2 mx-1 text-black border border-orange-500 rounded-t-md transition-all duration-200 ease-in-out ${
                activeTab === 'Svelte' ? 'bg-orange-500 text-white' : 'bg-orange-200'
            }`}
            onClick={() => setActiveTab('Svelte')}
            >
            Svelte
        </button>

      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TabbedComponent;
