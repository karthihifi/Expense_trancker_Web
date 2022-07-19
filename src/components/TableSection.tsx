import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModalFile from './interface';
import { pink } from '@mui/material/colors';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import './main.css'

interface ModalDataProps {
  ModalData: ModalFile[];
  page: string;
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
) {
  return { date, currency, amount, time, category, subcategory, availmode, necessity };
}

const Homeheader = (): any => {
  return (<TableRow>
    <TableCell>Date</TableCell>
    <TableCell align="right">Amount</TableCell>
    <TableCell align="right">Time</TableCell>
    <TableCell align="right">Category</TableCell>
    <TableCell align="right">SubCat</TableCell>
    <TableCell align="right">Purch. Mode</TableCell>
    <TableCell align="right">Necessity</TableCell>
  </TableRow>)
}



const Monthly_Yearlyheader = (): any => {
  return (
    <TableRow>
      <TableCell>Month</TableCell>
      <TableCell align="right">Amount Spent</TableCell>
      <TableCell align="right">Variance</TableCell>
      <TableCell align="right">Spending Trend</TableCell>
    </TableRow>)
}



const TableSection: React.FC<ModalDataProps> = (props) => {

  const [PageSelect, setPageSelect] = React.useState(true);

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
        <TableCell align="right">{row.subcategory}</TableCell>
        <TableCell align="right">{row.availmode}</TableCell>
        <TableCell align="right">{row.necessity}</TableCell>
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
        <TableCell align="right">{row.amount} {row.currency}</TableCell>
        <TableCell align="right">{row.trendrate}%</TableCell>
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
        <h3>Expense Details</h3>
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
    </div >
  );
}

export default TableSection;
