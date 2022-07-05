import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModalFile from './interface';
import './main.css'

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
) {
  return { date, currency, amount, time, category, subcategory, availmode, necessity };
}


const TableSection: React.FC<ModalDataProps> = (props) => {

  // React.useEffect(() => {
  // setModalData(rows)
  // })

  return (
    <div className="table">
      <h3>Expennse Details</h3>
      <div className='table-cont'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Currency</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Time of Day</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">SubCategory</TableCell>
                <TableCell align="right">Mode of Purchase</TableCell>
                <TableCell align="right">Necessity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.ModalData.map((row) => (
                <TableRow
                  key={row.date}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell align="right">{row.currency}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.time}</TableCell>
                  <TableCell align="right">{row.category}</TableCell>
                  <TableCell align="right">{row.subcategory}</TableCell>
                  <TableCell align="right">{row.availmode}</TableCell>
                  <TableCell align="right">{row.necessity}</TableCell>
                  {/* <TableCell align="right">{row.dateno}</TableCell>
                  <TableCell align="right">{row.month}</TableCell>
                  <TableCell align="right">{row.year}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default TableSection;
