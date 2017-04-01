/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { mount } from 'enzyme'

import Input from './'

it('Input changes do action', () => { // eslint-disable-line
  const onChange = jest.fn()

  const wrapper = mount(<Input value="value" onChange={onChange} />)

  wrapper.find('input').simulate('change', { target: { value: 'new' } })
  expect(onChange.mock.calls).toEqual([['new']]) // eslint-disable-line
})
