import react, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Button, Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";
const Menu = ()=> { 
    const [isOpen, setIsOpen] = useState(false); 
    const handleToggle = () => setIsOpen(!isOpen);
return(
    <Navbar expand="lg" className="sb-topnav navbar navbar-expand navbar-light bg-clr">
    <Navbar.Brand className="navbar-brand logo-brand" as={Link} to="/">
      AERO PACK POS
    </Navbar.Brand>

    {/* Hamburger Toggle Button */}
    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />

    <Navbar.Collapse id="basic-navbar-nav" in={isOpen}>
      <Nav className="ms-auto">
        <Nav.Link href="http://gambolthemes.net/html-items/gambo_supermarket_demo/index.html">
          <i className="fas fa-external-link-alt"></i> Home
        </Nav.Link>

        {/* User Profile Dropdown */}
        <NavDropdown title={<i className="fas fa-user fa-fw"></i>} id="userDropdown" align="end">
          <NavDropdown.Item as={Link} to="/edit_profile">Edit Profile</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/change_password">Change Password</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item as={Link} to="/login">Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
    

    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />

<Navbar.Collapse id="basic-navbar-nav" in={isOpen}>
<Nav className="ms-auto">
<Nav.Link href="http://gambolthemes.net/html-items/gambo_supermarket_demo/index.html">
<i className="fas fa-bars"></i>
</Nav.Link>

{/* User Profile Dropdown */}
<NavDropdown title={<i className="fas fa-bars"></i>} id="userDropdown" align="end">
  <NavDropdown.Item as={Link} to="/edit_profile">Edit Profile</NavDropdown.Item>
  <NavDropdown.Item as={Link} to="/change_password">Change Password</NavDropdown.Item>
  <NavDropdown.Divider />
  <NavDropdown.Item as={Link} to="/login">Logout</NavDropdown.Item>
</NavDropdown>
</Nav>
</Navbar.Collapse>
  </Navbar>
)
}
export default Menu;