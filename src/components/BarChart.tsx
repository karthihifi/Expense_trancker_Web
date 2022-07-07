import React from 'react';
import { TooltipProps } from 'recharts';
import {
    ValueType,
    NameType,
} from 'recharts/src/component/DefaultTooltipContent';
import ModalFile from './interface';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BarChartsProps {
    barData: ModalFile[]
}

const BarCharts: React.FC<BarChartsProps> = (props) => {

    return (
        <div>
            <BarChart
                width={500}
                height={300}
                data={props.barData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default BarCharts;