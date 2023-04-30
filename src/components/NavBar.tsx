import * as React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import './main.css'
import { Button } from '@mui/material';

interface NavBarProps {
  handleCliclPageChange: (pageSelect: any) => void;
  setChartSelect: (chart: string) => void;
  profiledata: {
    currlabel: string, currsymbol: string, countryname: string,
    flag: string
  }
}

const NavBar: React.FC<NavBarProps> = (props) => {

  const handlePageChange = (page: string) => {
    props.handleCliclPageChange(page)
  }

  const handleChartChange = (chart: string) => {
    props.setChartSelect(chart)
  }


  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container className='Nav_bar'>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-center" style={{ flex: 1 }} >
            <Navbar.Brand href="#home" onClick={(eve) => {
              handlePageChange('Home')
            }}>Home</Navbar.Brand>
            <Nav.Link href="#link" className='Nav_text'
              onClick={(eve) => {
                handlePageChange('Mon')
              }}>Monthly Report</Nav.Link>
            <Nav.Link href="#link"
              onClick={(eve) => {
                handlePageChange('Daily')
              }}>Cumulative Report</Nav.Link>
            <Nav.Link href="#link" onClick={(eve) => {
              handlePageChange('Week');
            }}>Weekly Report</Nav.Link>
            <Nav.Link href="#link"
              onClick={(eve) => {
                handlePageChange('Year')
              }}>Yearly Report</Nav.Link>
            <NavDropdown title="Chart Type" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={(eve) => {
                handleChartChange('Bar')
              }}>Bar</NavDropdown.Item>
              <NavDropdown.Item onClick={(eve) => {
                handleChartChange('Pie')
              }}>
                Pie
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Avatar {...bindTrigger(popupState)}
                  alt="Karthik Raja" src="https://m.media-amazon.com/images/M/MV5BNWFmNWYwMjUtNjE0OS00NWNhLWJmMzQtYzJhZDg1ZjBmZTgzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg" />
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={popupState.close}>Profile</MenuItem>
                  <MenuItem onClick={popupState.close}>My account</MenuItem>
                  <MenuItem onClick={popupState.close}>Logout</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
