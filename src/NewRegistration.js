
import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';
import { Button, Form, Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

import {postJSON, validateEmail} from './helper';




class NewRegistration extends React.Component {

  constructor(props) {

    super(props);

    this.defaults = {form: {fname: "", lname : "", cname2 : "", email : "", phone:"+48", }};

    this.state = this.defaults;

    // This binding is necessary to make `this` work in the callback

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.errors = 0;
  }

  handleChange(e) {

    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.id;

    this.setState({form: {...this.state.form, [name]: value}});

  }


  handleSubmit = (e) => {

    e.preventDefault();

   // this.state.form.map((elem) => {});

    let callback = this.props.onReady || function(){};

    postJSON('/receptiondesk', this.state.form, callback);

  }



  validateFname()
  {

    const length = this.state.form.fname.length;

    if(length === 0)
    {
        return;
    }

    if (length > 3) return 'success';
    else return 'error';

  }

  validateLname()
  {
    const length = this.state.form.lname.length;

    if(length === 0)
    {
        return;
    }

    if (length > 3) return 'success';
    else return 'error';
  }

  validateCname2()
  {
    const length = this.state.form.cname2.length;

    if(length === 0)
    {
        return;
    }

    if (length > 3) return 'success';
    else return 'error';

  }

  validateEmail()
  {
    const length = this.state.form.email.length;

    if(length === 0)
    {
        return;
    }

    if(validateEmail(this.state.form.email))
    {
      return 'success';
    }

    return 'error';

  }

  validatePhone()
  {
    const length = this.state.form.phone.length;

    if(length === 0 || length === 3)
    {
        return;
    }

    if (length > 8) return 'success';
    else return 'error';

  }

  handleReset()
  {
    this.setState(this.defaults);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {




    return (

       <Form horizontal onSubmit={this.handleSubmit}>

        <FormGroup bsSize="large" controlId="fname" validationState={this.validateFname()}>
          <ControlLabel bsClass="col-sm-2 control-label">First name</ControlLabel>
          <div className="col-sm-10">
          <FormControl type="text"  value={this.state.form.fname}  placeholder="Enter text" onChange={this.handleChange} />
          <FormControl.Feedback />
          </div>
        </FormGroup>

        <FormGroup bsSize="large" controlId="lname" validationState={this.validateLname()}>
          <ControlLabel bsClass="col-sm-2 control-label">Last name</ControlLabel>
          <div className="col-sm-10">
          <FormControl type="text" value={this.state.form.lname} placeholder="Enter text" onChange={this.handleChange} />
          <FormControl.Feedback />
          </div>
        </FormGroup>

        <FormGroup bsSize="large" controlId="cname2" validationState={this.validateCname2()}>
          <ControlLabel bsClass="col-sm-2 control-label">Company Name</ControlLabel>
          <div className="col-sm-10">
          <FormControl type="text" value={this.state.form.cname2}   placeholder="Enter text" onChange={this.handleChange} />
          <FormControl.Feedback />
          </div>
        </FormGroup>

        <FormGroup bsSize="large" controlId="email" validationState={this.validateEmail()}>
          <ControlLabel bsClass="col-sm-2 control-label">Email</ControlLabel>
          <div className="col-sm-10">
          <FormControl type="text" value={this.state.form.email} placeholder="Enter text" onChange={this.handleChange} />
          <FormControl.Feedback />
          </div>
        </FormGroup>

        <FormGroup bsSize="large" controlId="phone" validationState={this.validatePhone()}>
          <Col componentClass={ControlLabel} sm={2}>Phone</Col>
          <Col sm={10}>
          <FormControl type="text" value={this.state.form.phone}   placeholder="Enter text" onChange={this.handleChange} />
          <FormControl.Feedback />
          <HelpBlock>international prefix required</HelpBlock>
          </Col>
        </FormGroup>

        <Row>
        <Col smOffset={2} sm={10}>

         <Button type="submit" bsStyle="primary" bsSize="large">Register</Button>

         <Button onClick={this.handleReset} type="reset" bsStyle="default" bsSize="large">Reset</Button>

         </Col>
         </Row>

      </Form>
    );
  }
}









export default NewRegistration;
