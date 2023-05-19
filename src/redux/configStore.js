import { configureStore } from '@reduxjs/toolkit';

import formReducer from './reducers/formReducer';

export const configStore = configureStore({
    reducer: {
        formReducer
    },
});