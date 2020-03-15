/* eslint-disable no-unused-vars */
import React from 'react'
import { mount } from 'enzyme'

import App from '../src/app'
import HelloWorld from '../src/components/born-digital'

describe('<App />', () => {
  const wrap = mount(<App />)

  it('renders', () => {
    expect(wrap.find(App).exists()).toBe(true)
  })

  it('contains HelloWorld component', () => {
    expect(wrap.find(HelloWorld).exists()).toBe(true)
  })
})
