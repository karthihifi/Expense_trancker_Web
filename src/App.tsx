import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/main'
import Login from './components/login'

// function App() {
  const App : React.FC = () =>{
  return (
    <div className="App">
      {/* <Main></Main> */}
      <Login></Login>
    </div>
  );
}

export default App;
