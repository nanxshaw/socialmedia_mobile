import axios from 'axios';
const apiUrl = 'http://localhost:8080/api';

const ApiGet = async (http, token = null) => {
    let options = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    };
    const request = await axios.get(apiUrl + http, options)
        .then(response => response)
        .catch(error => error.response.data);
    return request;
};

const ApiPost = async (http, payload, token = null, type = 'json') => {
    let options = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': type == 'json' ?'application/json': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*'
        }
    };
    const req = await axios.post(apiUrl + http, payload, options)
        .then(response => response)
        .catch(error => error.response.data);
    return req;
};

export const ApiPut = (http, payload, token = null, type = 'json') => {
    let options = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': type == 'json' ?'application/json': 'multipart/form-data',
        }
    };
    return axios.put(apiUrl + http, payload, options)
        .then(response => response)
        .catch(error => error.response.data);
};


export const ApiDelete = (http, payload, token) => {
    let options = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    };
    return axios.delete(apiUrl + http, { params: payload, headers: options })
        .then(response => response)
        .catch(error => error.response.data);
};

export default {
    ApiGet,
    ApiPost,
    ApiPut,
    ApiDelete,
}