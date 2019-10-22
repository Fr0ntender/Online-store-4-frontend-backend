import React from 'react'

import {
    Box,
    Grid,
    Card,
    Paper,
    CardContent,
    Container,
} from '@material-ui/core'

import {
    BayButton1
} from '../../styles/button.style'

import {
    CardWrap,
    CardImgWrap,
    CardPriceWrap,
    CardPrice,
    CardDescWrap,
    CardDesc,
    CardStarWrap,
    CardStarElemWrap,
    CardStarElem,
    CardStarElemWrapQuont,
    CardAvtor,
    CardAvtorName,
    Bay
} from './Card.style'

const ProductCard = ({
    id,
    Img,
    Name,
    Vote,
    Year,
    addToBasket,
    Price,
    Rating,
    LastName,
    FirstName,
    classes,
}) => {
    return (
        <Card  className={classes.card}>
            <CardContent>
                <CardImgWrap>
                    <img src={Img.fileUrl} alt={Name} width="158" height="250" />
                </CardImgWrap>
                <CardPriceWrap>
                    <CardPrice>{Price} ₽</CardPrice>
                </CardPriceWrap>
                <CardDescWrap>
                    <CardDesc>{Name}</CardDesc>
                </CardDescWrap>
                <CardStarWrap>
                    <CardStarElemWrap>
                        <CardStarElem rating={Rating} />
                    </CardStarElemWrap>
                    <CardStarElemWrapQuont>{Vote}</CardStarElemWrapQuont>
                </CardStarWrap>
                <CardAvtor>
                    <CardAvtorName>{`${FirstName} ${LastName}`}</CardAvtorName>
                </CardAvtor>
                <CardAvtor>
                    <CardAvtorName>{Year}</CardAvtorName>
                </CardAvtor>
                <Bay>
                    <BayButton1 onClick={() => addToBasket(id)}>В корзину</BayButton1>
                </Bay>
            </CardContent>
        </Card>
    )
}

export default ProductCard