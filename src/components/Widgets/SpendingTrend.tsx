import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PieCat from '../PieCategories'
import Typography from '@mui/material/Typography';
import { ModalFile } from '../interface';
import { Generic } from '../interface'
import { Chart } from "react-google-charts";

interface SpendingTrendProps {
    ChartData: any[][],
}

export const options = {
    // title: "Company Performance",
    curveType: "none",
    legend: { position: "bottom",textStyle:{color: "#fff"}  },
    backgroundColor: '#00cc00',
    colors: ["#fff"],
    hAxis: {
        gridlines: {
            color: "#fff"
        },
        baselineColor: "Red",
        textStyle: {
            color: "#fff",
        },

    },
    vAxis: {
        gridlines: {
            color: "transparent"
        },
        baselineColor: "#fff",
        textStyle: {
            color: "#fff",
        }
    }
};

const SpendingTrend: React.FC<SpendingTrendProps> = (props) => {
    return (
        <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={props.ChartData}
            options={options}
        />
    );
}

export default SpendingTrend