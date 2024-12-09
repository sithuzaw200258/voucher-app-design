import { getCookie } from "react-use-cookie"

export const uploadImage = (url,data) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getCookie('my_token')}`,
            'Accept': 'application/json'
        },
        body: data
    })
}

export const changePassword = (url,data) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('my_token')}`
        },
        body: JSON.stringify(data)
    })
}

export const changeName = (url,data) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('my_token')}`
        },
        body: JSON.stringify(data)
    })
}