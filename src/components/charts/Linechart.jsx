import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const Linechart = () => {

    const data = [
        { name: 'January', uv: 400, pv: 2400, amt: 2400 },
        { name: 'February', uv: 300, pv: 1398, amt: 2210 },
        { name: 'March', uv: 200, pv: 9800, amt: 2290 },
        { name: 'April', uv: 278, pv: 3908, amt: 2000 },
        { name: 'May', uv: 189, pv: 4800, amt: 2181 },
        { name: 'June', uv: 239, pv: 3800, amt: 2500 },
        { name: 'July', uv: 349, pv: 4300, amt: 2100 }
    ];


    return ( 
        <div className='p-10'>
        <LineChart width={800} height={350} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={CustomToolTip}/>
        </LineChart>
        </div>
     );
}
 
export default Linechart;

const CustomToolTip = () => {
    return ( 
        <div className='p-4 bg-white border-solid border-black border'>
            <p className='text-black'> x requests </p>
            <p className='text-black'> y under/over the limit </p>
        </div>
    );
}
 