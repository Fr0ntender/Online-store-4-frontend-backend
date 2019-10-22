import React from 'react'
import styled from 'styled-components'


import books from '../../assets/books.svg'
import circel from '../../assets/circel.svg'
import trash from '../../assets/trash.svg'
import signup from '../../assets/signup.svg'
import closeIcon from '../../assets/close.svg'

const icons = {
  'books': books,
  'trash': trash,
  'signup': signup,
  'circel': circel,
  'close': closeIcon,
}

const IconImage = styled.img`
    max-width: 100%;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
`

const Icon = ({name, width, height}) => (
    <IconImage src={icons[name]} alt={name} width={width} height={height}/>
)

export default Icon;