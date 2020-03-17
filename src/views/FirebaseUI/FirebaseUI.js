/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import {
  Modal,
  Label,
  Button,
  InputGroup,
  Input,
  Card,
  CardBody,
  InputGroupAddon,
  InputGroupText,
  Col,
  Row,
  ModalHeader,
  ModalFooter,
  ModalBody
} from 'reactstrap'

import fireConfig from '../../fireConfig'

/**
 * * Firebase Login
 */
class FirebaseUI extends Component {
  constructor (props) {
    super(props)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePW = this.onChangePW.bind(this)
    this.toggleWarning = this.toggleWarning.bind(this)
  }

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [fireConfig.auth.EmailAuthProvider.PROVIDER_ID],
    callbacks: { signInSuccessWithAuthResult: () => false }
  }

  onChangeEmail (event) { this.setState({ email: event.target.value }) }
  onChangePW (event) { this.setState({ password: event.target.value }) }
  toggleWarning () { this.setState({ warning: !this.state.warning }) }

  state = { isSignedIn: undefined, email: '', password: '', error: '', loading: false, warning: false }

  onSignInPress () {
    this.setState({ error: '', loading: true })
    const { email, password } = this.state
    fireConfig.auth().signInWithEmailAndPassword(email, password)
      .then(() => this.setState({ error: '', loading: false }))
      .catch(() => {
        this.setState({ error: 'Authentication Failed', loading: false })
        this.toggleWarning()
      })
  }

  renderButtonOrLoading () {
    if (this.state.loading) return <Label className='text-center'></Label>
    else return <Button onClick={this.onSignInPress.bind(this)} color="primary" className="px-4">Sign In</Button>
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

  /**
   * @inheritDoc
   */
  render () {
    return (
      < div className="animated fadeIn" >
        <Card>
          <CardBody>
            <h1>Sign In</h1>
            <br></br>
            {this.state.isSignedIn !== undefined && !this.state.isSignedIn &&
              <div>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-user"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type='email'
                    label='Email Address'
                    placeholder='Email'
                    securetextentry='true'
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-lock"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    label='Password'
                    placeholder='Password'
                    securetextentry='true'
                    value={this.state.password}
                    onChange={this.onChangePW}
                    required
                  />
                </InputGroup>
                <Row>
                  <Col xs="6">
                    {this.renderButtonOrLoading()}
                  </Col>
                  <Col xs="6" className="text-right">
                    <Button color="link" className="px-0">Forgot password?</Button>
                  </Col>
                </Row>
                <br></br>
              </div>
            }
            {this.state.isSignedIn &&
              <div className="signedIn">
                Hello {fireConfig.auth().currentUser.displayName}. You are now signed In!
                <a className="button" onClick={() => fireConfig.auth().signOut()}>Sign-out</a>
              </div>
            }
          </CardBody>
        </Card>
        <Modal isOpen={this.state.warning} toggle={this.toggleWarning}
          className={'modal-warning ' + this.props.className}>
          <ModalHeader toggle={this.toggleWarning}>Authentication Failed</ModalHeader>
          <ModalBody style={{ textAlign: 'center' }}>
            Email or Password Invalid!
            <br></br>
            Please try again.
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={this.toggleWarning}>Close</Button>
          </ModalFooter>
        </Modal>
      </div >
    )
  }
}

export default FirebaseUI
