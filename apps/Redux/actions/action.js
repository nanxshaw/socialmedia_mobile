
const ADD_USER = (data) => {
    return { type: 'ADD_USER', user: data, token: data.token }
}
const DEL_USER = () => {
    return { type: 'DEL_USER' }
}

export { 
    ADD_USER,
    DEL_USER
}