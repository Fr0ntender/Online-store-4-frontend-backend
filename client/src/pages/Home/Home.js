import React from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

import {
    Box,
    Grid,
    Container,
} from '@material-ui/core';

import {
    HeaderH1,
} from '../../styles/typography.style';

// import {
//     List,
//     ListElem,
//     CardRow,
//     CardWrap
// } from './Home.style'

import {
    CardRow,
    CardWrap
} from './Home.style';

import ProductCard from '../../components/product-card';
import Navbar from '../../components/navbar';

const propTypes = {
    basketData: PropTypes.arrayOf(PropTypes.string, PropTypes.number),
};

const defaultProps = {
    basketData: [],
};

const Home = ({
    login,
    cardData,
    showModal,
    basketData,
    authorized,
    addToBasket,
    findCardData,
    reloadCardData
}) => {
    return (
        <div>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Navbar
                            search={true}
                            login={login}
                            showModal={showModal}
                            authorized={authorized}
                            findCardData={findCardData}
                            reloadCardData={reloadCardData}
                            basketLength={basketData.length}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        {/* <aside>
                            <List>
                                <ListElem>Художественная литература</ListElem>
                                <ListElem>Бизнес-литература</ListElem>
                                <ListElem>Нехудожественная литература</ListElem>
                            </List>
                        </aside> */}
                    </Grid>
                    <Grid item xs={10}>
                        <HeaderH1 mt="0" mb="20">Книги</HeaderH1>
                        <Box
                            display="flex"
                            flexWrap="wrap"
                            m={-1}
                        >
                            {cardData.map(item =>
                                <Box 
                                    key={v4()}
                                    width="25%"
                                    display="flex"
                                    p={1}
                                >
                                    <ProductCard
                                        key={v4()}
                                        _id={item._id}
                                        name={item.name}
                                        vote={item.vote}
                                        year={item.year}
                                        price={item.price}
                                        rating={item.rating}
                                        imgUrl={item.imgUrl}
                                        firstName={item.firstName}
                                        lastName={item.lastName}
                                        addToBasket={addToBasket}
                                    />
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;