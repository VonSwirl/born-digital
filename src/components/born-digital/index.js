/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import style from './born-digital.css'

const HelloWorld = ({ title }) => (
  <div className={style['born-digital']}>
    {title}
  </div>
)

HelloWorld.propTypes = {
  title: PropTypes.string
}

export default HelloWorld
