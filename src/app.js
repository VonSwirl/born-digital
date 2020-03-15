/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { hot } from 'react-hot-loader/root'
import HelloWorld from './components/born-digital'
import alert from './components/alert-test'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return <HelloWorld title="Hello from React webpack"/>
  }
}

export default hot(App)
