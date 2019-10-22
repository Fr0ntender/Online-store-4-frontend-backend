import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withProps, lifecycle } from 'recompose';
import { withRouter } from 'react-router-dom';

import { logout } from '../../ducks/authorization';
import { reloadCardData, findCardData } from '../../ducks/productCard';

import AddProduct from './AddProduct';

const mapStateToProps = state => ({
    authorized: state.authorization.authorized,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    logout,
    findCardData,
    reloadCardData,
}, dispatch);

const props = ({
    match,
    logout,
    authorized,
    findCardData,
    reloadCardData,
}) => ({
    match,
    logout,
    authorized,
    reloadCardData,
    findCardData: async name => {
        await findCardData(name);
    }
});

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    withProps(props),
    withRouter,
    lifecycle({
        componentDidMount() {
            this.props.reloadCardData();
        }
    })
)(AddProduct);