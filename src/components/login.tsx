import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './main.css'
import Stack from '@mui/material/Stack';
// import Button from 'react-bootstrap/Button';
import SendIcon from "@mui/icons-material/Send";
import Form from 'react-bootstrap/Form';
import { createTheme } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.css";
// import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";

interface LoginProps {
    Username: string
    setUsername: (userName: string) => void;
}

const auth = getAuth();
const theme = createTheme({
    palette: {
        primary: {
            light: "#fb771a",
            main: "#fb771a",
            dark: "#fb771a",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ff7961",
            main: "#f44336",
            dark: "#ba000d",
            contrastText: "#000",
        },
    },
});
// import Main from './components/main'

// function App() {
const Login: React.FC<LoginProps> = (props) => {

    const navigate = useNavigate();

    const [password, setPassword] = React.useState("");

    return (
        <div className="SignInPage_container">
            <div className="SignInPage-sideimg">
                <img
                    className="SignInPage-img"
                    src="https://previews.123rf.com/images/pratyaksa/pratyaksa1509/pratyaksa150900070/45001920-business-analytics-concept-illustration-.jpg"
                ></img>
                {/* https://previews.123rf.com/images/zinetron/zinetron1904/zinetron190400027/132229358-infographic-dashboard-template-with-flat-design-graphs-and-pie-charts-online-statistics-and-data-ana.jpg */}
            </div>
            <div className="SignInpage-formcontent">
                <div className="SignInpage-box">
                    <div className="SignInpage-header">
                        <h3>Login to BookMark Repository</h3>
                    </div>
                    <div className="SignInpage-content">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    onChange={(e) => props.setUsername(e.target.value)}
                                />
                                <Form.Text className="text-muted">
                                    Enter Email Address.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group>
                        </Form>
                        <div className="SignInPage-btnwrp">
                            <div>
                                New User? <a href="#">Register</a> here
                            </div>
                            <Button  //theme={theme}
                                className="SignInPage-btn"
                                variant="contained"
                                color="primary"
                                endIcon={<SendIcon />}
                                onClick={() => {
                                    console.log(props.Username, password);
                                    // const user1 = auth.currentUser;
                                    // console.log(user1)
                                    // auth.signOut();
                                    signInWithEmailAndPassword(auth, props.Username, password)
                                        .then((userCredential) => {
                                            // Signed in
                                            const user = userCredential.user;
                                            // ...
                                            // sessionStorage.setItem(
                                            //   "Auth Token",
                                            //   userCredential?._tokenResponse.refreshToken
                                            // );
                                            navigate("/main");
                                            console.log(userCredential);
                                            // console.log(auth);
                                            // auth.signOut();
                                        })
                                        .catch((error) => {
                                            const errorCode = error.code;
                                            const errorMessage = error.message;
                                            console.log(errorCode)
                                        });
                                }}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Login;
