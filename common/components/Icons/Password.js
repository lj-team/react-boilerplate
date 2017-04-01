import React from 'react'
import classJoiner from 'common/utils/classJoiner'

const Password = ({
  className,
}) => {
  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      className={classJoiner(['svgicon', 'svgicon--password', className])}
    >
      <path
        d="M14 14.5714286V7.4285714C14 6.6428571 13.2125 6 12.25 6H1.75C.7875 6 0 6.6428571 0 7.4285714v7.1428572C0 15.3571429.7875 16 1.75 16h10.5c.9625 0 1.75-.6428571 1.75-1.4285714zM9 11c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm3-6c0-2.7922847-2.2077153-5-5-5S2 2.2077153 2 5v1h2V5c0-1.6877153 1.3122847-3 3-3s3 1.3122847 3 3v1h2V5z"
        fillRule="evenodd"
      />
    </svg>
  )
}

export default Password
