import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, withProps, lifecycle } from 'recompose'
import { withRouter } from 'react-router-dom'

import Callback from './Callback'

import { authorization } from '../../ducks/authorization'

const mapStateToProps = state => ({
    authorized: state.authorization.authorized
})

const mapDispatchToProps = dispatch => bindActionCreators({
    authorization,
}, dispatch)

export const props = ({
    authorization,
}) => ({
    authorization,
})

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    withProps(props),
    withRouter,
    lifecycle({
        componentDidMount() {
            const { authorization } = this.props;
            authorization()
        },
        UNSAFE_componentWillReceiveProps(nextProps) {
            const { history } = this.props
            if (nextProps.authorized) {
                history.replace("/admin/products");
            }
        }
    })
)(Callback)