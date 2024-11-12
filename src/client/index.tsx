import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from "../app/App";
import {createRoot} from "react-dom/client";
import store from '../app/configureStore';
import {HelmetProvider} from "react-helmet-async";

const container = document?.getElementById('app');
if (container) {
    const root = createRoot(container);

    root.render(
        <React.Fragment>
            <Provider store={store}>
                <HelmetProvider>
                    <BrowserRouter future={{
                        v7_relativeSplatPath: true,
                        v7_startTransition: true
                    }}>
                        <App/>
                    </BrowserRouter>
                </HelmetProvider>
            </Provider>
        </React.Fragment>
    )
}
