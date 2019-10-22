import prefixRequestAction from '../helper/prefixRequestAction';
import {
    getProductBasket,
    setProductToBasket,
    delProductInBasket,
} from '../helper/untils';

export const [
    ADD_TO_BASKET_START,
    ADD_TO_BASKET_SUCCESS,
    ADD_TO_BASKET_FAIL,
] = prefixRequestAction('ADD_TO_BASKET');

export const [
    RELOAD_BASKET_START,
    RELOAD_BASKET_SUCCESS,
    RELOAD_BASKET_FAIL,
] = prefixRequestAction('RELOAD_BASKET');

export const [
    DELATE_BASKET_START,
    DELATE_BASKET_SUCCESS,
    DELATE_BASKET_FAIL,
] = prefixRequestAction('DELATE_BASKET');

const reload = dispath => {
    try {
        dispath({
            type: RELOAD_BASKET_START
        });
        const data = getProductBasket();
        dispath({
            type: RELOAD_BASKET_SUCCESS,
            payload: data,
        });
    }
    catch (err) {
        dispath({
            type: RELOAD_BASKET_SUCCESS,
            payload: err,
        });
    }

};

/*
    Action to add data to the product card
*/
export const addToBasket = id => (dispath, getState) => {
    const cardData = getState().productCard.cardData;
    const data = cardData.filter(({_id}) => _id === id);
    try {
        dispath({
            type: ADD_TO_BASKET_START
        });
        setProductToBasket(data);
        dispath({
            type: ADD_TO_BASKET_SUCCESS
        });
    }
    catch (err) {
        dispath({
            type: ADD_TO_BASKET_SUCCESS,
            payload: err,
        });
    }
};

/*
    Action update products (run in componentWillMount())
*/
export const reloadBasket = () => dispath => reload(dispath);

/*
    Action to delete product data
*/
export const delateInBasket = id => dispath => {
    try {
        dispath({
            type: DELATE_BASKET_START
        });
        delProductInBasket(id);
        dispath({
            type: DELATE_BASKET_SUCCESS
        });
    }
    catch (err) {
        dispath({
            type: DELATE_BASKET_SUCCESS,
            payload: err,
        });
    }
};

export default function (state = {
    fetching: false,
    error: '',
    basketData: []
}, action) {
    switch (action.type) {
        case ADD_TO_BASKET_START:
            return {
                ...state,
                fetching: true
            };
        case ADD_TO_BASKET_SUCCESS:
            return {
                ...state,
                fetching: false
            };
        case ADD_TO_BASKET_FAIL:
            return {
                ...state,
                fetching: false,
                error: action.payload
            };
        case RELOAD_BASKET_START:
            return {
                ...state,
                fetching: true
            };
        case RELOAD_BASKET_SUCCESS:
            return {
                ...state,
                fetching: false,
                basketData: action.payload
            };
        case RELOAD_BASKET_FAIL:
            return {
                ...state,
                fetching: false,
                error: action.payload
            };
        case DELATE_BASKET_START:
            return {
                ...state,
                fetching: true
            };
        case DELATE_BASKET_SUCCESS:
            return {
                ...state,
                fetching: false,
            };
        case DELATE_BASKET_FAIL:
            return {
                ...state,
                fetching: false,
                error: action.payload
            };
        default:
            return state;
    };
};