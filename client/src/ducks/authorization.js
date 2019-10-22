//import jwt from 'jsonwebtoken'
import Auth from '../services/Auth';
import prefixRequestAction from '../helper/prefixRequestAction';


export const [
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
] = prefixRequestAction('LOGIN')

export const [
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
] = prefixRequestAction('LOGOUT')


export const login = () => dispath => {
    dispath({ 
        type: LOGIN_START 
    });
    Auth.login();
}

export const authorization = () => dispath => {
    Auth.handleAuthentication()
        .then(data => {
            dispath({ 
                type: LOGIN_SUCCESS ,
                payload: data
            });
        })
        .catch(err => {
            dispath({ 
                type: LOGIN_FAIL ,
                payload: err
            });
        })
}

export const logout = () => dispath => {
    try {
        dispath({ 
            type: LOGOUT_START
        });
        Auth.logout();
        dispath({ 
            type: LOGOUT_SUCCESS
        });
    }
    catch(err) {
        dispath({ 
            type: LOGOUT_FAIL,
            payload: err
        });
    }
}

export default function (state = {
    accessToken: null,
    authorized: false,
    expiresAt: null,
    idToken: null,
    error: null,
}, action) {
    switch (action.type) {
        case LOGIN_START:
        return {
            ...state,
            fetching: true,
        }
        case LOGIN_SUCCESS:
        return {
            ...state,
            fetching: false,
            authorized: true,
            accessToken: action.payload.accessToken,
            expiresAt: JSON.stringify((action.payload.expiresIn * 1000) + new Date().getTime()),
            idToken: action.payload.idToken,
        }
        case LOGIN_FAIL:
        return {
            ...state,
            fetching: false,
            error: action.payload
        }
        case LOGOUT_START:
        return {
            ...state,
            fetching: true,
        }
        case LOGOUT_SUCCESS:
        return {
            ...state,
            fetching: false,
            authorized: false,
        }
        case LOGOUT_FAIL:
        return {
            ...state,
            fetching: false,
            error: action.payload
        }
        default:
            return state
    }
}