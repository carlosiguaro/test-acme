var res = { next: false };

export function roles(state) {
    if (state.hasOwnProperty('user') === true) {
        if (state.user.hasOwnProperty('token') === true) {
            if (state.user.token.length > 0) {
                res.next = true;
            }
        }
    }
    return res;
}