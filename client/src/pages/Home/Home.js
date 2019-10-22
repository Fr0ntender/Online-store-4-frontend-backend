import React from 'react';
import { v4 } from 'uuid';

import {
    Box,
    Grid,
    Container,
} from '@material-ui/core'

import {
    HeaderH1,
} from '../../styles/typography.style'

// import {
//     List,
//     ListElem,
//     CardRow,
//     CardWrap
// } from './Home.style'

import {
    CardRow,
    CardWrap
} from './Home.style'

import Card from '../../components/Card'
import Navbar from '../../components/Navbar'

const Home = ({
    login,
    cardData,
    showModal,
    basketData = [],
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
                            
                        >
                            {cardData.map(v =>
                                <Box 
                                    key={v4()}
                                    width="25%"
                                    display="flex"
                                >
                                    <Card
                                        key={v4()}
                                        id={v._id}
                                        Img={v.productImg}
                                        Name={v.productName}
                                        Vote={v.productVote}
                                        Year={v.productYear}
                                        Autor={v.productAutor}
                                        Price={v.productPrice}
                                        Rating={v.productRating}
                                        addToBasket={addToBasket}
                                        LastName={v.productLastName}
                                        FirstName={v.productFirstName}
                                    />
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
export default Home