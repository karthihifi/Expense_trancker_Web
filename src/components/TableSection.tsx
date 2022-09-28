import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ModalFile } from './interface';
import { pink } from '@mui/material/colors';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TableViewIcon from '@mui/icons-material/TableView';
import TabIcon from '@mui/icons-material/Tab';
import './main.css'
import TextField from '@mui/material/TextField';
import PieCat from './PieCategories'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TableView } from '@mui/icons-material';
import TableGroupTabs from './TableGroupView'
import IconButton from '@mui/material/IconButton';
import { Props } from 'recharts/types/container/Surface';
import { Generic } from './interface'

interface ModalDataProps {
  setdailyTotal: (tot: number) => void
  AllData: ModalFile[]
  ModalData: ModalFile[];
  page: string;
  setModalData: (ModalData: ModalFile[]) => void
  setTablecatSelect: (cat: { page: string, cat: string }) => void
  PieCategories: PieCat
  setPieData: (ModalData: { name: string, value: number }[]) => void;
  setPieModalData: (ModalData: string[][]) => void;
  setBarModalData: (ModalData: string[][]) => void;
}

// const ModalClass = new PieCat()
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
) {
  return { date, currency, amount, time, category, subcategory, availmode, necessity };
}

const Homeheader = (): any => {
  return (<TableRow>
    <TableCell>Date</TableCell>
    <TableCell align="right">Amount</TableCell>
    <TableCell align="right">Time</TableCell>
    <TableCell align="right">Category</TableCell>
    {/* <TableCell align="right">SubCat</TableCell>
    <TableCell align="right">Purch. Mode</TableCell> */}
    <TableCell align="right">Necessity</TableCell>
    <TableCell align="right">Comments</TableCell>
  </TableRow>)
}



const Monthly_Yearlyheader = (): any => {
  return (
    <TableRow>
      <TableCell>Month</TableCell>
      <TableCell align="right">Amount Spent</TableCell>
      <TableCell align="right">Variance</TableCell>
      <TableCell align="right">Most Used Category</TableCell>
      <TableCell align="right">Spending Trend</TableCell>
    </TableRow>)
}



const TableSection: React.FC<ModalDataProps> = (props) => {

  const [PageSelect, setPageSelect] = React.useState(true);
  const [View, setView] = React.useState('Default');
  const [InitialData_frGroup, setInitialData_frGroup] = React.useState<Generic[]>([]);

  const Homeheaderdata = (row: ModalFile): any => {
    return (
      <TableRow
        //   key={row.date}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        {/* <TableCell align="right">{row.currency}</TableCell> */}
        <TableCell align="right">{row.amount} {row.currency}</TableCell>
        <TableCell align="right">{row.time}</TableCell>
        <TableCell align="right">{row.category}</TableCell>
        {/* <TableCell align="right">{row.subcategory}</TableCell>
        <TableCell align="right">{row.availmode}</TableCell> */}
        <TableCell align="right">{row.necessity}</TableCell>
        <TableCell className='table_comments' align="right">{row.comments}</TableCell>
        {/* <TableCell align="right">{row.trendrate}<TrendingUpIcon sx={{ color: pink[500] }}></TrendingUpIcon></TableCell> */}
        {/* <TableCell align="right">{row.dateno}</TableCell>
                  <TableCell align="right">{row.month}</TableCell>
                  <TableCell align="right">{row.year}</TableCell> */}
      </TableRow>
    )
  }

  const Monthly_Yearlyheaderdata = (row: ModalFile): any => {
    return (
      <TableRow
        //   key={row.date}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell align="right">{row.amount.toLocaleString()} {row.currency}</TableCell>
        <TableCell align="right">{row.trendrate}%</TableCell>
        <TableCell align="right">{row.mostusedcat}</TableCell>
        <TableCell align="right">
          {row.trendicon == 'up' ? <TrendingUpIcon sx={{ color: pink[500] }}></TrendingUpIcon> :
            row.trendicon == 'down' ? <TrendingDownIcon color="success"></TrendingDownIcon> :
              <TrendingFlatIcon color="disabled"></TrendingFlatIcon>}

        </TableCell>
      </TableRow>
    )
  }

  // const pagesel = (): boolean => {
  //   let home = false;
  //   if (pageselected == 'Home') {
  //     home = true;
  //   }
  //   return home
  // }
  // React.useEffect(() => {
  // setModalData(rows)
  // })
  console.log(props)
  let pageselected: string = props.page

  return (
    <div className="table">
      <div className="header">
        <div className="table_header">
          <h3>Expense Details</h3>
          <span>
            <IconButton>
              <TableView onClick={() => setView('Default')}></TableView>
            </IconButton>
            <IconButton onClick={() => {
              let month = parseInt(new Date().toISOString().split('T')[0].split('-')[1])
              let year = parseInt(new Date().toISOString().split('T')[0].split('-')[0])
              let ModelData = props.AllData.filter((item) => { return item.month == month && item.year == year })
              let filteredData = props.PieCategories.GroupData_gc('Category', ModelData)
              console.log('filtered', filteredData)
              setInitialData_frGroup(filteredData)
              setView('Tab')
            }
            }>
              <TabIcon></TabIcon>
            </IconButton>
          </span>
        </div>
      </div>
      {View == 'Tab' ? <TableGroupTabs setPieModalData={props.setPieModalData} InitialData={InitialData_frGroup} 
      AllData={props.AllData} PieCategories={props.PieCategories} setBarModalData={props.setBarModalData}></TableGroupTabs> :
        <div>
          <div className='table-date'>
            {props.page == 'Home' ? <TextField
              // required
              // error={errorFileds.date}
              id="date"
              label="Enter Date"
              type="date"
              // defaultValue= {defDate}
              // value={expData.date}
              size="small"
              //   className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                console.log(event.target.value)
                let filtered = props.AllData.filter((item) => {
                  return item.date == event.target.value
                })
                props.setModalData(filtered);
                // let PieData = props.PieCategories.GroupData('Category', filtered, props.PieCategories.calculatetot(filtered))
                let PieData = props.PieCategories.SetbarchartData('Date', filtered)
                // props.setPieData(PieData)
                props.setPieModalData(PieData)
                props.setdailyTotal(props.PieCategories.calculatetot(filtered))
                props.setTablecatSelect({ page: 'Home', cat: event.target.value })
                console.log(filtered, "da")
              }}
            /> : props.page == 'Daily' ?
              <TextField
                sx={{ m: 1, minWidth: 120 }}
                select
                // multiple
                id="month"
                label="Enter Month"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => {
                  console.log(event.target.value)
                  let filtered = props.AllData.filter((item) => {
                    let calval = props.PieCategories.Calenderinfo.filter((item) => { return item.value == event.target.value })
                    return item.month == calval[0].key
                  })
                  // props.setModalData(filtered);
                  // let PieData = props.PieCategories.GroupData('Category', filtered, props.PieCategories.calculatetot(filtered))
                  let calval = props.PieCategories.Calenderinfo.filter((item) => { return item.value == event.target.value })
                  let consolidatedData = props.PieCategories.ConsildatebyMonth(calval[0].key, 2022, filtered)
                  let PieData = props.PieCategories.SetbarchartData('Date', consolidatedData)

                  // console.log(props.PieCategories.ConsildatebyMonth(calval[0].key, 2022, props.AllData), 'Month')
                  props.setModalData(props.PieCategories.ConsildatebyMonth(calval[0].key, 2022, props.AllData));
                  // props.setPieData(PieData)
                  props.setPieModalData(PieData)
                  props.setdailyTotal(props.PieCategories.calculatetot(filtered))
                  props.setTablecatSelect({ page: 'Daily', cat: String(calval[0].key) })
                  console.log(filtered, "da")
                }}
              >
                {props.PieCategories.Calenderinfo.map((option) => (
                  <MenuItem key={option.key} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              : ''}

          </div>
          <div className='table-cont'>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
                <TableHead>
                  {props.page == 'Home' ? <Homeheader></Homeheader> : <Monthly_Yearlyheader></Monthly_Yearlyheader>}
                </TableHead>
                <TableBody>
                  {props.ModalData.map((row: ModalFile) => (
                    props.page == 'Home' ? <Homeheaderdata {...row}></Homeheaderdata> : <Monthly_Yearlyheaderdata {...row}></Monthly_Yearlyheaderdata>
                  ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      }
    </div >
  );
}

export default TableSection;
