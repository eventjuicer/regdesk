


import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';
import {Row, Col, Table, ListGroup, ListGroupItem, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import {getJSON} from './helper';

/*

onClick={(evt) => this.handleRemove(id, etv)}

*/
const iframeStyles = {

    overflow: "hidden",
    height: "305px",
    width: "100%",
    border: "none"
  }




export default class SearchBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      suggestions: [],
      participant_id : 0,
      iframeSrc : ""
    };

    this.onSearchRequest = this.onSearchRequest.bind(this);

  }

  onSearchRequest = event => {
   
    const q = event.target.value;

    this.setState({search : q});

    if(q.length < 3)
    {
      this.unrenderBadge();
      this.unrenderSuggestionsContainer();

      return;
    }

    getJSON("/receptiondesk-retrieve?q=" + q, function(data)
    {
        this.setState({
          suggestions: data
        });
    }.bind(this) );

  };

  onBadgeRequest = (participant_id, event) => {

    this.unrenderSuggestionsContainer();

    getJSON("/receptiondesk-label?participant_id=" + participant_id, function(data)
    {
        this.setState({
          participant_id : participant_id,
          iframeSrc : data
        });
    }.bind(this) );

    
  }

  unrenderBadge = () => {

      this.setState({
          participant_id : 0,
          iframeSrc : ""
      });
  }

  unrenderSuggestionsContainer = () => {

    this.setState({
          suggestions: []
    });

  }

  handlePrint = () => {

      const badgeFromSearch = document.getElementById("badgeFromSearch");

      badgeFromSearch.focus();

      badgeFromSearch.contentWindow.print();
  }

  renderSuggestionsContainer = () => { 

    return (

        <ListGroup>
          
          {
            this.state.suggestions.map((suggestion) => (
                <ListGroupItem key={suggestion.id} onClick={(event) => this.onBadgeRequest(suggestion.id, event)}>

                  {suggestion.fname }{' '}
                  {suggestion.lname }{' '}
                  <strong>from:</strong>{' '}
                  {suggestion.cname2}{' '}        
                  
                  {suggestion.email}{' '}
                  {suggestion.phone}    


                </ListGroupItem>

            ))
          }
         
        </ListGroup>

    )  

  }

  validateSearch()
  {

    const length = this.state.search.length;

    if(length == 0)
    {
        return;
    }

    if(length > 2)
    {
      return 'success';
    }

    return 'error';

  }


  render() {


   

    let suggestions = null;
    let badge = null;


    if(this.state.suggestions.length)
    {
      suggestions = this.renderSuggestionsContainer();
    }

    if(this.state.iframeSrc)
    {
      badge = <div>

      <iframe id="badgeFromSearch" src={this.state.iframeSrc} frameborder="0" style={iframeStyles} height="100%" width="100%"></iframe>

      <Button bsSize="large" bsStyle="success"  onClick={this.handlePrint}>Print</Button>

      </div>;

    }



    return (
    
    <Row>

    <FormGroup bsSize="large" controlId="search" validationState={this.validateSearch()}>
      <FormControl onChange={this.onSearchRequest} type="text" value={this.state.search}  placeholder="Enter email, phone"  />
      <FormControl.Feedback />
    </FormGroup>

    {suggestions}

    {badge}

    </Row>


  
    );
  }
}


