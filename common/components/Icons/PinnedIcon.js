import React from 'react'
import classJoiner from 'common/utils/classJoiner'

const PinnedIcon = ({
  className,
}) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      className={classJoiner(className, 'svgicon', 'svgicon--pinned')}
    >
      <path d="M6 11l-5 5H0v-1.002L5 10 2 7h3l4-4V0l7 7h-3l-4 4v3" />
    </svg>
  )
}

export default PinnedIcon
