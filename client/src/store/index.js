import {
    compose,
    createStore,
    combineReducers,
    applyMiddleware,
} from "redux";
import thunk from "redux-thunk";

import modalsReducer from '../ducks/modals';
import basketReducer from '../ducks/basket';
import productCardReducer from '../ducks/productCard';
import authorizationReducer from '../ducks/authorization';

import {
    getSession,
    isAuthenticated,
} from '../helper/untils';

const composeEnhancers = typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const middleware = applyMiddleware(thunk);

const rootReducer = combineReducers({
    modals: modalsReducer,
    basket: basketReducer,
    authorization: authorizationReducer,
    productCard: productCardReducer

})

const getInitialState = () => {
    if (isAuthenticated()) {
        return { authorization: getSession() };
    }
    return {}
}

export default createStore(rootReducer, getInitialState(), composeEnhancers(
    middleware,
))