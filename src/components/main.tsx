// import React from 'react';
// import logo from './logo.svg';


import React from "react";
// import { BarChart, Bar, LineChart, Line, YAxis, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './main.css'
import DateSection from './AddExpenseSection'
import TableSection from './TableSection'
import SideBar from './SideBar'
import NavBar from './NavBar'
import TodaysExpenseSect from './TodaysExpenseSection'
import ModalFile from './interface';
import PieCharts from './PieChart'
import BarCharts from './BarChart'

interface ModalDataProps {
    ModalData: ModalFile[];
}
interface CalenderProps {
    key: number,
    value: string
}

interface PieChartIntf { name: string, value: number }

const Calenderinfo = [
    {
        key: 1,
        value: 'January',
    },
    {
        key: 2,
        value: 'February',
    },
    {
        key: 3,
        value: 'March',
    },
    {
        key: 4,
        value: 'April',
    },
    {
        key: 5,
        value: 'May',
    },
    {
        key: 6,
        value: 'June',
    },
    {
        key: 7,
        value: 'July',
    },
    {
        key: 8,
        value: 'August',
    },
    {
        key: 9,
        value: 'September',
    },
    {
        key: 10,
        value: 'October',
    },
    {
        key: 11,
        value: 'November',
    },
    {
        key: 12,
        value: 'December',
    },
];

// import Main from './components/main'

function createData(
    date: string,
    currency: string,
    amount: number,
    time: string,
    category: string,
    subcategory: string,
    availmode: string,
    necessity: string,
    dateno: number,
    month: number,
    monthstr: string,
    year: number
) {
    return { date, currency, amount, time, category, subcategory, availmode, necessity, dateno, month, monthstr, year };
}

const rows = [
    createData('2022-07-03', 'EUR', 6.0, 'Afternoon', 'Food', 'Junk', 'Online', 'Needed', 3, 7, 'July', 2022),
    createData('2022-07-03', 'EUR', 6.0, 'Afternoon', 'Food', 'Junk', 'Online', 'Needed', 3, 7, 'July', 2022),
    createData('2022-07-03', 'USD', 9.0, 'Morning', 'Clothes', 'Formals', 'Online', 'Maybe', 3, 7, 'July', 2022),
    createData('2022-07-03', 'USD', 9.0, 'Morning', 'Clothes', 'Formals', 'Online', 'Maybe', 3, 7, 'July', 2022),
    createData('2022-07-03', 'USD', 9.0, 'Morning', 'Clothes', 'Formals', 'Online', 'Maybe', 3, 7, 'July', 2022),
    createData('2022-07-03', 'EUR', 6.0, 'Afternoon', 'Food', 'Junk', 'Online', 'Needed', 3, 7, 'July', 2022),
    createData('2022-07-03', 'EUR', 6.0, 'Afternoon', 'Food', 'Junk', 'Online', 'Needed', 3, 7, 'July', 2022),
    createData('2022-07-03', 'USD', 9.0, 'Morning', 'Clothes', 'Formals', 'Online', 'Maybe', 3, 7, 'July', 2022),
    createData('2022-07-03', 'USD', 9.0, 'Morning', 'Clothes', 'Formals', 'Online', 'Maybe', 3, 7, 'July', 2022),
    createData('2022-07-03', 'USD', 9.0, 'Morning', 'Clothes', 'Formals', 'Online', 'Maybe', 3, 7, 'July', 2022),
    createData('2022-07-03', 'EUR', 6.0, 'Afternoon', 'Food', 'Junk', 'Online', 'Needed', 3, 7, 'July', 2022),
    createData('2022-07-03', 'EUR', 6.0, 'Afternoon', 'Food', 'Junk', 'Online', 'Needed', 3, 7, 'July', 2022),
];


const timeofDay = [
    'Morning',
    'Afternoon',
    'Evening',
    'Night'
]

const Categories = [
    'Food',
    'Clothes',
    'Electronics',
    'Entertainment',
    'Fitness'
]


const Necessity = [
    'Needed',
    'Not Needed',
    'Future',
    'Maybe'
]


const Main: React.FC = (props) => {

    const [PageSelect, setPageSelect] = React.useState('Home');

    const [dailyTotal, setdailyTotal] = React.useState<Number>(0);
    const [MonthTotal, setMonthTotal] = React.useState<Number>(0);
    const [YearTotal, setYearTotal] = React.useState<Number>(0);

    const [ModalData, setModalData] = React.useState<ModalFile[]>([]);
    const [AllData, setAllData] = React.useState<ModalFile[]>([]);

    const [DailyData, setDailyData] = React.useState<ModalFile[]>([]);
    const [MontlyData, setMontlyData] = React.useState<ModalFile[]>([]);
    const [YearlyData, setYearlyData] = React.useState<ModalFile[]>([]);


    const [PieChartData, setPieChartData] = React.useState<PieChartIntf[]>([]);

    React.useEffect(() => {
        console.log('recalled')
        setModalData(rows)
        let dailyTotal = calculateDailytot(rows)
        setdailyTotal(dailyTotal)
        setDailyData(rows)
        setAllData(rows)
        groupData(rows, 'Category', dailyTotal)
        console.log(dailyTotal)
    }, [])

    const calculateDailytot = (TableData: ModalFile[]): number => {
        let total = TableData.reduce((tot, val) => {
            const { amount } = val
            return tot + amount
        }, 0)
        return total
    }

    const calculatetot = (TableData: ModalFile[]): number => {
        let total = TableData.reduce((tot, val) => {
            const { amount } = val
            return tot + amount
        }, 0)
        return total
    }

    const calculateMonthtot = (month: number, year: number): number => {
        // let date = parseInt(new Date().toISOString().split('T')[0].split('-')[2])
        // let month = parseInt(new Date().toISOString().split('T')[0].split('-')[1])
        // let year = parseInt(new Date().toISOString().split('T')[0].split('-')[0])
        const dailyItems = AllData.filter((item) => { return (item.month == month && item.year == year) })
        // console.log(dailyItems, ModalData, month, year)
        let total = dailyItems.reduce((tot, val) => {
            const { amount } = val
            return tot + amount
        }, 0)
        return total
    }

    const calculateYeartot = (year: number): number => {
        // let date = parseInt(new Date().toISOString().split('T')[0].split('-')[2])
        // let month = parseInt(new Date().toISOString().split('T')[0].split('-')[1])
        // let year = parseInt(new Date().toISOString().split('T')[0].split('-')[0])
        const dailyItems = AllData.filter((item) => { return (item.year == year) })
        // console.log(dailyItems, ModalData, date, month, year)
        let total = dailyItems.reduce((tot, val) => {
            const { amount } = val
            return tot + amount
        }, 0)
        return total
    }
    // const uniqify = (array:ModalFile[], key:any) => array.reduce((prev, curr) => prev.find(a => a[key] === curr[key]) ? prev : prev.push(curr) && prev, []);

    var compareYear = function (a: ModalFile, b: ModalFile) {
        if (a.year > b.year) { return -1; }
        if (a.year < b.year) { return 1; }
        return 0;
    }
    const handleAddExpense = (Modal: ModalFile) => {
        console.log(Modal)
        let dummydata: ModalFile[] = [...AllData];
        dummydata.push(Modal)
        setAllData(dummydata)
        setModalData(dummydata)
        // setModalData(prevData => [...prevData, Modal])
        console.log(dummydata, 'After')
        setdailyTotal(calculateDailytot(dummydata))
    }

    const groupData = (ModalData: ModalFile[], groupBy: string, total: number) => {
        switch (groupBy) {
            case 'Category':
                let PieData: PieChartIntf[] = []
                Categories.forEach((cat) => {
                    let filetreditems: ModalFile[] = ModalData.filter((item) => { return (item.category === cat) })
                    if (filetreditems.length >= 1) {
                        console.log(calculatetot(filetreditems), total)
                        let percent = Math.round((100 * calculatetot(filetreditems)) / total)
                        PieData.push({ name: cat, value: percent })
                    }
                })
                console.log(PieData, "Piedata")
                setPieChartData(PieData)
                break;

            default:
                break;
        }
    }

    const handleCliclPageChange = (pageSelect: string) => {
        console.log(pageSelect, 'pagesel')
        let date = parseInt(new Date().toISOString().split('T')[0].split('-')[2])
        let month = parseInt(new Date().toISOString().split('T')[0].split('-')[1])
        let year = parseInt(new Date().toISOString().split('T')[0].split('-')[0])
        switch (pageSelect) {
            case 'Home':
                setPageSelect('Home');
                // const dailyItems = AllData.filter((item) => { return (item.dateno == date && item.month == month && item.year == year) })
                const dailyItems = AllData.filter((item) => { return (item.month == month && item.year == year) })
                setdailyTotal(calculateDailytot(dailyItems))
                setModalData(dailyItems)
                console.log(dailyItems, "Home")
                groupData(dailyItems, 'Category', calculateDailytot(dailyItems))
                break;
            case 'Mon':
                setPageSelect('Mon');
                setdailyTotal(calculateMonthtot(month, year))
                const dymmydata: ModalFile[] = JSON.parse(JSON.stringify(AllData));
                let filteredArr: ModalFile[] = dymmydata.reduce((acc: ModalFile[], current) => {
                    const x = acc.find(item => item.month === current.month && item.year === item.year);
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);
                filteredArr.forEach((item) => {
                    item.amount = calculateMonthtot(item.month, item.year)
                    let index = Calenderinfo.findIndex(row => { return row.key == item.month })
                    // item.date = Calenderinfo[index].value
                })
                console.log(AllData, filteredArr, ModalData, "testmonth")
                setdailyTotal(calculateDailytot(filteredArr))
                setMontlyData(filteredArr)
                setModalData(filteredArr)
                groupData(filteredArr, 'Category', calculateDailytot(filteredArr))
                break;
            case 'Year':
                setPageSelect('Year');
                setdailyTotal(calculateYeartot(year))

                const dummydata: ModalFile[] = JSON.parse(JSON.stringify(AllData));
                const uniqueIds: number[] = [];

                let filteredArr1 = dummydata.filter((element: ModalFile) => {
                    const isDuplicate = uniqueIds.includes(element.year);
                    if (!isDuplicate) {
                        uniqueIds.push(element.year);
                        return true;
                    }
                    return false;
                })
                filteredArr1.sort(compareYear)
                console.log(filteredArr1, "yearId's")
                filteredArr1.forEach((item) => {
                    item.amount = calculateYeartot(item.year)
                })
                console.log(AllData, filteredArr1, "testmonth")
                setdailyTotal(calculateDailytot(filteredArr1))
                setYearlyData(filteredArr1)
                setModalData(filteredArr1)
                groupData(filteredArr1, 'Category', calculateDailytot(filteredArr1))
                break;
            case 'BarCh':
                setPageSelect('BarCh');
                break;
            case 'PieCh':
                setPageSelect('PieCh');
                break;
        }
    }


    return (
        <div>
            {/* <NavBar></NavBar> */}
            <div className="main">
                <div className="Sidebar">
                    <SideBar handleCliclPageChange={handleCliclPageChange}></SideBar>
                </div>
                <div className="Detail">
                    <DateSection handleAddExpense={handleAddExpense}></DateSection>
                    <TodaysExpenseSect dailyTotal={dailyTotal} ></TodaysExpenseSect>
                    <div className="Detail_maincontent">
                        <TableSection ModalData={ModalData}></TableSection>
                        <div className="chart">
                            <div className="header">
                                <h3>Data Analysis</h3>
                            </div>
                            <ResponsiveContainer width="100%" height="100%">
                                <div> {PageSelect == 'BarCh' ? <BarCharts barData={ModalData}></BarCharts>
                                    : <PieCharts pieData={PieChartData}></PieCharts>}</div>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;


