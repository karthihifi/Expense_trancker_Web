import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PieCat from '../PieCategories'
import Typography from '@mui/material/Typography';
import { ModalFile, TredWidgets } from '../interface';
import { Generic } from '../interface'
import { Chart } from "react-google-charts";
import Modal from '@mui/material/Modal';
import Card from 'react-bootstrap/Card';
import Paper from '@mui/material/Paper';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Grid from '@mui/material/Grid';


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
    backgroundColor: '#FF7500',
    colors: ["#fff"],
    // bar: { groupWidth: "90%" },
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

const SpenTrend_forMostUsedCat: React.FC<SpendingTrendProps> = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose1 = () => { console.log('clickedas', open); setOpen(!open); };
    return (
        <Paper elevation={3}>
            <Card onClick={handleOpen}>
                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="250px"
                    data={props.ChartData.chartData}
                    options={options}
                />
                <Card.Body>
                    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                        <Grid item xs={3}>
                            <BrunchDiningIcon fontSize='large' sx={{ color: '#2C3333' }}></BrunchDiningIcon>
                        </Grid>
                        <Grid item xs={9} sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography variant='h6'>Spending for Food</Typography>
                            <Box sx={{ display: 'flex',alignItems:'center' }}>
                                <Typography variant='body2'>Weekly Avg : {props.ChartData.AvgWeekspent} RM
                                </Typography>
                                <Typography variant='caption' sx={{ display: 'flex',alignItems:'center' }}>(
                                    <KeyboardArrowUpIcon sx={{ color: 'red' }}></KeyboardArrowUpIcon>
                                    <Typography variant='subtitle2' sx={{ color: 'red' }}>12% </Typography>
                                   Since last wk)</Typography>
                            </Box>
                            <Typography variant='body2'>Daily Avg : {props.ChartData.AvgDailySpent} RM</Typography>
                        </Grid>
                    </Grid>
                </Card.Body>
            </Card>
            <Modal
                open={open}
                onClose={handleClose1}
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

export default SpenTrend_forMostUsedCat