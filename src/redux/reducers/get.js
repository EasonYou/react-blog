export const get = function (state = {}, action) {
    switch (action.type) {
        case 'GET':
            return {
                ...state,
                code: action.code
            }
        default: 
            return state
    }
}

export const post = function (state = {}, action) {
    switch (action.type) {
        case 'POST':
            return {
                ...state,
                code: action.code
            }
        default: 
            return state
    }
}