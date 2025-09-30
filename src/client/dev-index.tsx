import React from 'react';
import {BrowserRouter} from 'react-router';
import {Provider} from 'react-redux';
import App from "../app/App";
import {createRoot} from "react-dom/client";
import store from '../app/configureStore';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)
