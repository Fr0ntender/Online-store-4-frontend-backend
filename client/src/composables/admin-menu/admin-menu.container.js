import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { addCardData } from '../../ducks/productCard'

import AdminMenu from './admin-menu'

const mapStateToProps = state => ({
    productCard: state.productCard,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addCardData
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AdminMenu)