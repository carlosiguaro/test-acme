import * as authenticate from './auth.middleware';
import * as roles from './roles.middleware'

const middlewares = {
    ...authenticate,
    ...roles
};

export default middlewares;