
import { get } from "lodash";
import { getCookie } from "react-use-cookie";
const baseUrl = import.meta.env.VITE_API_URL;
const voucherUrl = baseUrl + '/vouchers';
export const fetchVouchers = (url) => {
    return fetch(url, {
        headers: {
            'Authorization': `Bearer ${getCookie('my_token')}`,
            'Accept': 'application/json'
        }
    }).then((res) => res.json());
}

export const createVoucher = (data) => {
    return fetch(baseUrl + '/vouchers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getCookie('my_token')}`
        },
        body: JSON.stringify(data)
    })
}

export const deleteVoucher = (id) => {
    return fetch(voucherUrl + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('my_token')}`
        }
    })
}
