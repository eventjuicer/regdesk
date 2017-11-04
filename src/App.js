



import React  from 'react';
import { Grid, Row, Col, Navbar, Nav, NavItem, Jumbotron } from 'react-bootstrap';
import SearchBox from './SearchBox';
import NewRegistration from './NewRegistration';




const iframeStyles = {
      marginTop : 60,
      overflow: "hidden",
      height: "500px",
      width: "100%",
      border: "1px solid #cccccc"
};




export default class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {iframeSrc : ""};

    

  }



  handleIframe = (target) =>
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

            
            <h2>Already registered? Find a badge!</h2>
            
            <SearchBox onBadgeReady={this.handleIframe}/>


            <h2>New registration? Fill in visitor's data...</h2>
            
            <NewRegistration onBadgeReady={this.handleIframe} />


        </Col>

        <Col lg={4} md={4} sm={4} xs={4}>

              
               <iframe id="badge" title="PDF" src={this.state.iframeSrc} style={iframeStyles}></iframe>



        </Col>

         </Row>

        </Grid>

        </Jumbotron>
      </div>
    );
  }
}
