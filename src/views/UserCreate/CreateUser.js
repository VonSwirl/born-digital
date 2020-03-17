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
  InputGroupText,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody
} from 'reactstrap'
import fireConfig from '../../fireConfig'

class CreateUser extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      name: '',
      authWarning: false,
      createFailed: false,
      createSuccess: false
    }
    this.toggleAuthWarning = this.toggleAuthWarning.bind(this)
    this.toggleCreateFailed = this.toggleCreateFailed.bind(this)
    this.toggleCreateSuccess = this.toggleCreateSuccess.bind(this)
  }

  /** * @inheritDoc */
  componentDidMount () {
    this.unregisterAuthObserver = fireConfig.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user })
    })
  }

  /** * @inheritDoc */
  componentWillUnmount () { this.unregisterAuthObserver() }
  updateInput = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  /** * Displays modal if not authorised to add user */
  toggleAuthWarning () { this.setState({ authWarning: !this.state.authWarning }) }

  /** * Displays modal if create user failed */
  toggleCreateFailed () { this.setState({ createFailed: !this.state.createFailed }) }

  toggleCreateSuccess () { this.setState({ createSuccess: !this.state.createSuccess }) }
  /** * Attempt to create user on submit */
  addUser = e => {
    e.preventDefault()

    fireConfig.auth().onAuthStateChanged(user => {
      if (user) {
        const db = fireConfig.firestore().collection('userList').doc('userListDocs').collection('userListCollection')

        db.add({ name: this.state.name, email: this.state.email })
          .then(() => {
            this.setState({ name: '', email: '' })
            this.toggleCreateSuccess() // Show Success Modal
          })
          .catch(e => {
            this.setState({ name: '', email: '' })
            this.toggleCreateFailed() // Show Fail Modal
          })
      } else {
        this.setState({ name: '', email: '' })
        this.toggleAuthWarning() // Show modal No Auth
      }
    })
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

        <Modal isOpen={this.state.authWarning} toggle={this.toggleAuthWarning}
          className={'modal-warning ' + this.props.className}>
          <ModalHeader toggle={this.toggleAuthWarning}>Authentication Failed!</ModalHeader>
          <ModalBody style={{ textAlign: 'center' }}>
            Access Denied
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={this.toggleAuthWarning}>Close</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.createFailed} toggle={this.toggleCreateFailed}
          className={'modal-warning ' + this.props.className}>
          <ModalHeader toggle={this.toggleCreateFailed}>Oh Dear!</ModalHeader>
          <ModalBody style={{ textAlign: 'center' }}>
            Unable to Create New User!
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={this.toggleCreateFailed}>Close</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.createSuccess} toggle={this.toggleCreateSuccess}
          className={'modal-success ' + this.props.className}>
          <ModalHeader toggle={this.toggleCreateSuccess}>Success!</ModalHeader>
          <ModalBody>
            New User Created
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.toggleCreateSuccess}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
export default CreateUser
