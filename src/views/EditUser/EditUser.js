import React, { Component } from 'react'
import fireConfig from '../../fireConfig'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Button,
  Form,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody
} from 'reactstrap'

class EditUser extends Component {
  constructor (props) {
    super(props)
    this.ref = fireConfig.firestore().collection('userList').doc('userListDocs').collection('userListCollection')
    this.state = {
      key: '',
      name: '',
      email: '',
      authWarning: false,
      createFailed: false,
      createSuccess: false
    }
    this.toggleAuthWarning = this.toggleAuthWarning.bind(this)
    this.toggleCreateFailed = this.toggleCreateFailed.bind(this)
    this.toggleCreateSuccess = this.toggleCreateSuccess.bind(this)
    this.home = this.home.bind(this)
  }

  componentDidMount () {
    this.unregisterAuthObserver = fireConfig.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user })
    })
    this.ref.doc(this.props.match.params.id).get()
      .then((doc) => {
        if (doc.exists) {
          const board = doc.data()
          this.setState({
            key: doc.id,
            name: board.name,
            email: board.email
          })
        } else {
          console.log('No such document!')
        }
      })
  }

  /** * Displays modal if UNAUTHORISED */
  toggleAuthWarning () { this.setState({ authWarning: !this.state.authWarning }) }

  /** * Displays modal if Edit FAILED */
  toggleCreateFailed () { this.setState({ createFailed: !this.state.createFailed }) }

  /** * Displays modal if Edit SUCCESS */
  toggleCreateSuccess () { this.setState({ createSuccess: !this.state.createSuccess }) }

  home () { this.props.history.push('/') }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState({ board: state })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { name, email } = this.state

    fireConfig.auth().onAuthStateChanged(user => {
      if (user) {
        this.ref.doc(this.state.key).set({ name, email })
          .then(() => {
            this.setState({ key: '', name: '', email: '' })
            this.toggleCreateSuccess() // Show Success Modal
          })
          .catch((error) => {
            this.setState({ key: '', name: '', email: '' })
            this.toggleCreateFailed() // Show Fail Modal
            console.error('Error adding document: ', error)
          })
      } else {
        this.setState({ key: '', name: '', email: '' })
        this.toggleAuthWarning() // Show modal No Auth
      }
    })
  }

  render () {
    return (
      <div>
        {this.state.isSignedIn &&
          <div className="animated fadeIn">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <i className="fa fa-address-card-o"></i> Edit User
                  </CardHeader>
                  <CardBody>
                    <div>
                      <Form onSubmit={this.onSubmit}>
                        <div className="form-group">
                          <label htmlFor="name">Name:</label>
                          <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="Name" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email:</label>
                          <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.onChange} placeholder="Email" />
                        </div>
                        <Button type="submit" className="btn btn-success">Submit</Button>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        }{this.state.isSignedIn !== undefined && !this.state.isSignedIn &&
          <div>
            <br></br>
            <h2 style={{ textAlign: 'center' }}>Access Denied</h2>
          </div>
        }
        <Modal isOpen={this.state.authWarning}
          className={'modal-warning ' + this.props.className}>
          <ModalHeader toggle={this.toggleAuthWarning}>Authentication Failed!</ModalHeader>
          <ModalBody style={{ textAlign: 'center' }}>
            Access Denied
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={this.home}>Close</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.createFailed}
          className={'modal-warning ' + this.props.className}>
          <ModalHeader toggle={this.toggleCreateFailed}>Oh Dear!</ModalHeader>
          <ModalBody style={{ textAlign: 'center' }}>
            Unable to Edit User!
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={this.home}>Close</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.createSuccess}
          className={'modal-success ' + this.props.className}>
          <ModalHeader toggle={this.toggleCreateSuccess}>Success!</ModalHeader>
          <ModalBody>
            User Edited
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.home}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default EditUser
