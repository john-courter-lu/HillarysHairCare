import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar color="primary" expand="sm">
        <Nav navbar>
          <NavbarBrand href="/">Hillary's Hair Care</NavbarBrand>
          <NavItem>
            <NavLink href="/appointments">Appointments</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/customers">Customers</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/stylists">Stylists</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      <Outlet />
    </>
  );
}

export default App;
