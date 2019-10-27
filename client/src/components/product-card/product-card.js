import React from 'react';
import PropTypes from 'prop-types';

import {
    Card,
    Button,
    CardContent,
} from '@material-ui/core';

import {
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
} from './product-card.style';

const propTypes = {
    _id: PropTypes.string,
    name: PropTypes.any,
    vote: PropTypes.any,
    year: PropTypes.any,
    price: PropTypes.any,
    rating: PropTypes.any,
    lastName: PropTypes.string,
    firstName: PropTypes.string,
    addToBasket: PropTypes.func,
    classes: PropTypes.objectOf(PropTypes.string),
};

const defaultProps = {
    _id: null,
    name: null,
    vote: null,
    year: null,
    price: null,
    rating: null,
    classes: null,
    lastName: null,
    firstName: null,
    addToBasket: null,
};

const ProductCard = ({
    _id,
    name,
    vote,
    year,
    price,
    rating,
    imgUrl,
    classes,
    lastName,
    firstName,
    addToBasket,
}) => {
    return (
        <Card  className={classes.card}>
            <CardContent>
                <CardImgWrap>
                    <img src={imgUrl} alt={name} width="158" height="250" />
                </CardImgWrap>
                <CardPriceWrap>
                    <CardPrice>{price ? price : ''} ₽</CardPrice>
                </CardPriceWrap>
                <CardDescWrap>
                    <CardDesc>{name}</CardDesc>
                </CardDescWrap>
                <CardStarWrap>
                    <CardStarElemWrap>
                        <CardStarElem rating={rating} />
                    </CardStarElemWrap>
                    <CardStarElemWrapQuont>{vote ? vote : ''}</CardStarElemWrapQuont>
                </CardStarWrap>
                <CardAvtor>
                    <CardAvtorName>{`${firstName} ${lastName}`}</CardAvtorName>
                </CardAvtor>
                <CardAvtor>
                    <CardAvtorName>{year ? year : ''}</CardAvtorName>
                </CardAvtor>
                <Bay>
                    <Button
                        onClick={() => addToBasket(_id)}
                        variant="contained"
                        color="primary"
                    >
                        В корзину
                    </Button>
                </Bay>
            </CardContent>
        </Card>
    );
};

ProductCard.propTypes = propTypes;
ProductCard.defaultProps = defaultProps;

export default ProductCard;