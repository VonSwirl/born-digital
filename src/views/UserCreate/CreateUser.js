/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import {
  CardFooter,
  Input,
  Card,
  CardBody,
  CardHeader,
  Label,
  FormText,
  Button,
  Form,
  FormGroup,
  Col
} from 'reactstrap'
import fireConfig from "../../fireConfig"

class CreateUser extends Component {
  constructor() {
    super()
    this.state = { email: '', name: '' }
  }

  updateInput = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  addUser = e => {
    e.preventDefault()
    const db = fireConfig.firestore()

    db.collection('userList').add({
      name: this.state.name,
      email: this.state.email
    })

    this.setState({ name: '', email: '' })
  }

  render() {
    return (
      < div className="animated fadeIn" >
        <Form action="" className="form-horizontal" onSubmit={this.addUser}>
          <Card>
            <CardHeader>
              <strong>Create New User</strong>
            </CardHeader>
            <CardBody>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="name">Name</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="name" name="name" placeholder="Enter Name..." value={this.state.name} onChange={this.updateInput} required/>
                  <FormText className="help-block">Please enter your name</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="email">Email</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="email" id="email" name="email" placeholder="Enter Email..." autoComplete="email" value={this.state.email} onChange={this.updateInput} required/>
                  <FormText className="help-block">Please enter your email</FormText>
                </Col>
              </FormGroup>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
              <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
            </CardFooter>
          </Card>
        </Form>
      </div >)
  }
}
export default CreateUser
