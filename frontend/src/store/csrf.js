import Cookies from 'js-cookie';

export async function csrfFetch(url, options={}){
    //sets defaults if empty
    options.method = options.method || 'GET';
    options.headers = options.headers || {};

    //Setting the XSRF token
    if(options.method.toUpperCase() !== 'GET'){
        options.headers['Content-Type'] = 
            options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }

    //calls default window's fetch with options
    const res = await window.fetch(url, options);

    //Throws error if response is above 400
    if(res.status >= 400) throw res;
    //if successful returns response
    return res;
}

export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
}