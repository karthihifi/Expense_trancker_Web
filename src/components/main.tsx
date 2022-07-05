// import React from 'react';
// import logo from './logo.svg';
// import './App.css';


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

interface ModalDataProps {
  ModalData: ModalFile[];
}

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
  year: number
) {
  return { date, currency, amount, time, category, subcategory, availmode, necessity, dateno, month, year };
}

const rows = [
  createData('2022-07-03', 'EUR', 6.0, 'Afternoon', 'Food', 'Junk', 'Online', 'Needed', 3, 7, 2022),
  createData('2022-07-03', 'USD', 9.0, 'Morning', 'Clothes', 'Formals', 'Online', 'Maybe', 3, 7, 2022)
];




const Main: React.FC = (props) => {

  const [PageSelect, setPageSelect] = React.useState('Home');

  const [dailyTotal, setdailyTotal] = React.useState<Number>(0);
  const [MonthTotal, setMonthTotal] = React.useState<Number>(0);
  const [YearTotal, setYearTotal] = React.useState<Number>(0);

  const [ModalData, setModalData] = React.useState<ModalFile[]>([],);
  const [AllData, setAllData] = React.useState<ModalFile[]>([],);

  const [DailyData, setDailyData] = React.useState<ModalFile[]>([],);
  const [MontlyData, setMontlyData] = React.useState<ModalFile[]>([],);
  const [YearlyData, setYearlyData] = React.useState<ModalFile[]>([],);

  React.useEffect(() => {
    console.log('recalled')
    setModalData(rows)
    let dailyTotal = calculateDailytot(rows)
    setdailyTotal(dailyTotal)
    setDailyData(rows)
    setAllData(rows)
    console.log(dailyTotal)
  }, [])

  const calculateDailytot = (TableData: ModalFile[]): Number => {
    // let date = parseInt(new Date().toISOString().split('T')[0].split('-')[2])
    // let month = parseInt(new Date().toISOString().split('T')[0].split('-')[1])
    // let year = parseInt(new Date().toISOString().split('T')[0].split('-')[0])
    // const dailyItems = TableData.filter((item) => { return (item.dateno == date && item.month == month && item.year == year) })
    // console.log(dailyItems, TableData, date, month, year)
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

  const calculateYeartot = (): Number => {
    let date = parseInt(new Date().toISOString().split('T')[0].split('-')[2])
    let month = parseInt(new Date().toISOString().split('T')[0].split('-')[1])
    let year = parseInt(new Date().toISOString().split('T')[0].split('-')[0])
    const dailyItems = ModalData.filter((item) => { return (item.year == year) })
    console.log(dailyItems, ModalData, date, month, year)
    let total = dailyItems.reduce((tot, val) => {
      const { amount } = val
      return tot + amount
    }, 0)
    return total
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

  const handleCliclPageChange = (pageSelect: string) => {
    console.log(pageSelect, 'pagesel')
    let date = parseInt(new Date().toISOString().split('T')[0].split('-')[2])
    let month = parseInt(new Date().toISOString().split('T')[0].split('-')[1])
    let year = parseInt(new Date().toISOString().split('T')[0].split('-')[0])
    switch (pageSelect) {
      case 'Home':
        setPageSelect('Home');
        const dailyItems = AllData.filter((item) => { return (item.dateno == date && item.month == month && item.year == year) })
        setdailyTotal(calculateDailytot(dailyItems))
        setModalData(dailyItems)
        break;
      case 'Mon':
        setPageSelect('Mon');
        setdailyTotal(calculateMonthtot(month, year))
        const dymmydata:ModalFile[] = JSON.parse(JSON.stringify(AllData));
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
        })
        console.log(AllData, filteredArr)
        setdailyTotal(calculateDailytot(filteredArr))
        setMontlyData(filteredArr)
        setModalData(filteredArr)
        break;
      case 'Year':
        setPageSelect('Year');
        setdailyTotal(calculateYeartot())
        const yearlyItems = AllData.filter((item) => { return (item.year == year) })
        setdailyTotal(calculateDailytot(yearlyItems))
        setYearlyData(yearlyItems)
        setModalData(yearlyItems)
        break;
      case 'BarCh':
        setPageSelect('BarCh');
        break;
      case 'PieCh':
        setPageSelect('PieCh');
        break;
    }
  }

  // Sample data
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];


  return (
    <div>
      <NavBar></NavBar>
      <div className="main">
        <div className="Sidebar">
          <SideBar handleCliclPageChange={handleCliclPageChange}></SideBar>
        </div>
        <div className="Detail">
          <DateSection handleAddExpense={handleAddExpense}></DateSection>
          <TodaysExpenseSect dailyTotal={dailyTotal}></TodaysExpenseSect>
          {PageSelect == 'Home' || PageSelect == 'Mon' || PageSelect == 'Year' ? <TableSection ModalData={ModalData}></TableSection> : ''}
          {PageSelect == 'BarCh' ?
            <div className="chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={ModalData}
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
                  {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                </BarChart>
              </ResponsiveContainer>

            </div>
            : ''}
        </div>
      </div>
    </div>
  );
}

export default Main;

// function App() {
//   const Main : React.FC = () =>{
//     // static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';
//   return (
//     <div >
//         <div>test</div>
//          <ResponsiveContainer width="100%" height="100%">
//         <BarChart
//           width={500}
//           height={300}
//           data={data}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="pv" fill="#8884d8" />
//           <Bar dataKey="uv" fill="#82ca9d" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default Main;


