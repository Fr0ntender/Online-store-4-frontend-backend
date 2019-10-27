import React from 'react'
import { v4 } from 'uuid'

import {
    Container,
    Row,
    Col,
} from '../../styles/greed.style'

import Navbar from '../../components/navbar'
import AdminMenu from '../../composables/admin-menu'
import ProductTable from '../../components/product-table'

const Products = ({ 
    logout,
    history,
    cardData,
    authorized,
    delateData,
    findCardData,
    searchActive,
    reloadCardData
 }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <Navbar 
                        search={true}
                        logout={logout} 
                        authorized={authorized}
                        findCardData={findCardData}
                        reloadCardData={reloadCardData}
                     />
                </Col>
            </Row>
            <Row mt="30">
                <Col set="2">
                    <AdminMenu />
                </Col>
                <Col set="10">
                    <ProductTable
                        kev={v4()}
                        data={cardData}
                        sortState={history.location}
                        searchActive={searchActive}
                        delateData={delateData}/>
                </Col>
            </Row>
        </Container>
    )
}
export default Products