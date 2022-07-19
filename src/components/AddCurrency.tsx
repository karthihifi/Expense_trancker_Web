import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import firebase_Expeseapp from "./firebase";
import MenuItem from '@mui/material/MenuItem';
import { getDatabase, ref, set, push, get, child, query, limitToLast } from "firebase/database";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface Glabaldata {
    username: string,
    currlabel: string, currsymbol: string, countryname: string,
    flag: string

}

interface AddCurrencyprops {
    openCurrmodal: boolean,
    CountryDetails: {
        currlabel: string, currsymbol: string, countryname: string,
        flag: string
    }[]
    handleCurrModalclose: () => void,
    globalCurrencydata: Glabaldata,
    handlecountryselect: (country: string) => void,
    handlecurrencysave: () => void
}

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(firebase_Expeseapp);

const AddCurrency: React.FC<AddCurrencyprops> = (props) => {

    const [currDetail, setcurrDetail] = React.useState<{ name: string, value: string }>()
    const writeUserData = (Cat: string) => {
        if (Cat == '' || Cat == null || Cat == undefined) {
            return
        }
        const postListRef = ref(database, 'ExpenseCategories');
        const newPostRef = push(postListRef);
        set(newPostRef, Cat);
    }
    return (
        <div>
            <Modal
                open={props.openCurrmodal}
                onClose={props.handleCurrModalclose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Set Currency
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '15ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="standard-basic" label="Select Country" variant="standard" select
                            onChange={(eve) => { props.handlecountryselect(eve.target.value) }}
                        >
                            {props.CountryDetails.map((item) => (
                                <MenuItem key={item.countryname} value={item.countryname}>
                                    {item.countryname}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField disabled id="standard-basic" label="Currency" variant="standard"
                            value={props.globalCurrencydata.currsymbol} />
                        <Button variant='contained' onClick={
                            props.handlecurrencysave
                            // writeUserData(category); 
                            // setcategory('');
                            // props.handleCatModalclose()
                        }>Save</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default AddCurrency