import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import fireConfig from '../../fireConfig'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button
} from 'reactstrap'

class ShowUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      board: { },
      key: '',
      authWarning: false,
      createFailed: false,
      createSuccess: false
    }
    this.ref = fireConfig.firestore().collection('userList').doc('userListDocs').collection('userListCollection')
    this.home = this.home.bind(this)
    this.delete = this.delete.bind(this)
    this.toggleAuthWarning = this.toggleAuthWarning.bind(this)
    this.toggleFailedModal = this.toggleFailedModal.bind(this)
    this.toggleSuccessModal = this.toggleSuccessModal.bind(this)
  }

  componentDidMount () {
    this.unregisterAuthObserver = fireConfig.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user })
    })
    const ref = fireConfig.firestore().collection('userList').doc('userListDocs').collection('userListCollection').doc(this.props.match.params.id)
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        })
      } else {
        console.log('No such document!')
      }
    })
  }

  home () { this.props.history.push('/') }

  /** * Displays modal if UNAUTHORISED */
  toggleAuthWarning () { this.setState({ authWarning: !this.state.authWarning }) }

  /** * Displays modal if Delete FAILED */
  toggleFailedModal () { this.setState({ createFailed: !this.state.createFailed }) }

  /** * Displays modal if Delete SUCCESS */
  toggleSuccessModal () { this.setState({ createSuccess: !this.state.createSuccess }) }

  delete () {
    this.setState({ key: this.state.key })

    fireConfig.auth().onAuthStateChanged(user => {
      if (user) {
        this.ref.doc(this.state.key).delete()
          .then(() => {
            this.toggleSuccessModal()
          }).catch((e) => {
            console.error(e)
            this.toggleFailedModal()
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
                    <i className="fa fa-address-card-o"></i> User Details
                  </CardHeader>
                  <CardBody>
                    <dl>
                      <dt>Name:</dt>
                      <dd>{this.state.board.name}</dd>
                      <dt>Email:</dt>
                      <dd>{this.state.board.email}</dd>
                    </dl>
                    <Link to={`/edit-user/${this.state.key}`} className="btn btn-success">Edit</Link>&nbsp;
                    <button onClick={this.delete} className="btn btn-danger">Delete</button>
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
          <ModalHeader toggle={this.toggleFailedModal}>Oh Dear!</ModalHeader>
          <ModalBody style={{ textAlign: 'center' }}>
            Unable to Delete User!
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={this.home}>Close</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.createSuccess}
          className={'modal-success ' + this.props.className}>
          <ModalHeader toggle={this.toggleSuccessModal}>Success!</ModalHeader>
          <ModalBody>
            User Deleted
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.home}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default ShowUser
