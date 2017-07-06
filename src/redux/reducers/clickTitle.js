export const clickTitle = function (state='home', action) {
    switch (action.type) {
        case 'CLICK_TITLE':
            return {
                state,
                clickTitle: action.clickTitle
            }
        default:
            return state
    }
}