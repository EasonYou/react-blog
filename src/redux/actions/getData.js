export const GET_HOME_PAGE = 'GET_HOME_PAGE'

export function getHomePage (data) {
    console.log(data)
    return {
        type: GET_HOME_PAGE,
        data
    }
}
