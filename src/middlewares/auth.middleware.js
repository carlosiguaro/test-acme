var res = { next: false };

export function auth(auth) {
    console.log('session activa');
    return {
        next: false
    };
};

export function isAdmin(auth) {
    console.log('This user is admin');
    return {
        next: true
    };
};