import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';

const data = [
  { name: '200', value: 700 },
  { name: '300', value: 100 },
  { name: '400', value: 100 },
  { name: '500', value: 100 },
];

const COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042'];

const SimplePieChart = () => {
  return (
    <PieChart width={400} height={350}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<div className='text-black'> Hi there</div>}/>
      <Legend />
    </PieChart>
  );
};

export default SimplePieChart;
