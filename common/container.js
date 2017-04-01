import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from 'common/actions'
import { getAppSize } from 'common/selectors'
import App from 'common/components/App'

const defaults = {
}

const mapStateToProps = state => ({
  ...defaults,
  data: {
    ...getAppSize(state),
  },
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
