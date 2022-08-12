import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/main'
import Login from './components/login'
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useParams
} from "react-router-dom";

// function App() {
const App: React.FC = () => {

  const [Username, setUsername] = React.useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login Username={Username} setUsername={setUsername} />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


{/* <div className="App">
      <Main></Main> 
       <Login></Login> 
     </div>  */}