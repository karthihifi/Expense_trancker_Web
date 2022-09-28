import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PieCat from './PieCategories'
import Typography from '@mui/material/Typography';
import TableGroupList from './TableGroupList'
import { ModalFile } from './interface';
import { Generic } from './interface'

interface GlobalProps {
    PieCategories: PieCat
    AllData: ModalFile[]
    InitialData: Generic[]
    setPieModalData: (ModalData: string[][]) => void;
    setBarModalData: (ModalData: string[][]) => void;
}
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const TableGroupTabs: React.FC<GlobalProps> = (props) => {
    let currmonth = parseInt(new Date().toISOString().split('T')[0].split('-')[1]) - 1

    const [value, setValue] = React.useState(currmonth);
    const [month, setmonth] = React.useState(parseInt(new Date().toISOString().split('T')[0].split('-')[1]));
    const [ModelData, setModelData] = React.useState<Generic[]>(props.InitialData);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
        let mon = newValue + 1
        // setmonth(props.PieCategories.Calenderinfo.filter((item) => { return item.key == mon })[0].value)
        setmonth(mon)

        let year = parseInt(new Date().toISOString().split('T')[0].split('-')[0])
        let ModelData = props.AllData.filter((item) => { return item.month == mon && item.year == year })
        let filteredData = props.PieCategories.GroupData_gc('Category', ModelData)
        setModelData(filteredData)
        // let consolidatedData = props.PieCategories.ConsildatebyMonth(mon, year, ModelData)
        // console.log(ModelData, "dasas")
        let PieData = props.PieCategories.SetbarchartData('Category', ModelData)
        props.setPieModalData(PieData)
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} variant="scrollable"
                scrollButtons="auto">
                {props.PieCategories.Calenderinfo.map((item) =>
                    <Tab label={item.value} {...a11yProps(item.key)} />
                )}
            </Tabs>
            <TabPanel value={value} index={value}>
                <TableGroupList setPieModalData={props.setPieModalData} month={month} setBarModalData={props.setBarModalData}
                    listData={ModelData} AllData={props.AllData} PieCategories={props.PieCategories}></TableGroupList>
            </TabPanel>
        </Box>

    );
}

export default TableGroupTabs