const projectDebug = __BROWSER__ && window.localStorage.getItem('project-debug')

const cssDebug = projectDebug && /class-names/.test(projectDebug)

export {
  cssDebug,
}
