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
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TuneIcon from '@mui/icons-material/Tune';
import { Props } from 'recharts/types/container/Surface';
import Popover from '@mui/material/Popover';
import { Generic } from './interface'
import Typography from '@mui/material/Typography';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';

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
    <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }} align="right">Amount</TableCell>
    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Time</TableCell>
    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Category</TableCell>
    {/* <TableCell align="right">SubCat</TableCell>
    <TableCell align="right">Purch. Mode</TableCell> */}
    {/* <TableCell align="right">Necessity</TableCell> */}
    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Comments</TableCell>
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
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const filteropen = Boolean(anchorEl);
  const id = filteropen ? 'simple-popover' : undefined;
  const [value, setValue] = React.useState<DateRange<Dayjs>>([null, null]);

  const [Cat, setCat] = React.useState('');

  const handleCatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCat(event.target.value as string);
  };

  const handlefilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlefilterClose = () => {
    setAnchorEl(null);
  };

  const clearFilters = () => {
    setValue([null, null])
    setCat('')
    props.setModalData(props.AllData);
    let PieData = props.PieCategories.SetbarchartData('Category', props.AllData)
    props.setPieModalData(PieData)
  }

  const handleDateChange = (inp1: Date, inp2?: Date) => {
    let filtered = props.PieCategories.getfilteredItemsbydates(props.AllData, inp1, inp2)
    console.log(filtered, 'filtered')
    props.setModalData(filtered);
    let PieData = props.PieCategories.SetbarchartData('Category', filtered)
    props.setPieModalData(PieData)
  }

  const handleMonthChange = (month: string) => {
    let filtered = props.AllData.filter((item) => {
      let calval = props.PieCategories.Calenderinfo.filter((item) => { return item.value == month })
      return item.month == calval[0].key
    })
    // props.setModalData(filtered);
    // let PieData = props.PieCategories.GroupData('Category', filtered, props.PieCategories.calculatetot(filtered))
    let calval = props.PieCategories.Calenderinfo.filter((item) => { return item.value == month })
    let consolidatedData = props.PieCategories.ConsildatebyMonth(calval[0].key, 2022, filtered)
    let PieData = props.PieCategories.SetbarchartData('Category', consolidatedData)

    // console.log(props.PieCategories.ConsildatebyMonth(calval[0].key, 2022, props.AllData), 'Month')
    props.setModalData(props.PieCategories.ConsildatebyMonth(calval[0].key, 2022, props.AllData));
    // props.setPieData(PieData)
    props.setPieModalData(PieData)
    props.setdailyTotal(props.PieCategories.calculatetot(filtered))
    props.setTablecatSelect({ page: 'Daily', cat: String(calval[0].key) })
  }
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
        {/* <TableCell align="right">{row.necessity}</TableCell> */}
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

  const LocalDateMultiInp = () => {
    return (
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={{ start: 'Start-Date', end: 'End-Date' }}
      >
        <DateRangePicker
          value={value}
          onChange={(newValue) => {

            let Date1: Date = new Date()
            if (newValue[0] != null) {
              Date1 = newValue[0].toDate()
            }
            handleDateChange(Date1, newValue[1]?.toDate())
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} id="date" type="date" helperText="Enter Start Date" size='small' sx={{ width: '150px' }} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} id="date" type="date" helperText="Enter End Date" size='small' />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
    )
  }

  const MonthInp = () => {
    return (
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
          handleMonthChange(event.target.value)
        }}
      >
        {props.PieCategories.Calenderinfo.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>)
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
    <div className="Detailtable">
      <div className="header">
        <div className="table_header">
          <h4>Expense Details</h4>
          <span>
            <IconButton sx={{ color: 'orange' }}>
              <TuneIcon></TuneIcon>
            </IconButton>
            <IconButton sx={{ color: 'orange' }}>
              <TableView onClick={() => setView('Default')}></TableView>
            </IconButton>
            <IconButton sx={{ color: 'orange' }} onClick={() => {
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
            <IconButton sx={{ color: 'orange' }} onClick={handlefilterClick}>
              <FilterAltIcon></FilterAltIcon>
            </IconButton>
          </span>
        </div>
      </div>
      {View == 'Tab' ? <TableGroupTabs setPieModalData={props.setPieModalData} InitialData={InitialData_frGroup}
        AllData={props.AllData} PieCategories={props.PieCategories} setBarModalData={props.setBarModalData}></TableGroupTabs> :
        <div>
          {/* <div className='table-date'>
            {props.page == 'Home' ? <TextField
              id="date"
              label="Enter Date"
              type="date"
              size="small"
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
              <MonthInp></MonthInp>
              : ''}

          </div> */}
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
      <Popover
        sx={{ textAlign: 'center' }}
        id={id}
        open={filteropen}
        anchorEl={anchorEl}
        onClose={handlefilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography variant='h6' sx={{ p: 2 }} >Filter Expenses</Typography>
        <Stack spacing={2} direction="row" sx={{ margin: '5px' }}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <TextField
                required
                id="outlined-basic"
                select
                label="Select"
                size="small"
                helperText="Select Category"
                value={Cat}
                onChange={handleCatChange}
              >
                {props.PieCategories.Usercat.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Box>
          {props.page == 'Home' ? <LocalDateMultiInp></LocalDateMultiInp> : props.page == 'Daily' ? <MonthInp></MonthInp> : ''}
        </Stack>
        <Button variant="contained" size='small' sx={{ margin: '10px' }}>Apply</Button>
        <Button variant="contained" size='small' sx={{ margin: '10px' }}
          onClick={clearFilters}>Clear Filters</Button>
      </Popover >
    </div >
  );
}

export default TableSection;
