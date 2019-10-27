
import { connect } from 'react-redux'

import PrivateRoute from './private-route'

const mapStateToProps = state => ({
  authorization: state.authorization
})

export default connect(
  mapStateToProps,
)(PrivateRoute)