
const ADD_USER = (data) => {
    return { type: 'ADD_USER', user: data, token: data.token }
}

export { 
    ADD_USER,
}