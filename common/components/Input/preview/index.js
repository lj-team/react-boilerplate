import React from 'react'

import Close from 'common/components/Icons/Close'
import PasswordIcon from 'common/components/Icons/Password'
import SearchIcon from 'common/components/Icons/Search'

import Comp from '../'

const data = [
  { value: 'Very very very very very very very long value', inputClassName: 'customInputClassName' },
  { value: 'onChange and hasError', onChange: val => alert(val), hasError: true }, // eslint-disable-line
  { value: '', placeholder: 'Placeholder' },
  { value: 'Readonly value', readOnly: true },
  { value: 'Disabled value', disabled: true },
  { placeholder: 'Disabled placeholder', disabled: true },
  { value: 'Icon & autoFocus', Icon: Close, autoFocus: true },
  { value: 'password', type: 'password', Icon: PasswordIcon },
  { placeholder: 'font-size: 20px', Icon: SearchIcon, style: { fontSize: 20 } },
  { placeholder: 'Icon, IconEnd, font-size: 12px', Icon: SearchIcon, IconEnd: Close, style: { fontSize: 12 } },
  { placeholder: 'unitText', unitText: 'жет.', hasError: true },
  { placeholder: 'unitText', unitText: 'жет.', disabled: true },
  { placeholder: 'unitText', unitText: 'жет.', Icon: SearchIcon, style: { fontSize: 20 } },
]

export default () => (
  <div
    style={{
      width: 200,
      padding: 20,
    }}
  >
    { data.map((itemData, itemIndex) => (
      <div style={{ marginBottom: 20 }} key={itemIndex}>
        <Comp {...itemData} />
      </div>
      ))}
  </div>
  )
