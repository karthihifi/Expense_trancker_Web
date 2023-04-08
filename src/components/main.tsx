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
import { ModalFile, ChartSchema, TredWidgets } from './interface';
import PieCharts from './PieChart'
import BarCharts from './BarChart'
import firebase_Expeseapp from "./firebase";
import { getDatabase, ref, set, push, get, child, query, limitToLast } from "firebase/database";
import exp from "constants";
import ProfileMenu from './ProfileSettings'
import AddCategory from './AddCategory'
import axios from 'axios';
import AddCurrency from './AddCurrency'
import PieCat from './PieCategories'
import PieCatSelect from './PieCatSect'
import TextField from '@mui/material/TextField';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import PageviewRoundedIcon from '@mui/icons-material/PageviewRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import Drawer from '@mui/material/Drawer';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SpendingTrend from '../components/Widgets/SpendingTrend'
import SpenTrend_forMostUsedCat from '../components/Widgets/SpenTrend_forMostUsedCat'
import SpendTrend_byCatCount from '../components/Widgets/SpendTrend_byCatCount'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
// import {collection, addDoc, Timestamp} from 'firebase/firestore'
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Accordion from 'react-bootstrap/Accordion';

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(firebase_Expeseapp);
const PieCategories = new PieCat()
console.log(PieCategories.Categories)
interface ModalDataProps {
    ModalData: ModalFile[];
}
interface CalenderProps {
    key: number,
    value: string
}

interface Glabaldata {
    username: string,
    currlabel: string, currsymbol: string, countryname: string,
    flag: string

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

// function writeUserData(expdata: ModalFile) {
//     const postListRef = ref(database, `ExpenseUser/${.username}/ProfileData`);
//     const newPostRef = push(postListRef);
//     set(newPostRef, expdata);
// }

function writeGlobalUserData(expdata: Glabaldata) {

    console.log(expdata, "ada")
    const Expref = ref(database, `ExpenseUser/${expdata.username}/ProfileData`);
    get(Expref).then((snapshot) => {
        console.log(snapshot.val(), 'ass')
        if (snapshot.val() == undefined || snapshot.val() == null) {
            const postListRef = ref(database, `ExpenseUser/${expdata.username}/ProfileData`);
            const newPostRef = push(postListRef);
            set(newPostRef, expdata);
            return;
        }
        let id = Object.keys(snapshot.val())[0]
        const Expref1 = ref(database, `ExpenseUser/${expdata.username}/ProfileData/${id}`);
        get(Expref1).then((snapshot) => {
            console.log('Profiledata', snapshot.val(), id)
            set(Expref1, expdata)
            PieCategories.setGlobalData(expdata)
        })
    })
    // const postListRef = ref(database, `ExpenseUser/${expdata.username}/ProfileData`);
    // const newPostRef = push(postListRef);
    // set(newPostRef, expdata);
}

const Main: React.FC = (props) => {

    const [PageSelect, setPageSelect] = React.useState('Home');
    const [TablecatSelect, setTablecatSelect] = React.useState({ page: '', cat: '' });
    const [ChartSelect, setChartSelect] = React.useState('Pie');
    const [SideMenuopen, setSideMenuopen] = React.useState(false);

    const [dailyTotal, setdailyTotal] = React.useState<number>(0);
    const [MonthTotal, setMonthTotal] = React.useState<Number>(0);
    const [YearTotal, setYearTotal] = React.useState<Number>(0);

    const [ModalData, setModalData] = React.useState<ModalFile[]>([]);
    const [BarModalData, setBarModalData] = React.useState<string[][]>([]);
    const [WeeklyTrendLineChData, setWeeklyTrendLineChData] = React.useState<TredWidgets>({ chartData: [[]], AvgDailySpent: 0, AvgWeekspent: 0 });
    const [WeeklyTrendLineCateg_ChData, setWeeklyTrendLineCateg_ChData] = React.useState<TredWidgets>({ chartData: [[]], AvgDailySpent: 0, AvgWeekspent: 0 });
    const [WeeklyTrendby_CategoryCount_ChData, setWeeklyTrendby_CategoryCount_ChData] = React.useState<string[][]>([]);
    const [PieModalData, setPieModalData] = React.useState<string[][]>([]);
    const [AllData, setAllData] = React.useState<ModalFile[]>([]);

    const [DailyData, setDailyData] = React.useState<ModalFile[]>([]);
    const [MontlyData, setMontlyData] = React.useState<ModalFile[]>([]);
    const [YearlyData, setYearlyData] = React.useState<ModalFile[]>([]);

    const [catModalOpen, setcatModalOpen] = React.useState<boolean>(false);
    const [currModalOpen, setcurrModalOpen] = React.useState<boolean>(false);
    const [maxcount, setmaxcount] = React.useState<number>(1000);
    const [PieChartData, setPieChartData] = React.useState<PieChartIntf[]>([]);

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const GrapViewopen = Boolean(anchorEl);
    const ModeViewopen = Boolean(anchorEl);
    const GrapViewid = GrapViewopen ? 'simple-popover' : undefined;
    const ModeViewid = ModeViewopen ? 'simple-popover' : undefined;

    const [GlobalUserData, setGlobalUserData] = React.useState<Glabaldata>({
        username: 'karthihifi',
        countryname: '', currlabel: '', currsymbol: '', flag: ''
    });

    const [CurrSymbols, setCurrSymbols] = React.useState<{
        currlabel: string, currsymbol: string, countryname: string,
        flag: string
    }[]>([]);

    const handleGrapViewClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleGrapViewClose = () => {
        setAnchorEl(null);
    };

    const getCountryDetails = () => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(res => {
                // console.log(res.data[0].currencies)
                let currencydata: any[] = []
                let restdata: any[] = res.data
                let symbols: any = {}
                restdata.forEach(element => {
                    // console.log(Object.keys(element.currencies)[0], Object.values(element.currencies)[0])
                    const symbols = (symbol: any): string => {
                        // console.log(symbol)
                        let dummy: any = Object.values(symbol)[0];
                        return dummy.symbol
                    }
                    if (element.currencies != null) {
                        // console.log(Object.keys(element.currencies))
                        currencydata.push({
                            currlabel: Object.keys(element.currencies)[0],
                            currsymbol: symbols(element.currencies),
                            countryname: element.name.common,
                            flag: element.flags.svg
                        })
                    }

                });
                console.log(currencydata)
                setCurrSymbols(currencydata)
            })
    }
    React.useEffect(() => {
        console.log('recalled')
        // setModalData(rows)
        // let dailyTotal = calculateDailytot(rows)
        // setdailyTotal(dailyTotal)
        // setDailyData(rows)
        // setAllData(rows)
        // groupData(rows, 'Category', dailyTotal)
        // // console.log(dailyTotal)
        // // writeUserData(rows[0])
        readExpenseData()
        getCountryDetails()
    }, [])

    function writeUserData(expdata: ModalFile) {
        const postListRef = ref(database, `ExpenseUser/${GlobalUserData.username}/ExpenseData`);
        const newPostRef = push(postListRef);
        set(newPostRef, expdata);
    }


    const readExpenseData = async () => {
        const Expref = ref(database, `ExpenseUser/${GlobalUserData.username}`);
        let month = parseInt(new Date().toISOString().split('T')[0].split('-')[1])
        let year = parseInt(new Date().toISOString().split('T')[0].split('-')[0])
        let date = parseInt(new Date().toISOString().split('T')[0].split('-')[2])
        get(Expref).then((snapshot) => {
            if (snapshot.exists()) {
                let profiledata: any = Object.values(snapshot.val().ProfileData)[0]
                console.log('profiledata', profiledata)
                setGlobalUserData(profiledata)
                PieCategories.setGlobalData(profiledata)
                // console.log(profiledata,'profile')
                let dummy: ModalFile[] = Object.values(snapshot.val().ExpenseData)
                let ExpenseData: ModalFile[] = Object.values(snapshot.val().ExpenseData)
                ExpenseData = ExpenseData.reverse()
                if (ExpenseData.length > maxcount) {
                    ExpenseData = dummy.slice((dummy.length - maxcount), dummy.length)
                }
                let MonthData = ExpenseData.filter((item) => { return month == item.month && year == item.year })
                let DailyData = ExpenseData.filter((item) => { return month == item.month && year == item.year && date == item.dateno })

                setMonthTotal(PieCategories.calculatetot(MonthData))
                setModalData(ExpenseData)
                setBarModalData(PieCategories.SetbarchartData('Category', ExpenseData))
                setPieModalData(PieCategories.SetbarchartData('Category', ExpenseData))
                let dailyTotal = calculateDailytot(DailyData)
                setdailyTotal(dailyTotal)
                setDailyData(ExpenseData)
                setAllData(ExpenseData)
                groupData(ExpenseData, 'Category', dailyTotal)
                setWeeklyTrendLineChData(PieCategories.GetWeeklySpent(ExpenseData))
                setWeeklyTrendLineCateg_ChData(PieCategories.GetWeeklySpentonCategory(ExpenseData))
                setWeeklyTrendby_CategoryCount_ChData(PieCategories.getCatgorySpentCount_byWeek(ExpenseData))
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

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
        writeUserData(Modal)
        let dummydata: ModalFile[] = [...AllData];
        dummydata.push(Modal)
        setAllData(dummydata)
        setModalData(dummydata)
        // setModalData(prevData => [...prevData, Modal])
        // console.log(dummydata, 'After')
        setdailyTotal(calculateDailytot(dummydata))
        let month = parseInt(new Date().toISOString().split('T')[0].split('-')[1])
        let year = parseInt(new Date().toISOString().split('T')[0].split('-')[0])
        const dailyItems = dummydata.filter((item) => { return (item.month == month && item.year == year) })
        groupData(dailyItems, 'Category', calculateDailytot(dailyItems))
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
                // console.log(PieData, "Piedata")
                setPieChartData(PieData)
                // setBarModalData(PieCategories.SetbarchartData('Category', ModalData))
                setPieModalData(PieCategories.SetbarchartData('Category', ModalData))
                break;
            case 'Date':
                let PieData3: PieChartIntf[] = []
                ModalData.forEach((item) => {
                    let percent = Math.round(100 * (item.amount / total))
                    PieData3.push({ name: item.date, value: percent })
                })
                console.log(PieData3, "Piedata")
                setPieChartData(PieData3)
                setPieModalData(PieCategories.SetbarchartData('Category', ModalData))
                break;
            case 'Month':
                let PieData1: PieChartIntf[] = []
                let year = parseInt(new Date().toISOString().split('T')[0].split('-')[0])
                Calenderinfo.forEach((cat) => {
                    let filetreditems: ModalFile[] = ModalData.filter((item) => { return (item.month === cat.key && item.year == year) })
                    if (filetreditems.length >= 1) {
                        console.log(calculatetot(filetreditems), total)
                        let percent = Math.round((100 * calculatetot(filetreditems)) / total)
                        PieData1.push({ name: cat.value, value: percent })
                    }
                })
                console.log(PieData1, "Piedata")
                setPieChartData(PieData1)
                break;
            case 'Year':
                let PieData2: PieChartIntf[] = []
                ModalData.forEach((item) => {
                    PieData2.push({ name: item.date, value: item.amount })
                })
                console.log(PieData2, "Piedata")
                setPieChartData(PieData2)
                break;
            default:
                break;
        }
    }

    const handleCatModalclose = () => {
        setcatModalOpen(false)
    }

    const handleCurrModalclose = () => {
        setcurrModalOpen(false)
    }

    const handlecurrencysave = () => {
        writeGlobalUserData(GlobalUserData)
        handleCurrModalclose()
    }
    const handlecountryselect = (country: string) => {
        let dummydata = { ...GlobalUserData }
        dummydata.countryname = country
        console.log('currencybef', dummydata, GlobalUserData)
        let currdata = CurrSymbols.find((item) => { return item.countryname == country })
        if (currdata != undefined) {
            // dummydata.
            dummydata.currsymbol = currdata.currsymbol
            dummydata.flag = currdata?.flag
            dummydata.currlabel = currdata?.currlabel
        }
        console.log('currency', dummydata)
        setGlobalUserData(dummydata)
        // handleCurrModalclose()
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
                const dailyItems = AllData.filter((item) => { return (item.month == month && item.year == year && item.dateno == date) })
                setdailyTotal(calculateDailytot(dailyItems))
                setModalData(dailyItems)
                setBarModalData(PieCategories.SetbarchartData('Category', dailyItems))
                setPieModalData(PieCategories.SetbarchartData('Category', dailyItems))
                console.log(dailyItems, "Home")
                groupData(dailyItems, 'Category', calculateDailytot(dailyItems))
                setSideMenuopen(false)
                break;
            case 'Daily':
                setPageSelect('Daily');
                let dailyitemsarr: ModalFile[] = []
                const dymmydata1: ModalFile[] = JSON.parse(JSON.stringify(AllData));
                const getDays = (year: number, month: number) => new Date(year, month, 0).getDate()

                const days = getDays(year, month)
                // console.log(days,"asss",dymmydata1)
                let noofdays = [...Array(days + 1).keys()].slice(1);
                console.log([...Array(days)], "noof")
                noofdays.forEach((item: number) => {
                    let day: number = item
                    let dailyCumItems = dymmydata1.filter((item) => { return (item.dateno == day && item.month == month && item.year == year) })
                    // console.log(day,"asss",dailyCumItems,noofdays)
                    let array1: ModalFile[] = dymmydata1.filter((item) => {
                        return item.dateno == day && item.month == month && item.year == year
                    })
                    if (array1.length >= 1) {
                        console.log(array1, "ada")
                        console.log(calculateDailytot(array1))
                        let arritem: ModalFile = array1[0]
                        arritem.mostusedcat = PieCategories.GetHighestspentData('category', dailyCumItems, calculateDailytot(dailyCumItems))
                        arritem.amount = calculateDailytot(array1)
                        //arritem.mostusedcat = PieCategories.GetHighestspentData('category', dailyCumItems, calculateDailytot(dailyCumItems))
                        // let DailyItems = AllData.filter((item) => { return (item.month == month && item.year == year) })
                        dailyitemsarr.push(arritem)
                    }
                })
                // console.log(dailyitemsarr)
                let prev1: number = 0
                dailyitemsarr.forEach((item, iter) => {
                    if (iter == 0) {
                        prev1 = item.amount
                    }
                    let percent = Math.round(((item.amount - prev1) / prev1) * 100)
                    prev1 = item.amount
                    item.trendrate = String(percent)
                    if (percent == 0) {
                        item.trendicon = 'neutral'
                    } else if (percent > 0) {
                        item.trendicon = 'up'
                    } else {
                        item.trendicon = 'down'
                    }
                })

                setdailyTotal(calculateDailytot(dailyitemsarr))
                setModalData(dailyitemsarr)
                setBarModalData(PieCategories.SetbarchartData('Date', dailyitemsarr))
                setPieModalData(PieCategories.SetbarchartData('Date', dailyitemsarr))
                console.log(dailyitemsarr, "Home")
                groupData(dailyitemsarr, 'Date', calculateDailytot(dailyitemsarr))
                setSideMenuopen(false)
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
                let prev: number = 0
                console.log(filteredArr, "fil")
                filteredArr.forEach((item, iter) => {

                    item.amount = calculateMonthtot(item.month, item.year)
                    let index = Calenderinfo.findIndex(row => { return row.key == item.month })
                    item.date = Calenderinfo[index].value
                    if (iter == 0) {
                        prev = item.amount
                    }
                    // console.log(item.amount, prev, iter)
                    let percent = Math.round(((item.amount - prev) / prev) * 100)
                    prev = item.amount
                    item.trendrate = String(percent)
                    let MonItems = AllData.filter((All) => { return (All.month == item.month && All.year == item.year) })
                    console.log(MonItems, "Mon")
                    item.mostusedcat = PieCategories.GetHighestspentData('category', MonItems, calculateDailytot(MonItems))
                    if (percent == 0) {
                        item.trendicon = 'neutral'
                    } else if (percent > 0) {
                        item.trendicon = 'up'
                    } else {
                        item.trendicon = 'down'
                    }
                    console.log(percent, item.trendicon)
                })
                let montot = calculateDailytot(filteredArr)
                setdailyTotal(montot)
                setMontlyData(filteredArr)
                setModalData(filteredArr)
                setBarModalData(PieCategories.SetbarchartData('Month', filteredArr))
                setPieModalData(PieCategories.SetbarchartData('Month', filteredArr))
                groupData(filteredArr, 'Month', calculateDailytot(filteredArr))
                setSideMenuopen(false)

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
                    item.date = String(item.year)
                })
                // console.log(AllData, filteredArr1, "testmonth")
                setdailyTotal(calculateDailytot(filteredArr1))
                setYearlyData(filteredArr1)
                setModalData(filteredArr1)
                setBarModalData(PieCategories.SetbarchartData('Year', filteredArr1))
                setPieModalData(PieCategories.SetbarchartData('Year', filteredArr1))
                groupData(filteredArr1, 'Year', calculateDailytot(filteredArr1))
                setSideMenuopen(false)
                break;
            case 'BarCh':
                // setPageSelect('BarCh');
                setChartSelect('Bar')
                setSideMenuopen(false)
                break;
            case 'PieCh':
                // setPageSelect('PieCh');
                setChartSelect('Pie')
                setSideMenuopen(false)
                break;
            case 'Profile':
                // setPageSelect('PieCh');
                break;
            case 'Currency':
                // setPageSelect('PieCh');
                // setcatModalOpen(true)
                setcurrModalOpen(true)
                setSideMenuopen(false)
                break;

            case 'Category':
                setcatModalOpen(true)
                setSideMenuopen(false)
                break;
        }
    }


    return (
        <div className="App">
            <NavBar handleCliclPageChange={handleCliclPageChange} profiledata={GlobalUserData}
                setChartSelect={setChartSelect} ></NavBar>
            <div className="main">
                {/* <div className="Sidebar"> */}
                {/* <div className="Sidebar_menu">
                    <IconButton onClick={(event) => setSideMenuopen(true)}>
                        <MenuIcon></MenuIcon>
                    </IconButton>
                </div> */}
                <Drawer
                    sx={{
                        width: '240px',
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: '240px',
                            boxSizing: 'border-box',
                        },
                    }}
                    // variant="persistent"
                    anchor="left"
                    open={SideMenuopen}
                >
                    <SideBar setSideMenuopen={setSideMenuopen} profiledata={GlobalUserData}
                        handleCliclPageChange={handleCliclPageChange}></SideBar>
                </Drawer>
                {/* </div> */}
                <Container maxWidth='xl'>
                    <div className="Detail">
                        {/* <ProfileMenu></ProfileMenu> */}
                        {/* <Accordion className="Detail_Accor" flush>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <h4>Add Expense Details</h4></Accordion.Header>
                                <Accordion.Body> */}
                        <DateSection PieCategories={PieCategories} GlobalData={GlobalUserData} handleAddExpense={handleAddExpense}></DateSection>
                        {/* </Accordion.Body>
                            </Accordion.Item>
                        </Accordion> */}
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <SpendingTrend ChartData={WeeklyTrendLineChData}></SpendingTrend>
                            </Grid>
                            <Grid item xs={4}>
                                <SpendTrend_byCatCount ChartData={WeeklyTrendby_CategoryCount_ChData}></SpendTrend_byCatCount>
                            </Grid>
                            <Grid item xs={4}>
                                <SpenTrend_forMostUsedCat ChartData={WeeklyTrendLineCateg_ChData}></SpenTrend_forMostUsedCat>
                            </Grid>

                        </Grid>

                        {/* <TodaysExpenseSect dailyTotal={dailyTotal + ' ' + GlobalUserData.currlabel} Monthtot={MonthTotal + ' ' + GlobalUserData.currlabel}></TodaysExpenseSect> */}
                        <Grid container spacing={2} sx={{ maxHeight: "600px" }}>
                            {/* <div className="Detail_maincontent"> */}
                            {/* <div> */}
                            <Grid item xs={7} sx={{ maxHeight: "600px" }}>
                                <TableSection setdailyTotal={setdailyTotal} setPieData={setPieChartData}
                                    setTablecatSelect={setTablecatSelect} setPieModalData={setPieModalData}
                                    PieCategories={PieCategories} AllData={AllData} setModalData={setModalData}
                                    page={PageSelect} ModalData={ModalData} setBarModalData={setBarModalData}></TableSection>
                            </Grid>
                            {/* </div> */}
                            <Grid item xs={5} sx={{ maxHeight: "600px" }}>
                                <div className="chart">
                                    <div className="chart-header">
                                        <h4>Data Analysis</h4>
                                        <span>
                                            <IconButton sx={{ color: 'orange' }} onClick={handleGrapViewClick}>
                                                <PageviewRoundedIcon></PageviewRoundedIcon>
                                            </IconButton>
                                            <IconButton sx={{ color: 'orange' }}>
                                                <InsightsRoundedIcon></InsightsRoundedIcon>
                                            </IconButton>
                                        </span>
                                    </div>

                                    {/* <PieCatSelect page={PageSelect} PieCategories={PieCategories} TablecatSelect={TablecatSelect}
                                        AllData={AllData} ModalData={ModalData} total={dailyTotal} charttype={ChartSelect}
                                        setChartSelect={setChartSelect}
                                        setPieData={setPieChartData} setBarModalData={setBarModalData} setPieModalData={setPieModalData}></PieCatSelect> */}
                                    <ResponsiveContainer width="100%" height="100%">
                                        <div> {ChartSelect == 'Bar' ? <BarCharts barData={BarModalData}></BarCharts>
                                            : <PieCharts pieData={PieModalData}></PieCharts>}</div>
                                    </ResponsiveContainer>
                                </div>
                            </Grid>
                            {/* </div> */}
                        </Grid>
                    </div>
                </Container>
                <AddCategory openCatmodal={catModalOpen} handleCatModalclose={handleCatModalclose}></AddCategory>
                <AddCurrency openCurrmodal={currModalOpen} handleCurrModalclose={handleCurrModalclose}
                    CountryDetails={CurrSymbols} globalCurrencydata={GlobalUserData}
                    handlecountryselect={handlecountryselect} handlecurrencysave={handlecurrencysave}></AddCurrency>
            </div>

            <Popover
                sx={{ textAlign: 'center' }}
                id={GrapViewid}
                open={GrapViewopen}
                anchorEl={anchorEl}
                onClose={handleGrapViewClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <PieCatSelect page={PageSelect} PieCategories={PieCategories} TablecatSelect={TablecatSelect}
                    AllData={AllData} ModalData={ModalData} total={dailyTotal} charttype={ChartSelect}
                    setChartSelect={setChartSelect}
                    setPieData={setPieChartData} setBarModalData={setBarModalData} setPieModalData={setPieModalData}></PieCatSelect>
            </Popover >
        </div>

    );
}

export default Main;


