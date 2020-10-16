import Cookies from 'js-cookie'
const axios = require("axios")


export function api_reconnect(username, password) {
    var csrftoken = Cookies.get('csrftoken')
    return axios({
        method: 'post',
        url: 'http://localhost/api-auth/login/',
        headers: {'X-CSRFToken': csrftoken},
        data: {
            username: username,
            password: password,
        },
        withCredentials: true,
    })
}
export function api_get_problem() {
    return axios({
        method: 'get',
        url: 'http://localhost/problems',
        withCredentials: true,
    })
}

export function api_save_answer(problem_id, answer) {
    var csrftoken = Cookies.get('csrftoken')
    return axios({
        method: 'put',
        url: 'http://localhost/problems/' + problem_id + '/',
        data: {
            value: answer
        },
        withCredentials: true,
        headers: {'X-CSRFToken': csrftoken},
    })
}

export function api_get_text_card() {
    return axios({
        method: 'get',
        url: 'http://localhost/cards/draw',
        withCredentials: true,
    })
}
