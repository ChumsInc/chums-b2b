import React from 'react';
import {BrowserRouter} from 'react-router';
import {Provider} from 'react-redux';
import App from "../app/App";
import {hydrateRoot} from "react-dom/client";
import store from '../app/configureStore';

hydrateRoot(document.getElementById('root')!, (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
));
