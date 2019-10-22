import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, withProps, lifecycle } from 'recompose'
import { withRouter } from 'react-router-dom'

import { triggerModal } from '../../ducks/modals'
import {
  authorizeResetUi,
  authorize
} from '../../ducks/authorization'

import Authorize from './Authorize'

const mapStateToProps = state => ({
  authorization: state.authorization,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  triggerModal,
  authorize,
}, dispatch)

export const props = ({
  authorization,
  triggerModal,
  authorize,
}) => ({
  authorization,
  authorize: ({ username, password, remember }) => e => {
    e.preventDefault()
    authorize({
      username: username.current.value,
      password: password.current.value,
      remember: remember.current.checked,
    })
  },
  triggerModal
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withProps(props),
  withRouter,
  lifecycle({
    UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.authorization.authorized) {
        this.props.history.replace("/admin/products");
      }
    }
  })
)(Authorize)