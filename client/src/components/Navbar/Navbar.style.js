import styled from 'styled-components'
import { 
    color,
    fontsize,
    fontfamily,
} from '../../styles/var.style'
import searchPath from '../../assets/search.svg'

export const Nav = styled.nav`
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
        text-decoration: none;
        color: ${color.default};
    }
`
const types = ({types}) => {
    if (types === 'left') {
        return `
            max-width: 85%;
            flex: 0 0 85%;
            justify-content: flex-start;
        `
    } else {
        return `
            max-width: 15%;
            flex: 0 0 15%;
            justify-content: flex-end;
        `
    }
}
export const NavElem = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${props => types(props)};
`
export const Logos = styled.div`
    display: flex;
    align-items: center;
`
export const Basket = styled.div`
    position: relative;
    &::after {
        content: "${props => props.basketLength}";
        position: absolute;
        top: -4px;
        right: -4px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: ${color.accent};
        transition: 0.2ms ease-in;
        font-size: 11px;
        font-family: ${fontfamily.default};
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 1;
    }
`

export const LogosIcon = styled.img`
    margin-right: 7px;
`
export const LogosDesc = styled.span`
    color: ${color.primary};
    font-size: ${fontsize.header.h2.md};
    font-weight: 600;
    letter-spacing: normal;
    font-family: ${fontfamily.default};

`
export const Search = styled.div`
    height: 40px;
    box-sizing: border-box;
    flex: 1;
    align-items: stretch;
    justify-content: flex-start;
    border: 2px solid #005bff;
    border-right-width: 0;
    border-radius: 4px 0 0 4px;
`
export const SearchInput = styled.input`
    height: 100%;
    width: 100%;
    flex: 1;
    box-sizing: border-box;
    margin: 0;
    padding: 0 0 0 8px;
    border: 1px solid transparent;
    font-size: 14px;
    font-family: Calibri, Arial,sans-serif;
    color: #001a34;
    line-height: 18px;
    outline: none;
    vertical-align: middle;
    border-radius: 2px 0 0 2px;
    text-overflow: ellipsis;
    box-shadow: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
`
export const SearchButtonWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 76px;
    
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
    background-color: ${color.primary};
    padding: 0;
    margin-right: 24px;
    &:hover {
        background-color: ${color.primaryHover};
    }
`
export const SearchButtonWrapContent = styled.button`
    cursor: pointer;
    outline: none;
    border: none;
    height: 40px;
    padding: 0 15px;
    background-color: transparent;
    &::before {
        content: "";
        display: inline-block;
        vertical-align: middle;
        width: 24px;
        height: 24px;
        background-image: url(${searchPath});
        background-color: transparent;
        background-repeat: no-repeat;
    }
`
export const Icons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3px 10px;
    cursor: pointer;
    
    ${props => {
        if (props.types === "Login") {
            return `
                &:hover {
                    color: ${color.primary};
                }
                svg {
                    margin-left: -9px;
                }
                &:hover svg path {
                    stroke: ${color.primary};
                }
            `
        } else if (props.types === "Logoff") {
            return `
                &:hover {
                    color: ${color.accent2};
                }
                svg {
                    margin-right: -6px;
                }
                &:hover svg path {
                    stroke: ${color.accent2};
                }
            `
        } else if (props.types === "book") {
            return `
                width: 100px;
                &:hover {
                    color: ${color.primary};
                }
                &:hover svg path {
                    fill: ${color.primary};
                }
            `
        }
    }}
    
`
export const IconText = styled.span`
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    font-family: Calibri, Arial,sans-serif;
`