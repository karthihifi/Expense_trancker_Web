import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { TooltipProps } from 'recharts';
import {
    ValueType,
    NameType,
} from 'recharts/src/component/DefaultTooltipContent';

interface PieChartsProps {
    pieData: { name: string, value: number }[]
}

let COLORS: string[] = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const CustomTooltip = ({
    active,
    payload,
    label,
}: TooltipProps<ValueType, NameType>) => {
    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${payload?.[0].name} : ${payload?.[0].value} %`}</p>
                {/* <p className="desc">Anything you want can be displayed here.</p> */}
            </div>
        );
    }

    return null;
};

const PieCharts: React.FC<PieChartsProps> = (props) => {

    return (
        <div>
            <PieChart width={460}
                height={300} margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}>
                <Pie data={props.pieData} color="#000000" dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" >
                    {
                        props.pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
            </PieChart>
        </div>
    );
};

export default PieCharts;