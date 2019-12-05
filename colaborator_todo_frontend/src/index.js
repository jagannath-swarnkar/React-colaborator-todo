import React from 'react';
// import logo from './logo.svg';

import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './reducers';

const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>, 
    document.getElementById('root')
);

serviceWorker.unregister();
