import axios from 'axios';

const authUser = (credentials) => {
    return axios.post('https://webhooks.multifiber.cl/api/v1/auth/obtain_token/', {...credentials})
};

const logout = () => {
    // 
};

export {
    authUser,
    logout
};