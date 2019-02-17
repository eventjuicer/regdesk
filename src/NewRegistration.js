
import React  from 'react';

import { Button, Form, Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

import {postJSON, validateEmail} from './helper';




class NewRegistration extends React.Component {

  constructor(props) {

    super(props);

    this.defaults = {form: {fname: "", lname : "", cname2 : "", email : "", phone:"+49", }};

    this.state = this.defaults;
   
    this.errors = 0;
  }

  handleChange = (e) => {

    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.id;

    this.setState({form: {...this.state.form, [name]: value}});

  }


  handleSubmit = (e) => {

    e.preventDefault();

    const {onBadgeReady} = this.props;

    postJSON('/receptiondesk', this.state.form, onBadgeReady);

  }

  handleReset()
  {
    this.setState(this.defaults);
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



  render() {

    const {fname, lname, cname2, email, phone} = this.state.form;


    return (

       <Form horizontal onSubmit={this.handleSubmit}>

        <FormGroup bsSize="large" controlId="fname" validationState={this.validateFname()}>
          <ControlLabel bsClass="col-sm-2 control-label">First name</ControlLabel>
          <div className="col-sm-10">
          <FormControl type="text"  value={fname}  placeholder="Enter text" onChange={this.handleChange} />
          <FormControl.Feedback />
          </div>
        </FormGroup>

        <FormGroup bsSize="large" controlId="lname" validationState={this.validateLname()}>
          <ControlLabel bsClass="col-sm-2 control-label">Last name</ControlLabel>
          <div className="col-sm-10">
          <FormControl type="text" value={lname} placeholder="Enter text" onChange={this.handleChange} />
          <FormControl.Feedback />
          </div>
        </FormGroup>

        <FormGroup bsSize="large" controlId="cname2" validationState={this.validateCname2()}>
          <ControlLabel bsClass="col-sm-2 control-label">Company Name</ControlLabel>
          <div className="col-sm-10">
          <FormControl type="text" value={cname2}   placeholder="Enter text" onChange={this.handleChange} />
          <FormControl.Feedback />
          </div>
        </FormGroup>

        <FormGroup bsSize="large" controlId="email" validationState={this.validateEmail()}>
          <ControlLabel bsClass="col-sm-2 control-label">Email</ControlLabel>
          <div className="col-sm-10">
          <FormControl type="text" value={email} placeholder="Enter text" onChange={this.handleChange} />
          <FormControl.Feedback />
          </div>
        </FormGroup>

        <FormGroup bsSize="large" controlId="phone" validationState={this.validatePhone()}>
          <Col componentClass={ControlLabel} sm={2}>Phone</Col>
          <Col sm={10}>
          <FormControl type="text" value={phone}   placeholder="Enter text" onChange={this.handleChange} />
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
