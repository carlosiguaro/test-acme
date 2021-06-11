const saveDashboard = (url) => {
    const dashboardSaved = localStorage.getItem('dashboardurls');
    var pass = true;

    if (!dashboardSaved) {
        localStorage.setItem('dashboardurls', '{"urls": ["'+ url + '"] }');
    } else {
        let urlSaved = JSON.parse(dashboardSaved),
            match = false;
        for (var i in urlSaved.urls) {
            if (urlSaved.urls[i] == url) {
                match = true;
            }
        }

        if (!match) {
            urlSaved.urls.push(url);
            localStorage.setItem('dashboardurls', JSON.stringify(urlSaved));
        } else {
            pass = false;
        }
    }
    return pass;
}

const getDasboards = () => {
    const dashboardSaved = localStorage.getItem('dashboardurls');
    var urls;
    
    if (!dashboardSaved) {
        urls = [];
    } else {
        urls = JSON.parse(dashboardSaved).urls;
    }

    return urls;
};

export {
    saveDashboard,
    getDasboards
}