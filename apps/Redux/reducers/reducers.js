
let dataState = {
    user: null,
    token: null,
}

const rootReducer = (state = dataState, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return {
                ...state,
                user: action.user,
                token: action.token
            }
        default:
            return state;

    }
}

export default rootReducer;


