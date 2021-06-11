var res = { next: false };

export function auth() {
    let perm = { next: false };

    if (localStorage.getItem('token')) {
        perm.next = true
    }
    return perm;    
};

export function authenticated() {
    let perm = { next: false };

    perm.next = localStorage.getItem('token') ? false : true;

    return perm; 
}