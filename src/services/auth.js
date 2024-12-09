const baseUrl = import.meta.env.VITE_API_URL;
const loginUrl = baseUrl + '/login';
const registerUrl = baseUrl + '/register';

const login = (data) => {
    return fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

const register = (data) => {
    return fetch(registerUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
}


export { login, register }