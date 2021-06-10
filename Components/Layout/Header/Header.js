import React from "react";
import { Navbar, Nav, Container , NavDropdown} from "react-bootstrap";
import Link from "next/link";

const Header = () => {
  return (
    <header className="header">
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link href="/">
            <a>
            <Navbar.Brand>Brand</Navbar.Brand>
            </a>
          </Link>
          <Navbar.Toggle aria-controls="proShop-nav" />
          <Navbar.Collapse id="proShop-nav">
            <Nav className="ml-auto">
              <Link href="/cart">
                <a className="text-muted ">
                  <i className="fas fa-shopping-cart"></i> Cart
                </a>
              </Link>
              
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
