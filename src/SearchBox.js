
import React, { Component } from 'react';

import {Row, Col, Table, ListGroup, ListGroupItem, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import {getJSON} from './helper';


export default class SearchBox extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      search: '',
      suggestions: [],
      participant_id : 0
    };

  }

  onSearchRequest = (event) => {

    const q = event.target.value;

    this.setState({search : q});

    if(q.length < 3)
    {
     // this.unrenderBadge();
      this.unrenderSuggestionsContainer();

      return;
    }

    getJSON("/receptiondesk-retrieve?q=" + q, function(data)
    {
        this.setState({
          suggestions: data.data
        });

    }.bind(this) );

  };

  onBadgeRequest = (suggestion, event) => {

    this.setState({search : `${suggestion.lname}`});

    this.unrenderSuggestionsContainer();

    const {onBadgeReady} = this.props;

    getJSON("/receptiondesk-label?participant_id=" + suggestion.id, onBadgeReady);


  }


  unrenderSuggestionsContainer = () => {

    this.setState({
          suggestions: []
    });

  }


  renderSuggestionsContainer = () => {

    return (

        <ListGroup>

          {
            this.state.suggestions.map((suggestion) => (
                <ListGroupItem key={suggestion.id} onClick={(event) => this.onBadgeRequest(suggestion, event)}>

                  {suggestion.fname }{' '}
                  {suggestion.lname }{' '}
                  <strong>company:</strong>{' '}
                  {suggestion.cname2}{' '}
                  <strong>email:</strong>{' '}
                  {suggestion.email}{' '}
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

    return (

    <Row>

    <FormGroup bsSize="large" controlId="search" validationState={this.validateSearch()}>
      <FormControl onChange={this.onSearchRequest} type="text" value={this.state.search}  placeholder="Enter email, phone or last name"  />
      <FormControl.Feedback />
    </FormGroup>

    {this.state.suggestions.length ? this.renderSuggestionsContainer() : null}



    </Row>



    );
  }
}
