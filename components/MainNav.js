import { Container, Nav, Navbar, Form, Button, NavDropdown } from "react-bootstrap";
import Link from 'next/link';
import {useRouter} from 'next/router';
import { useState } from 'react';
import { useAtom } from 'jotai'
import { searchHistoryAtom } from '../store.js';

export default function MainNav(){

  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

  const router = useRouter();

  function submitForm(e){
      e.preventDefault();
      setIsExpanded(false)

     if (searchField != "") {
         setSearchHistory(current => [...current, searchField]);
      router.push(`/artwork?title=true&q=${searchField}`);
      setSearchField("");
    }
  }

    function toggleExpand() {
       setIsExpanded(!isExpanded)
    }

    function closeExpand() {
        setIsExpanded(false)
    }

  return (
    <>
     <Navbar expand="lg" className="fixed-top navbar-dark bg-primary" expanded={isExpanded}>
      <Container>
        <Navbar.Brand>Tsz Kit Lo</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleExpand} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
                          <Link href="/" passHref ><Nav.Link onClick={closeExpand}>Home</Nav.Link></Link>
                          <Link href="/search" passHref ><Nav.Link active={router.pathname === "/search"} onClick={closeExpand}>Advanced Search</Nav.Link></Link>
          </Nav>
          <Form className="d-flex" onSubmit={submitForm}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchField} onChange={(e) => setSearchField(e.target.value)}
            />
            <Button type="submit" variant="success">Search</Button>
          </Form>
                      <Nav>
                          <NavDropdown title="Tsz Kit Lo" id="basic-nav-dropdown">
                              <Link onClick={closeExpand} href="/favourites" passHref><NavDropdown.Item >Favourites</NavDropdown.Item></Link>
                              <Link onClick={closeExpand} href="/history" passHref active={router.pathname === "/history"} ><NavDropdown.Item >Search History</NavDropdown.Item></Link>
                          </NavDropdown>
                      </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br /><br /><br />
    </>
  );
}