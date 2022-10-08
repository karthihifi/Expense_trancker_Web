import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PieCat from '../PieCategories'
import Typography from '@mui/material/Typography';
import { ModalFile } from '../interface';
import { Generic } from '../interface'
import { Chart } from "react-google-charts";
import Card from 'react-bootstrap/Card';
import Modal from '@mui/material/Modal';
import { padding } from '@mui/system';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface SpendingTrendProps {
    ChartData: any[][],
}

export const options = {
    // title: "Company Performance",
    curveType: "none",
    legend: { position: "bottom", textStyle: { color: "#fff" } },
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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Card onClick={handleOpen}>
                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="250px"
                    data={props.ChartData}
                    options={options}
                />
                <Card.Body>
                    <Typography variant='subtitle1'>Weekly Spending</Typography>
                    <Typography variant='body2'>Average Weekly Spending : 128 RM</Typography>
                    <Typography variant='body2'>Trend : 12%</Typography>
                </Card.Body>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Chart
                        chartType="LineChart"
                        width="100%"
                        height="500px"
                        data={props.ChartData}
                        options={options}
                    />
                </Box>
            </Modal>
        </div>
    );
}

export default SpendingTrend