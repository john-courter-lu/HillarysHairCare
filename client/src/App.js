import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar color="info" expand="lg">
        <Nav navbar>
          <NavbarBrand href="/">Hillary's Hair Care</NavbarBrand>
          <NavItem>
            <NavLink href="/appointments">Appointments</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      <Outlet />
    </>
  );
}

export default App;
