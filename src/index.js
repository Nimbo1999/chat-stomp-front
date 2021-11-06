import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';

import { store, persistor } from './redux/store';
import NetworkConnectionProvider from './context/NetworkConnectionContext';
import theme from './layout/theme';
import GlobalStyles from './layout/globalStyles';
import * as serviceWorker from './serviceWorker';

const loading = <div>Loading...</div>;

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <GlobalStyles />

        <NetworkConnectionProvider>
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={loading}>
                    <BrowserRouter>
                        <Suspense fallback={loading}>
                            <App />
                        </Suspense>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </NetworkConnectionProvider>
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
