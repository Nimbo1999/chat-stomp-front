import {createGlobalStyle} from 'styled-components';

const GlobalStyles = createGlobalStyle`
    html {
        font-size: 14px;

        @media screen and (min-width: ${({theme}) => theme.breakPoints.md}) {
            font-size: 15px;
        }

        @media screen and (min-width: ${({theme}) => theme.breakPoints.lg}) {
            font-size: 16px;
        }
    }

    html, #root, body {
        margin: 0;
    }
`;

export default GlobalStyles;
