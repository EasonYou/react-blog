const init = {
    title: 'Dwyane',
    desc: 'heihei',
    picUrl: 'http://p1.gexing.com/G1/M00/7C/08/rBACFFPl8x-Tr6ElAA08BiA2TxA955.jpg'
}

export const homePage = (state = init, action) => {
    switch (action.type) {
        case 'GET_HOME_PAGE':
            return {
                ...action.data
            }
        default:
            return state
    }
}