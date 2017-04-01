export const getPageState = state => state.page

export const getAppSize = state => {
  const { width, height } = getPageState(state)
  return { width, height }
}
