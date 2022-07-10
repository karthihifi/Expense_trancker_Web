import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import firebase_Expeseapp from "./firebase";
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

interface AddCategoryprops {
    openCurrmodal: boolean,
    CountryDetails: {
        currlabel: string, currsymbol: string, countryname: string,
        flag: string
    }[]
    handleCurrModalclose: () => void
}

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(firebase_Expeseapp);

const AddCurrency: React.FC<AddCategoryprops> = (props) => {

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
                        Add Category
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '15ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="standard-basic" label="Select Country" variant="standard"
                        // onChange={(eve) => { setcategory(eve.target.value) }} 
                        />
                        <TextField id="standard-basic" label="Currency" variant="standard" />
                        <Button variant='contained' onClick={() => {
                            // writeUserData(category); 
                            // setcategory('');
                            // props.handleCatModalclose()
                        }}>Submit</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default AddCurrency