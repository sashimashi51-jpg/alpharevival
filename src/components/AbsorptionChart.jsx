import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AbsorptionChart = () => {
    const data = [
        {
            name: 'Other Solutions',
            absorption: 4,
        },
        {
            name: 'Ours',
            absorption: 45,
        }
    ];

    const colors = ['#EF4444', '#10B981'];

    return (
        <div className="w-full bg-white flex items-center justify-center p-8">
            <div className="w-full max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
                    Active Serum Absorption Rates
                </h1>

                <ResponsiveContainer width="100%" height={500}>
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="name"
                            tick={{ fill: '#374151', fontSize: 14, fontWeight: 500 }}
                            angle={0}
                            textAnchor="middle"
                            height={80}
                            interval={0}
                        />
                        <YAxis
                            label={{
                                value: 'Absorption Rate (%)',
                                angle: -90,
                                position: 'insideLeft',
                                style: { fill: '#374151', fontSize: 14, fontWeight: 600 }
                            }}
                            tick={{ fill: '#374151', fontSize: 14 }}
                            domain={[0, 50]}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #d1d5db',
                                borderRadius: '6px',
                                fontSize: '14px'
                            }}
                            formatter={(value) => [`${value}%`, 'Absorption Rate']}
                        />
                        <Bar
                            dataKey="absorption"
                            radius={[8, 8, 0, 0]}
                            barSize={120}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>

                <div className="mt-8 text-center text-gray-600 text-sm">
                    <p className="font-semibold">Clinical Study Comparison</p>
                    <p className="mt-2">Micro-channel delivery demonstrates 11.25x higher absorption vs. topical application</p>
                </div>
            </div>
        </div>
    );
};

export default AbsorptionChart;
