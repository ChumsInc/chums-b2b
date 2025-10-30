import {BrowserRouter} from 'react-router';
import {Provider} from 'react-redux';
import store from '../app/configureStore';
import App from "../app/App";
import {hydrateRoot} from "react-dom/client";

hydrateRoot(document.getElementById('root')!, (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
));
