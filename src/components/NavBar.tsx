import * as React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import './main.css'

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
            <Nav.Link href="#link">Weekly Report</Nav.Link>
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
      </Container>
    </Navbar>
  );
};
export default NavBar;
