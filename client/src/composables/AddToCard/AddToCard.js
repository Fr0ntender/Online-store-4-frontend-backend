import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactSVG from 'react-svg'
//import validator from 'validator'

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
    CardWrap,
    CustomRow
} from './AddToCard.style'


import Card from '../../components/Card'
import AddToCardInput from '../../components/AddToCardInput'

import FileloadSrc from '../../assets/fileload.svg'
import INPUT_NAMES from './input_name'
import DEF_DATA from './DefaultData.json'

import validate from '../../helper/validate'

export default class AddToCard extends Component {
    state = DEF_DATA
    static propTypes = {
        chengeCardData: PropTypes.func.isRequired,
        addCardData: PropTypes.func.isRequired,
        cardData: PropTypes.array.isRequired,
    }
    ImgUrlOnChange = e => {
        e.preventDefault()
        let reader = new FileReader()
        let file = e.target.files[0]
        reader.onloadend = () => {
            this.setState({
                img: {
                    file: {
                        name: file.name
                    },
                    fileUrl: reader.result
                }
            })
        }
        reader.readAsDataURL(file)
    }
    reload = Data => {
        if (!Data) {
            console.log('Data is not loading')
        }
        if (this.props.match.url !== '/admin/addnewproduct') {
            const data = Data.filter(({ _id }) => String(_id) === this.props.match.params.id)
            if (data.length > 0) {
                const {
                    productId,
                    productImg,
                    productName,
                    productVote,
                    productIsbn,
                    productYear,
                    productPrice,
                    productRating,
                    productLastName,
                    productFirstName,
                } = data[0]
                this.setState({
                    id: productId,
                    isbn: productIsbn,
                    name: productName,
                    vote: productVote,
                    year: productYear,
                    price: productPrice,
                    rating: productRating,
                    lastName: productLastName,
                    firstName: productFirstName,
                    img: {
                        file: {
                            name: productImg.file.name
                        },
                        fileUrl: productImg.fileUrl
                    },
                })
            }
        }
    }
    UNSAFE_componentWillMount() {
        if (this.props.cardData.length > 0) {
            this.reload(this.props.cardData)
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.cardData.length > 0 && this.props.cardData.length === 0) {
            this.reload(nextProps.cardData)
        }
    }
    handleChange = e => {
        e.preventDefault()
        const name = e.target.name
        let value = validate(name, e.target.value)
        this.setState({ [name]: value })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            productId: this.state.id,
            productImg: this.state.img,
            productIsbn: this.state.isbn,
            productName: this.state.name,
            productVote: this.state.vote,
            productYear: this.state.year,
            productPrice: this.state.price,
            productRating: this.state.rating,
            productLastName: this.state.lastName,
            productFirstName: this.state.firstName
        }
        //if (validator.isISBN(this.state.isbn, 13)) {
            if (this.state.name.length > 0) {
                if (this.state.year > 1800) {
                    if (this.state.firstName.length > 0) {
                        if (this.state.lastName.length > 0) {
                            if (this.props.match.url === '/admin/addnewproduct') {
                                this.props.addCardData(data)
                            } else {
                                this.props.chengeCardData(this.props.match.params.id, data)
                            }
                            this.setState(DEF_DATA)
                        } else {
                            this.setState({
                                yearValid: true,
                                isbnValid: true,
                                nameRequired: true,
                                lastRequired: false,
                                firstRequired: true,
                            })
                        }
                    } else {
                        this.setState({
                            yearValid: true,
                            isbnValid: true,
                            nameRequired: true,
                            firstRequired: false,
                        })
                    }
                } else {
                    this.setState({
                        yearValid: false,
                        isbnValid: true,
                        nameRequired: true
                    })
                }
            } else {
                this.setState({
                    isbnValid: true,
                    nameRequired: false
                })
            }
        // } else {
        //     this.setState({
        //         isbnValid: false
        //     })
        // }
    }
    render() {
        return (
            <form>
                <CustomRow>
                    <Col set="9">
                        <Row>
                            <Col>
                                <HeaderH1 mt="0" mb="20">{this.props.match.url !== '/admin/addnewproduct' ? 'Редактировать товар' : 'Добавить новый товар'}</HeaderH1>
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
                                    <FileLabelDesc ml="10"> {this.state.img.file.name !== '' ? this.state.img.file.name : 'Выбрать изображение'}</FileLabelDesc>
                                </FileLabel>
                            </Col>
                        </Row>
                        {
                            INPUT_NAMES.map((v, i) =>
                                <AddToCardInput
                                    key={i}
                                    name={v.name}
                                    label={v.label}
                                    value={this.state[v.label]}
                                    handleChange={this.handleChange}
                                    isbnValid={this.state.isbnValid}
                                    yearValid={this.state.yearValid}
                                    nameRequired={this.state.nameRequired}
                                    lastRequired={this.state.lastRequired}
                                    firstRequired={this.state.firstRequired}
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
                        <CardWrap>
                            <Card
                                productImg={this.state.img}
                                productName={this.state.name}
                                productVote={this.state.vote}
                                productYear={this.state.year}
                                productAutor={this.state.autor}
                                productPrice={this.state.price}
                                productRating={this.state.rating}
                                productLastName={this.state.lastName}
                                productFirstName={this.state.firstName}
                            />
                        </CardWrap>
                    </Col>
                </CustomRow>
            </form>
        )
    }
}