import React from 'react'

const debug = require('debug')('frontend:common:component:NotFound')

const NotFound = () => {
  debug('render')
  return (
    <div>
      <style>{`
        .not-found {
          font: 100 100px sans-serif;
          color: #00A2D8;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 60px;
          left: 0;
          right: 0;
        }
      `}</style>
      <div className="not-found">
        404
      </div>
    </div>
  )
}

export default NotFound
