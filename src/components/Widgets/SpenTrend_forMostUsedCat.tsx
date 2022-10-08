import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PieCat from '../PieCategories'
import Typography from '@mui/material/Typography';
import { ModalFile } from '../interface';
import { Generic } from '../interface'
import { Chart } from "react-google-charts";
import Modal from '@mui/material/Modal';
import Card from 'react-bootstrap/Card';


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
                    <Card.Title>Spending Count by Category</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
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
                        chartType="BarChart"
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

export default SpenTrend_forMostUsedCat