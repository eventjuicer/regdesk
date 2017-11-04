



import React  from 'react';
import { Grid, Row, Col, Navbar, Nav, NavItem, Jumbotron, Button } from 'react-bootstrap';
import SearchBox from './SearchBox';
import NewRegistration from './NewRegistration';




const styles = {


  iframeContainer : {

      marginTop : 60,
      textAlign : "right"
  },


  iframeStyles : {
       marginTop : 10,
      overflow: "hidden",
      height: "500px",
      width: "100%",
      border: "1px solid #cccccc"
  }


};




export default class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {iframeSrc : ""};

    

  }

  handlePrint = () => {

     this.ifr.focus();
     this.ifr.contentWindow.print();
  }



  handleIframe = (target) =>
  {
    this.setState({iframeSrc : target.data.path});
  }


  render() {

    const {iframeSrc} = this.state;
 

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

              
        <div style={styles.iframeContainer}>


               <iframe id="badge"  ref={(f) => this.ifr = f}  title="PDF" src={iframeSrc} style={styles.iframeStyles}></iframe>
          
                        <Button bsSize="large" bsStyle="primary" onClick={this.handlePrint}>Print</Button>

        </div>


        </Col>

         </Row>

        </Grid>

        </Jumbotron>
      </div>
    );
  }
}
