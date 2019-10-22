import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { addCardData, chengeCardData } from '../../ducks/productCard'

import AddToCard from './AddToCard'

const mapStateToProps = state => ({
    cardData: state.productCard.cardData,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addCardData,
    chengeCardData
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddToCard)