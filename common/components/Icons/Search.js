import React from 'react'
import classJoiner from 'common/utils/classJoiner'

const Search = ({
  className,
}) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      className={classJoiner(['svgicon', 'svgicon--search', className])}
    >
      <path d="M15.707 14.293l-3.962-3.967A6.455 6.455 0 0 0 13 6.5 6.5 6.5 0 1 0 6.5 13c1.435 0 2.757-.47 3.832-1.26l3.96 3.967a1 1 0 0 0 1.415-1.414zM2 6.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z" />
    </svg>
  )
}

export default Search
