import React from 'react';
import { TooltipProps } from 'recharts';
import {
    ValueType,
    NameType,
} from 'recharts/src/component/DefaultTooltipContent';
import { ModalFile, ChartSchema } from './interface';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Chart } from "react-google-charts";

interface BarChartsProps {
    barData: any[][],
}

export const data = [
    ["City", "2010 Population", "2000 Population"],
    ["New York City, NY", 8175000, 8008000],
    ["Los Angeles, CA", 3792000, 3694000],
    ["Chicago, IL", 2695000, 2896000],
    ["Houston, TX", 2099000, 1953000],
    ["Philadelphia, PA", 1526000, 1517000],
];

export const options = {
    chart: {
        // title: "Amount Sepend",
        // subtitle: "Sales, Expenses, and Profit: 2014-2017",
    },
    bars: "horizontal",
    chartArea: { width: "100%" },
    legend: { position: 'none' },
    // hAxis: {
    //     title: "Total Population",
    //     minValue: 0,
    // },
    // vAxis: {
    //     title: "City",
    // },
};

const BarCharts: React.FC<BarChartsProps> = (props) => {
    console.log(props.barData, "sasss")
    return (
        <div>
            <Chart

                chartType="Bar"
                width="100%"
                height="400px"
                data={props.barData}
                options={options}
            />
            {/* <BarChart
                width={460}
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
            </BarChart> */}
        </div>
    );
};

export default BarCharts;