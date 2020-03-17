import React, { Component } from 'react'
import fireConfig from '../../fireConfig'
import { Link } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Button,
  Table,
  CardFooter
} from 'reactstrap'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.ref = fireConfig.firestore().collection('userList').doc('userListDocs').collection('userListCollection')
    this.unsubscribe = null
    this.goToLogin = this.goToLogin.bind(this)
    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      boards: []
    }
  }

  /**
   * @inheritDoc
   */
  componentDidMount () {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
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

  goToLogin () { this.props.history.push('/sign-in') }

  onCollectionUpdate = (querySnapshot) => {
    const boards = []
    querySnapshot.forEach((doc) => {
      const { name, email } = doc.data()
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        email
      })
    })
    this.setState({ boards })
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render () {
    return (
      <div>
        {this.state.isSignedIn &&
          <div className="animated fadeIn">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <i className="fa fa-users"></i> All Users
                  </CardHeader>
                  <CardBody>
                    <Table hover bordered striped responsive size="sm">
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'center' }}>Action</th>
                          <th>Name</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.boards.map(board =>
                          <tr>
                            <td style={{ textAlign: 'center' }}><Link to={`/show-user/${board.key}`}>View</Link></td>
                            <td>{board.name}</td>
                            <td>{board.email}</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        }{this.state.isSignedIn !== undefined && !this.state.isSignedIn &&
          <div>
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    Welcome
                  </CardHeader>
                  <CardBody>
                    <p style={{ textAlign: 'center' }}>Please Sign In to continue</p>
                    <div style={{ textAlign: 'center' }}>
                      <Button style={{ width: '175px' }} color="success" onClick={this.goToLogin}>Sign In</Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        }
      </div>
    )
  }
}

export default Dashboard
