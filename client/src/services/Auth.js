import auth0 from 'auth0-js';

import {
    setSession,
    removeSesion,
} from '../helper/untils';

const {
    REACT_APP_AUTH_DOMAIN,
    REACT_APP_AUTH_CLIENT_ID,
    REACT_APP_AUTH_CALLBACK_URL
} = process.env

class Auth {
    auth0 = new auth0.WebAuth({
        domain: REACT_APP_AUTH_DOMAIN,
        clientID: REACT_APP_AUTH_CLIENT_ID,
        audience: 'https://app1-frost0x.eu.auth0.com/api/v2/',
        redirectUri: REACT_APP_AUTH_CALLBACK_URL,
        scope: 'openid email update:password',
        responseType: 'token id_token'
    });

    constructor() {
        window.auth0 = this.auth0;
    }

    login = () => {
        this.auth0.authorize();
    }

    handleAuthentication = () => {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    setSession(authResult);
                    return resolve(authResult);
                } else if (err) {
                    return reject(err);
                }
            });
        });
    }
    
    logout = () => {
        this.auth0.logout({
            returnTo: window.location.origin,
        });
        removeSesion();
    }
};

export default new Auth();