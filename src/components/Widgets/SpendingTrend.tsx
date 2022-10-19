import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PieCat from '../PieCategories'
import Typography from '@mui/material/Typography';
import { ModalFile, TredWidgets } from '../interface';
import { Generic } from '../interface'
import { Chart } from "react-google-charts";
import Card from 'react-bootstrap/Card';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { padding } from '@mui/system';
import EuroIcon from '@mui/icons-material/Euro';
import Grid from '@mui/material/Grid';
import "../main.css"

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
    ChartData: TredWidgets,
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
        <Paper elevation={3}>
            <Card onClick={handleOpen} className="card">
                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="250px"
                    data={props.ChartData.chartData}
                    options={options}
                />
                <Card.Body>
                    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                        <Grid item xs={4}>
                            <EuroIcon fontSize='large' sx={{color:'#2C3333'}}></EuroIcon>
                        </Grid>
                        <Grid item xs={8} sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography variant='h6'>Weekly Spending</Typography>
                            <Typography variant='body2'>Average Weekly Spending : {props.ChartData.AvgWeekspent} RM</Typography>
                            <Typography variant='body2'>Average Daily Spending : {props.ChartData.AvgDailySpent} RM</Typography>
                        </Grid>
                    </Grid>
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
                        data={props.ChartData.chartData}
                        options={options}
                    />
                </Box>
            </Modal>
        </Paper>
    );
}

export default SpendingTrend