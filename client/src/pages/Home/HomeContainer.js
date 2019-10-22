import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    compose, 
    withProps,
    lifecycle,
} from 'recompose';
import { withRouter } from 'react-router-dom';

import { triggerModal } from '../../ducks/modals';
import { login } from '../../ducks/authorization';
import {
    addCardData,
    reloadCardData,
    findCardData,
} from '../../ducks/productCard';
import {
    addToBasket,
    reloadBasket,
} from '../../ducks/basket';

import Home from './Home';

const mapStateToProps = state => ({
    basketData: state.basket.basketData,
    cardData: state.productCard.cardData,
    authorized: state.authorization.authorized,
    modals: state.modals.find(({ name }) => name === 'adminIsOpen').state,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    reloadCardData,
    reloadBasket,
    triggerModal,
    findCardData,
    addCardData,
    addToBasket,
    login,
}, dispatch);

export const props = ({
    login,
    modals,
    cardData,
    basketData,
    authorized,
    addToBasket,
    addCardData,
    reloadBasket,
    findCardData,
    triggerModal,
    reloadCardData,
  }) => ({
    login,
    modals,
    cardData,
    basketData,
    authorized,
    addToBasket,
    addCardData,
    findCardData,
    reloadBasket,
    reloadCardData,
    showModal: () => {
        triggerModal({
            name: 'adminIsOpen',
            state: true
        })
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
            const {
                reloadBasket,
                reloadCardData,
            } = this.props;
            reloadCardData();
            reloadBasket();
        },
    }),
)(Home);