import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withProps, lifecycle } from 'recompose';
import { withRouter } from 'react-router-dom';

import { logout } from '../../ducks/authorization';
import {
    reloadCardData,
    delateCardData,
    findCardData,
    sortCardData
} from '../../ducks/productCard';

import Products from './Products';

const mapStateToProps = state => ({
    cardData: state.productCard.cardData,
    authorized: state.authorization.authorized,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    logout,
    findCardData,
    sortCardData,
    reloadCardData,
    delateCardData,
}, dispatch)

const props = ({
    logout,
    history,
    cardData = null,
    authorized,
    findCardData,
    sortCardData,
    reloadCardData,
    delateCardData,
}) => ({
    logout,
    history,
    cardData,
    authorized,
    sortCardData,
    reloadCardData,
    findCardData: name => {
        findCardData(name);
    },
    delateData: id => {
        delateCardData(id);
    },
    searchActive: name => {
        let sortName = '';
        let nameToggl = '';
        let stateName = '';
        const { location } = history;

        if (name === 'Name') {
            if (location.search && location.state) {
                sortName = location.search.replace('?sortName=', '');
                nameToggl = sortName === 'ascending' ? 'descending' : 'ascending';
                stateName = sortName === 'ascending' ? false : true
            } else if (location.search) {
                sortName = location.search.replace('?sortName=', '');
                nameToggl = sortName === 'ascending' ? 'ascending' : 'descending';
                stateName = nameToggl === 'ascending' ? true : false
            } else {
                nameToggl = 'ascending';
                stateName = true;
            }
        } else {
            if (location.search && location.state) {
                sortName = location.search.replace('?sortYear=', '');
                nameToggl = sortName === 'ascending' ? 'descending' : 'ascending';
                stateName = sortName === 'ascending' ? false : true
            } else if (location.search) {
                sortName = location.search.replace('?sortYear=', '');
                nameToggl = sortName === 'ascending' ? 'ascending' : 'descending';
                stateName = nameToggl === 'ascending' ? true : false
            } else {
                nameToggl = 'ascending';
                stateName = true;
            }
        }
        history.push({
            pathname: '/admin/products/',
            search: `?sort${name}=${nameToggl}`,
            type: name,
            state: {
                sort: stateName
            }
        })
        sortCardData(stateName, name);
    }
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
            const { location } = this.props.history
            if (location.search) {
                const sortName = location.search.replace('?sort', '').replace('=descending', '').replace('=ascending', '');
                if (sortName === 'Name') {
                    this.props.searchActive('Name');
                } else {
                    this.props.searchActive('Year');
                }
            } else {
                this.props.reloadCardData();
            }
        },
    })
)(Products)