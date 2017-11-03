



import React, { Component } from 'react';
import { Grid, Row, Col, Navbar, Nav, NavItem, Jumbotron, Button } from 'react-bootstrap';
import SearchBox from './SearchBox';
import NewRegistration from './NewRegistration';




const iframeStyles = {
      marginTop : 60,
      overflow: "hidden",
      height: "305px",
      width: "100%",
      border: "1px solid #cccccc"
};




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
    this.setState({iframeSrc : target.data.path});
  }


  render() {

    

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
        <Col lg={8} md={8} sm={8} xs={8}>

            
            <h2>Already registered</h2>
            
            <SearchBox onBadgeReady={this.handleRegistered} />


            <h2>New registration</h2>
            
            <NewRegistration onBadgeReady={this.handleRegistered} />


        </Col>

        <Col lg={4} md={4} sm={4} xs={4}>

              
               <iframe id="badge" src={this.state.iframeSrc} frameBorder="0" style={iframeStyles} height="100%" width="100%"></iframe>

               <Button bsSize="large" bsStyle="success"  onClick={this.handlePrint}>Print</Button>


        </Col>

         </Row>

        </Grid>

        </Jumbotron>
      </div>
    );
  }
}
