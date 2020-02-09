
import React from 'react';

import {Row, Col, ListGroup, ListGroupItem, FormGroup, FormControl } from 'react-bootstrap';
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
                <ListGroupItem key={suggestion.id} onClick={(event) => this.onBadgeRequest(suggestion, event)}>{
                  `${suggestion.vip ? '###VIP### ':''} ${suggestion.fname} COMPANY: ${suggestion.cname2} PHONE: ${suggestion.phone}`
                }</ListGroupItem>

            ))
          }

        </ListGroup>

    )

  }

  validateSearch()
  {

    const length = this.state.search.length;

    if(length === 0)
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

    const {search} = this.state;

    return (

    <Row>

     <Col lg={12} md={12} sm={12} xs={12}>

    <FormGroup bsSize="large" controlId="search" validationState={this.validateSearch()}>
      <FormControl onChange={this.onSearchRequest} type="text" value={search}  placeholder="Enter email, phone or last name"  />
      <FormControl.Feedback />
    </FormGroup>

    {this.state.suggestions.length ? this.renderSuggestionsContainer() : null}



    </Col>
    </Row>



    );
  }
}
