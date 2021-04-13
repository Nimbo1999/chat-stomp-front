import {createGlobalStyle} from 'styled-components';
import AntdCSS from 'antd/dist/antd.min.css';

const GlobalStyles = createGlobalStyle`
    ${AntdCSS}

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
        width: 100%;
        height: 100%;
    }

    body {
        background: ${({theme}) => theme.pallet.background};
    }
`;

export default GlobalStyles;
