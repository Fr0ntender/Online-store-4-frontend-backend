import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';

import {
    Box,
} from '@material-ui/core';

import {
    Row,
    Col,
} from '../../styles/greed.style'

import {
    HeaderH1,
    Desc1,
} from '../../styles/typography.style'

import {
    FileInput,
    FileLabel,
    FileLabelDesc
} from '../../styles/forms.style'

import {
    BayButton1
} from '../../styles/button.style'

import {
    CustomRow
} from './add-to-card.style'

import ProductCardInput from '../../components/product-card-input';
import ProductCard from '../../components/product-card';
import FileloadSrc from '../../assets/fileload.svg';
import validate from '../../helper/validate';
import DEF_DATA from './DefaultData.json';
import INPUT_NAMES from './input_name';

const propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    addCardData: PropTypes.func.isRequired,
    chengeCardData: PropTypes.func.isRequired,
    cardData: PropTypes.arrayOf(PropTypes.any),
};

const defaultProps = {
    cardData: [],
};

class AddToCard extends Component {
    state = DEF_DATA;

    ImgUrlOnChange = e => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                imgName: file.name,
                imgUrl: reader.result
            })
        }
        reader.readAsDataURL(file);
    }

    reload = Data => {
        const data = Data.filter(({ _id }) => String(_id) === this.id);
        if (data.length > 0) {
            this.setState({
                num: data[0].num,
                isbn: data[0].isbn,
                name: data[0].name,
                vote: data[0].vote,
                year: data[0].year,
                price: data[0].price,
                rating: data[0].rating,
                imgUrl: data[0].imgUrl,
                imgName: data[0].imgName,
                lastName: data[0].lastName,
                firstName: data[0].firstName,
            });
        }
    };

    componentDidMount() {
        const { cardData, match } = this.props;
        this.id = match.params.id ? match.params.id : false
        if (this.id && cardData && cardData.length > 0) {
            this.reload(cardData);
        }
    };

    UNSAFE_componentWillUpdate(nextProps) {
        const { cardData } = this.props;
        if (this.id && nextProps.cardData.length > 0 && cardData.length === 0) {
            this.reload(nextProps.cardData);
        }
    };

    handleChange = e => {
        e.preventDefault();
        const name = e.target.name;
        let value = validate(name, e.target.value);
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            id: this.id,
            num: Number(this.state.num),
            isbn: this.state.isbn,
            name: this.state.name,
            vote: Number(this.state.vote),
            year: Number(this.state.year),
            price: Number(this.state.price),
            rating: Number(this.state.rating),
            imgUrl: this.state.imgUrl,
            imgName: this.state.imgName,
            lastName: this.state.lastName,
            firstName: this.state.firstName
        }

        const validateId = () => {
            if (this.id) {
                this.props.chengeCardData(data)
            } else {
                this.props.addCardData(data)
                this.setState(DEF_DATA)
            }
        }
        // const validateIsbn = () => {
        //     validator.isISBN(this.state.isbn, 13) ?
        //         validateId()
        //         :
        //         this.setState({
        //             firstRequired: true,
        //             isbnValid: false
        //         })
        // }
        const validateLastName = () => {
            this.state.lastName.length > 0 ?
                validateId()
                :
                this.setState({
                    firstRequired: true,
                    lastRequired: false
                })
        }
        const validateFirstName = () => {
            this.state.firstName.length > 0 ?
                validateLastName()
                :
                this.setState({
                    yearValid: true,
                    firstRequired: false,
                })
        }
        const validateYear = () => {
            this.state.year > 1800 ?
                validateFirstName()
                :
                this.setState({
                    nameRequired: true,
                    yearValid: false
                })
        }
        this.state.name.length > 0 ?
            validateYear()
            :
            this.setState({
                nameRequired: false
            })
    }

    render() {
        const { match } = this.props;
        const {
            name,
            vote,
            year,
            price,
            rating,
            imgUrl,
            imgName,
            lastName,
            firstName,
            isbnValid,
            yearValid,
            nameRequired,
            lastRequired,
            firstRequired,
        } = this.state;
        return (
            <form>
                <CustomRow>
                    <Col set="9">
                        <Row>
                            <Col>
                                <HeaderH1 mt="0" mb="20">{match.url !== '/admin/addnewproduct' ? 'Редактировать товар' : 'Добавить новый товар'}</HeaderH1>
                            </Col>
                        </Row>
                        <Row mb="10">
                            <Col set="4" flex js="flex-start" al="center">
                                <Desc1 mt="0" mb="0">Изображение товара</Desc1>
                            </Col>
                            <Col set="8" flex js="flex-start" al="center">
                                <FileInput id="FileImg" type="file" name="image" onChange={this.ImgUrlOnChange} />
                                <FileLabel htmlFor="FileImg">
                                    <ReactSVG src={FileloadSrc} />
                                    <FileLabelDesc ml="10"> {imgName !== '' ? imgName : 'Выбрать изображение'}</FileLabelDesc>
                                </FileLabel>
                            </Col>
                        </Row>
                        {
                            INPUT_NAMES.map((item, index) =>
                                <ProductCardInput
                                    key={index}
                                    name={item.name}
                                    label={item.label}
                                    value={this.state[item.label]}
                                    handleChange={this.handleChange}
                                    isbnValid={isbnValid}
                                    yearValid={yearValid}
                                    nameRequired={nameRequired}
                                    lastRequired={lastRequired}
                                    firstRequired={firstRequired}
                                />
                            )
                        }
                        <Row mt="40" mb="10">
                            <Col flex js="flex-start" al="center">
                                <BayButton1 onClick={this.handleSubmit}>
                                    Сохранить
                                </BayButton1>
                            </Col>
                        </Row>
                    </Col>
                    <Col set="3">
                        <HeaderH1 mt="0" mb="20">Превью</HeaderH1>
                        <Box
                            width="100%"
                            display="flex"
                            p={1}
                        >
                            <ProductCard
                                name={name}
                                vote={vote}
                                year={year}
                                price={price}
                                rating={rating}
                                imgUrl={imgUrl}
                                lastName={lastName}
                                firstName={firstName}
                            />
                        </Box>
                    </Col>
                </CustomRow>
            </form>
        );
    };
};

AddToCard.propTypes = propTypes;
AddToCard.defaultProps = defaultProps;

export default AddToCard;