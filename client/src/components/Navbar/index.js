import React from 'react';
import ReactSVG from 'react-svg';
import { Link } from 'react-router-dom';

import Search from '../../components/Search';
import LoginSrc from '../../assets/login.svg';
import ExitSrc from '../../assets/exit.svg';
import Logo from '../../assets/logo.svg';
import BooksSrc from '../../assets/books.svg';
import TrashSrc from '../../assets/trash.svg';

import {
    Nav,
    Logos,
    Icons,
    Basket,
    NavElem,
    LogosIcon,
    IconText,
    LogosDesc
} from './Navbar.style';

const Navbar = ({
    login,
    search,
    logout,
    showModal,
    authorized,
    basketLength,
    findCardData,
    reloadCardData
}) => {
    return (
        <Nav>
            <NavElem types="left">
            <Link to="/">
                <Logos>
                    <LogosIcon src={Logo} alt="logotype" />
                    <LogosDesc>React</LogosDesc>
                </Logos>
            </Link>
            { search && <Search 
                findCardData={findCardData}
                reloadCardData={reloadCardData}/> }
            </NavElem>
            <NavElem types="right">
            <Link to="/description">
                <Icons types="book">
                    <ReactSVG src={BooksSrc} />
                    <IconText>О проекте</IconText>
                </Icons>
            </Link>
            {
                authorized
                    ?
                    (
                        !logout
                            ?
                            <Link to="/admin/products">
                                <Icons types="Login" >
                                    <ReactSVG src={LoginSrc}/>
                                    <IconText>Войти</IconText>
                                </Icons>
                            </Link>
                            :
                            <Icons onClick={logout} types="Logoff">
                                <ReactSVG src={ExitSrc} />
                                <IconText>Выйти</IconText>
                            </Icons>
                    )
                    :
                    <Icons onClick={login} types="Login" >
                        <ReactSVG src={LoginSrc} />
                        <IconText>Войти</IconText>
                    </Icons>
            }
            
            <Icons>
                <Basket basketLength={basketLength}>
                    <ReactSVG src={TrashSrc} />
                </Basket>
                <IconText>Корзина</IconText>
            </Icons>
            </NavElem>
        </Nav>
    )
}

export default Navbar