import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import rootReducer from './root.reducer';

const MIDDLEWARES = getDefaultMiddleware();

if (process.env.NODE_ENV === 'development') {
  	MIDDLEWARES.push(logger);
}

export const store = configureStore({
	reducer: rootReducer,
	middleware: MIDDLEWARES,
});
