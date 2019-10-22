import styled from 'styled-components'


export const CallbackWrapper = styled.div`
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        animation: rotate 0.9s linear infinite;
    }
    @keyframes rotate {
        from {
            transform: rotate(360deg);
        }
    }
`