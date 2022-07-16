import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import ModalFile from './interface';
import './main.css'
import exp from 'constants';
import Box from '@mui/material/Box';

interface Glabaldata {
    username: string,
    currlabel: string, currsymbol: string, countryname: string,
    flag: string

}

interface MainProps {
    handleAddExpense: (ModalData: ModalFile) => void;
    GlobalData: Glabaldata
}

interface ErrorFields {
    date: boolean
    currency: boolean,
    amount: boolean,
    time: boolean,
    category: boolean,
    necessity: boolean
}

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
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

const findmonth = (month: number): string => {
    let index = Calenderinfo.findIndex(row => { return row.key == month })
    return Calenderinfo[index].value
}

const defaultExpData: ModalFile = {
    date: new Date().toISOString().split('T')[0],
    currency: '€',
    amount: 0,
    time: '',
    category: '',
    subcategory: '',
    availmode: '',
    necessity: '',
    comments: '',
    dateno: parseInt(new Date().toISOString().split('T')[0].split('-')[2]),
    month: parseInt(new Date().toISOString().split('T')[0].split('-')[1]),
    monthstr: findmonth(parseInt(new Date().toISOString().split('T')[0].split('-')[1])),
    year: parseInt(new Date().toISOString().split('T')[0].split('-')[0])
}

const defaultFieldState: ErrorFields = {
    date: false,
    currency: false,
    amount: false,
    time: false,
    category: false,
    necessity: false
}
const DateSection: React.FC<MainProps> = (props) => {

    const [defDate, SetdefDate] = React.useState(new Date().toISOString().split('T')[0])

    const [expData, setexpData] = React.useState<ModalFile>(defaultExpData);

    const [errorFileds, setErrorfields] = React.useState<ErrorFields>(defaultFieldState)

    const [CurrSymbols, setCurrSymbols] = React.useState<{ label: string, value: string }[]>([]);

    const validationerror = (): boolean => {

        let errorfields = { ...errorFileds }
        if (expData.date == null || expData.date == undefined || expData.date == '') {
            errorfields.date = true
            // setErrorfields({ ...errorFileds, date: true })
        }

        if (expData.amount == null || expData.amount == undefined || expData.amount == 0) {
            errorfields.amount = true
            // setErrorfields({ ...errorFileds, amount: true })
        }

        if (expData.time == null || expData.time == undefined || expData.time == '') {
            errorfields.time = true
            // setErrorfields({ ...errorFileds, time: true })
        }

        if (expData.category == null || expData.category == undefined || expData.category == '') {
            // setErrorfields({ ...errorFileds, category: true })
            errorfields.category = true
        }

        if (expData.necessity == null || expData.necessity == undefined || expData.necessity == '') {
            errorfields.necessity = true
            // setErrorfields({ ...errorFileds, necessity: true })
            // console.log(errorFileds)
        }

        if (expData.currency == null || expData.currency == undefined || expData.currency == '') {
            errorfields.currency = true
            // setErrorfields({ ...errorFileds, currency: true })
        }
        setErrorfields(errorfields)
        console.log(errorfields)

        let error = false
        if (expData.date == null || expData.date == undefined) {
            return true
        }

        if (expData.amount == null || expData.amount == undefined || expData.amount == 0) {
            return true
        }

        if (expData.time == null || expData.time == undefined || expData.time == '') {
            return true
        }

        if (expData.category == null || expData.category == undefined || expData.category == '') {
            return true
        }

        if (expData.necessity == null || expData.necessity == undefined || expData.necessity == '') {
            return true
        }

        if (expData.currency == null || expData.currency == undefined || expData.currency == '') {
            return true
        }
        return error
    }

    const handleChange =
        (prop: keyof ModalFile) => (event: React.ChangeEvent<HTMLInputElement>) => {
            let dummydata: ModalFile = { ...expData, [prop]: event.target.value }
            let fieldState: ErrorFields = { ...errorFileds }
            if (prop == 'date') {
                dummydata.dateno = parseInt(event.target.value.split('-')[2])
                dummydata.month = parseInt(event.target.value.split('-')[1])
                dummydata.year = parseInt(event.target.value.split('-')[0])
                dummydata.monthstr = findmonth(parseInt(event.target.value.split('-')[1]))
            }

            if (prop == 'amount') {
                let amt = parseInt(event.target.value)
                if (amt != 0) {
                    fieldState.amount = false
                    setErrorfields(fieldState)
                }
                dummydata.amount = amt
            }

            if (prop == 'time') {
                let time = event.target.value
                console.log(time, "Time")
                if (time != '') {
                    fieldState.time = false
                    setErrorfields(fieldState)
                }
            }

            if (prop == 'category') {
                let category = event.target.value
                if (category != '') {
                    fieldState.category = false
                    setErrorfields(fieldState)
                }
            }

            if (prop == 'necessity') {
                let necessity = event.target.value
                if (necessity != '') {
                    fieldState.necessity = false
                    setErrorfields(fieldState)
                }
            }

            if (prop == 'currency') {
                let currency = event.target.value
                console.log('value',currency)
                if (currency != '') {
                    fieldState.currency = false
                    setErrorfields(fieldState)
                }
            }

            dummydata.currency = props.GlobalData.currsymbol
            setexpData(dummydata);
        };

    React.useEffect(() => {
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
                            value: Object.keys(element.currencies)[0],
                            label: symbols(element.currencies),
                            name: element.name.common,
                            flag: element.flags.svg
                        })
                    }

                });
                // const filteredArr = currencydata.reduce((acc, current) => {
                //     const x = acc.find((item: { value: any; }) => item.value === current.value);
                //     if (!x) {
                //         return acc.concat([current]);
                //     } else {
                //         return acc;
                //     }
                // }, []);
                console.log(currencydata)
                setCurrSymbols(currencydata)
            })
    }, []
    )
    return (
        <div className='Detail_header'>
            <div className='header'>
                <h3>Todays Expense Details</h3>
            </div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '15ch' },
                }}
                noValidate
                autoComplete="on"
            >
                <div>
                    <form noValidate className='ExpenseSect-form'>
                        <TextField
                            disabled
                            id="outlined-select-currency"
                            error={errorFileds.currency}
                            select
                            label="Select"
                            size="small"
                            helperText="Please select your currency"
                            value={props.GlobalData.currlabel}     //{expData.currency}
                            onChange={handleChange('currency')}
                        >
                            {CurrSymbols.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            required
                            error={errorFileds.amount}
                            id="outlined-number"
                            label="Amount"
                            helperText="Enter Expense"
                            type="number"
                            size="small"
                            value={expData.amount}
                            onChange={handleChange('amount')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            required
                            error={errorFileds.time}
                            id="outlined-basic"
                            select
                            label="Select"
                            size="small"
                            // value={currency}
                            //   onChange={handleChange}
                            helperText="Time of Day"
                            value={expData.time}
                            onChange={handleChange('time')}
                        >
                            {timeofDay.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            required
                            error={errorFileds.category}
                            id="outlined-basic"
                            select
                            label="Select"
                            size="small"
                            helperText="Select Category"
                            value={expData.category}
                            onChange={handleChange('category')}
                        >
                            {Categories.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            required
                            error={errorFileds.necessity}
                            id="outlined-basic"
                            select
                            label="Select"
                            size="small"
                            value={expData.necessity}
                            helperText="Select Necessity"
                            onChange={handleChange('necessity')}
                        >
                            {Necessity.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            required
                            error={errorFileds.date}
                            id="date"
                            label="Enter Date"
                            type="date"
                            // defaultValue= {defDate}
                            value={expData.date}
                            size="small"
                            //   className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChange('date')}
                        />
                        <Button variant="contained" color="primary" size="small" onClick={() => {
                            let error: boolean = validationerror()
                            if (error == false) {
                                props.handleAddExpense(expData)
                                setErrorfields(defaultFieldState)
                            }
                            setexpData(defaultExpData)

                        }}>
                            Add Expense
                        </Button>
                    </form>
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        select
                        label="Select"
                        size="small"
                        value={expData.subcategory}
                        helperText="Select SubCategory"
                        onChange={handleChange('subcategory')}
                    >
                        {Necessity.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        id="outlined-basic"
                        select
                        label="Select"
                        size="small"
                        value={expData.availmode}
                        helperText="Enter PurchaseMode"
                        onChange={handleChange('availmode')}
                    >
                        <MenuItem key='Online' value='Online'>
                            Online
                        </MenuItem>
                        <MenuItem key='Offline' value='Offline'>
                            Offline
                        </MenuItem>
                    </TextField>

                    <TextField
                        id="outlined-basic"
                        multiline
                        rows={1}
                        // select
                        // label="Enter Comments"
                        size="small"
                        // value={expData.necessity}
                        helperText="Enter Comments"
                    // onChange={handleChange('necessity')}
                    >

                    </TextField>
                </div>
            </Box>
        </div>
    );
}

export default DateSection