import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers';
import { updateEndPoint} from './client/endpoints';



updateEndPoint('https://karmatest.druta.io', 'karmatest.druta.io') 

const initialState = {
    hello :{}
}

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
        thunkMiddleware
));    


ReactDOM.render(
    <div>
        <Provider store={store}>
            <App />
        </Provider>
    </div>, document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

