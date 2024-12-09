import { get } from "lodash";
import { getCookie } from "react-use-cookie";
const baseUrl = import.meta.env.VITE_API_URL;
const productUrl = baseUrl + '/products';
export const fetchProducts = (url) => {
    return fetch(url, {
        headers: {
            'Authorization': `Bearer ${getCookie('my_token')}`,
            'Accept': 'application/json'
        }
    }).then((res) => res.json());
}

export const createProduct = (product_name, price) => {
    return fetch(productUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('my_token')}`
        },
        body: JSON.stringify({
            product_name,
            price,
        })
    });
}

export const updateProduct = (id, data) => {
    return fetch(productUrl + '/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('my_token')}`
        },
        body: JSON.stringify({
            product_name: data.product_name,
            price: data.price,
        })
    })
}

export const deleteProduct = (id) => {
    return fetch(productUrl + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('my_token')}`
        }
    })
}