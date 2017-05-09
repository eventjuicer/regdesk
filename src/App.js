



import React, { Component } from 'react';
import { Grid, Row, Col, Navbar, Nav, NavItem, Jumbotron, Button } from 'react-bootstrap';
import SearchBox from './SearchBox';
import NewRegistration from './NewRegistration';


export default class App extends Component {

  constructor(props) {

    super(props);

    this.state = {iframeSrc : ""};

    this.handleRegistered = this.handleRegistered.bind(this);
    this.handlePrint = this.handlePrint.bind(this);

  }




  handlePrint()
  {
      const badge = document.getElementById("badge");

      badge.focus();

      badge.contentWindow.print();
  }


  handleRegistered(target)
  {

    this.setState({iframeSrc : target.path});


  }


  render() {

    const styles = {

      overflow: "hidden",
      height: "305px",
      width: "100%",
      border: "none"
    }

    return (
      <div>


        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">eventjuicer.com</a>
              </Navbar.Brand>

              <Nav>
              <NavItem eventKey={1} href="#"></NavItem>
              </Nav>

              <Navbar.Toggle />
            </Navbar.Header>
          </Grid>
        </Navbar>


        <Jumbotron>
          <Grid>


            <Row>
              <h2>Retrieve registration</h2>
              <SearchBox/>
            </Row>

            <Row>


              <h2>New registration</h2>

              <Col xs={8} md={8}>
               <NewRegistration onReady={this.handleRegistered} />
               </Col>

               <Col xs={4} md={4}>

               <iframe id="badge" src={this.state.iframeSrc} frameBorder="0" style={styles} height="100%" width="100%"></iframe>

               <Button bsSize="large" bsStyle="success"  onClick={this.handlePrint}>Print</Button>

               </Col>

            </Row>



          </Grid>
        </Jumbotron>
      </div>
    );
  }
}
