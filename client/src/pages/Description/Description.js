import React from 'react'

import {
    Container,
    Row,
    Col,
} from '../../styles/greed.style'

import {
    HeaderH1,
    Desc1,
    Desc2,
} from '../../styles/typography.style'

import Navbar from '../../components/Navbar'

const Description = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Navbar
                        desc={true}/>
                </Col>
            </Row>
            <Row mt="40">
                <Col>
                    <HeaderH1>
                        Описание:
                    </HeaderH1>
                    <Desc1>
                        Это 2 версия демонстрационного приложения, которое представляет собой небольшую часть функционала интернет-магазина с упрощенной панелью управления администратора, в которую можно войти, используя "test" в качестве логина и пароля. От 1 версии отличается тем, что данные сохраняются в MongoDB.
                    </Desc1>
                    <Desc2 mt="40">
                        В разработке использовал:
                    </Desc2>
                    <Desc1>
                        Для клиента: React / Redux / Thunk / Styled Components.
                    </Desc1>
                    <Desc1>
                        Для сервера: Node / Express / Mongoose.
                    </Desc1>
                    <Desc1>
                        База данных: MongoDB.
                    </Desc1>
                    <Desc1>
                        Приложение развёрнуто на: AWS ES2 - Ubunu.18.04 при помощи Docker и Nginx.
                    </Desc1>
                </Col>
            </Row>
        </Container>
    )
}

export default Description
