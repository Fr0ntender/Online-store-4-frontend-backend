import React from 'react'

import {
    Container,
    Row,
    Col,
} from '../../styles/greed.style'

import Navbar from '../../components/Navbar'
import AddToCard from '../../composables/AddToCard'
import AdminMenu from '../../composables/AdminMenu'

const AddProduct = ({
    match,
    logout,
    authorized,
    findCardData
}) => {
    return (
        <Container>
            <Row>
                <Col>
                    <Navbar 
                        search={false}
                        logout={logout} 
                        authorized={authorized}
                        findCardData={findCardData}
                    />
                </Col>
            </Row>
            <Row mt="30">
                <Col set="2">
                    <AdminMenu />
                </Col>
                <Col set="10">
                    <AddToCard match={match}/>
                </Col>
            </Row>
        </Container>
    )
}
export default AddProduct