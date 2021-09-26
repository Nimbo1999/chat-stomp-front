import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App from './App';

import { store } from './redux/store';
import theme from './layout/theme';
import GlobalStyles from './layout/globalStyles';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <GlobalStyles />

        <Provider store={store}>
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <App />
                </Suspense>
            </BrowserRouter>
        </Provider>
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
