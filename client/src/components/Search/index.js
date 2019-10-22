import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
    Wrap,
    Search,
    SearchInput,
    CancellButton,
    SearchButtonWrap,
    SearchButtonWrapContent,
} from './Search.style'

import Cancell from '../../assets/cancell.svg'

export default class SearchClass extends Component {
    state = {
        name: ''
    }
    static propTypes = {
        findCardData: PropTypes.func.isRequired,
    }
    handleChange = e => {
        this.setState({ name: e.target.value })
    }
    handeleSubmit = (e) => {
        e.preventDefault()
        const { name } = this.state,
            { findCardData } = this.props
        findCardData({ name })
    }
    cleanup = () => {
        this.setState({ name: '' })
        this.props.reloadCardData()
    }
    render() {
        const { name } = this.state
        return (
            <Wrap>
                <Search>
                    <SearchInput
                        name="name"
                        placeholder="Поиск..."
                        onChange={this.handleChange}
                        value={name} />
                    {name.length > 0 && <CancellButton src={Cancell} onClick={this.cleanup} />}
                </Search>
                <SearchButtonWrap onClick={this.handeleSubmit}>
                    <SearchButtonWrapContent></SearchButtonWrapContent>
                </SearchButtonWrap>
            </Wrap>
        )
    }
}