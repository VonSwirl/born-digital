/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import {
  CardFooter,
  Input,
  Card,
  CardBody,
  CardHeader,
  Button,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap'
import fireConfig from '../../fireConfig'

class CreateUser extends Component {
  constructor () {
    super()
    this.state = { email: '', name: '' }
  }

  /**
   * @inheritDoc
   */
  componentDidMount () {
    this.unregisterAuthObserver = fireConfig.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user })
    })
  }

  /**
   * @inheritDoc
   */
  componentWillUnmount () { this.unregisterAuthObserver() }
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

  render () {
    return (
      <div>
        {this.state.isSignedIn &&
      < div className="animated fadeIn" >
        <Form className="form-horizontal" onSubmit={this.addUser}>
          <Card>
            <CardHeader>
              <strong><h4>Create New User</h4></strong>
            </CardHeader>
            <CardBody>

              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="icon-user-follow"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter New Users Name"
                  value={this.state.name}
                  onChange={this.updateInput}
                  required
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="icon-envelope"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter New Users Email"
                  autoComplete="email"
                  value={this.state.email}
                  onChange={this.updateInput}
                  required
                />
              </InputGroup>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
              <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
            </CardFooter>
          </Card>
        </Form>
      </div >
        }{this.state.isSignedIn !== undefined && !this.state.isSignedIn &&
          <div>
            <br></br>
            <h2 style={{ textAlign: 'center' }}>Access Denied</h2>
          </div>
        }
      </div>)
  }
}
export default CreateUser
