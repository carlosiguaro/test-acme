import axios from 'axios';

const authUser = (credentials) => {
    return axios.post('https://webhooks.multifiber.cl/api/v1/auth/obtain_token/', {...credentials})
};

const registerSession = (token) => {
    localStorage.setItem('token', token);
    return true;
};

const verifySession = () => {
    let session = localStorage.getItem('token') ? true : false;
    return session;
}

const logOut = () => {
    localStorage.removeItem('token')
};

export {
    authUser,
    logOut,
    registerSession,
    verifySession
};