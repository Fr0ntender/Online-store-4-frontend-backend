export const setSession = authResult => {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('idToken', authResult.idToken);
    localStorage.setItem('expiresAt', expiresAt);
}

export const removeSesion = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('idToken')
    localStorage.removeItem('expiresAt')
}

export const isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem('expiresAt'));
    return new Date().getTime() < expiresAt;
}

export const getSession = () => ({
    authorized: true,
    idToken: localStorage.getItem('idToken'),
    expiresAt: localStorage.getItem('expiresAt'),
    accessToken: localStorage.getItem('accessToken')
})

export const setProductToBasket = data => {
    const carentData = JSON.parse(localStorage.getItem('product_in_basket'));
    if (carentData) {
        const checkData = carentData.find(({_id}) => _id === data[0]._id);
        if (!checkData) {
            const newData = [].concat(carentData, data);
            localStorage.setItem('product_in_basket', JSON.stringify(newData));
        }        
    } else {
        localStorage.setItem('product_in_basket', JSON.stringify(data));
    }
}

export const getProductBasket = () => {
    return JSON.parse(localStorage.getItem('product_in_basket'));
}

export const delProductInBasket = id => {
    const buffer = JSON.parse(localStorage.getItem('product_in_basket'));
    localStorage.removeItem('product_in_basket');
    const result = buffer.filter(({ _id }) => _id !== id );
    localStorage.setItem('product_in_basket', JSON.stringify(result))
}