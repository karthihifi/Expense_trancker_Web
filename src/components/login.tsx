import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './main.css'
import Stack from '@mui/material/Stack';
// import Main from './components/main'

// function App() {
const Login: React.FC = () => {
    return (
        <div className="Login">
            <div className="Login_form">
            <Stack spacing={2} direction="column">
                <TextField
                size='medium'
                    required
                    id="outlined-required"
                    label="User Name"
                />
                <TextField
                    type="password"
                    required
                    id="outlined-required"
                    label="Password"
                />
                <Button variant="contained">Login</Button>
                </Stack>
            </div>
            <div className="Login_img">
                {/* <img src="https://wallpaper.dog/large/826954.jpg" alt="" /> */}
            </div>
        </div>
    );
}

export default Login;
