export const GET = 'GET'
export const POST = 'POST'

export function get (code) {
    return {
        type: GET,
        code: code
    }
}

export function post (code) {
    return {
        type: POST,
        code: code
    }
}