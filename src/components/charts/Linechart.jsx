import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const Linechart = ({data}) => {

    return ( 
        <div className='p-10'>
        <LineChart width={800} height={350} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="total_req" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="limitreq" stroke="#FF0000" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<CustomToolTipWrapper dataKey="total_req" limitRef="limitreq" />} />
        </LineChart>
        </div>
     );
}
 
export default Linechart;

const CustomToolTipWrapper = ({ dataKey, limitRef, payload, label, active }) => {
    if (active && payload && payload.length) {
        // Extract the value corresponding to the dataKey (like "uv")
        const req = payload[0].payload[dataKey];
        const limit = payload[0].payload[limitRef] 

        return <CustomToolTip req={req} limit={limit} />;
    }

    return null; // Tooltip is not active or no data
};


const CustomToolTip = ({ req, limit }) => {
    const delta = req - limit;

    return (
        <div className='p-4 bg-white border-solid border-black border'>
            <p className='text-black'>{req} requests</p>
            <p className='text-black'>
                {delta >= 0 ? `${delta} over the limit` : `${Math.abs(delta)} under the limit`}
            </p>
        </div>
    );
};
 