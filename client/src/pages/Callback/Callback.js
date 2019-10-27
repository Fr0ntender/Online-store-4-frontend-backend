import React from 'react'
import Icon from '../../components/icon'
import Navbar from '../../components/navbar'

import {
    Container,
    Row,
    Col,
} from '../../styles/greed.style'

import {
    CallbackWrapper
} from './Callback.style'

const Callback = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Navbar
                        desc={false}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <CallbackWrapper>
                        <Icon name="circel" width="50" height="50" />
                    </CallbackWrapper>
                </Col>
            </Row>
        </Container>
    )
}

export default Callback
