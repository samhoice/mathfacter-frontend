import Cookies from 'js-cookie'
const axios = require("axios")


var top_level_url = 'http://localhost/'

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

export function api_get_user_info() {
    return axios({
        method: 'get',
        url: 'http://localhost/users/me/',
        withCredentials: true,
    })
}

export function api_get_problem() {
    return axios({
        method: 'get',
        url: 'http://localhost/problems/',
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
        url: 'http://localhost/cards/draw/',
        withCredentials: true,
    })
}

export function api_get_categories() {
    return axios({
        method: 'get',
        url: 'http://localhost/category/',
        withCredentials: true,
    })
}

/* api_create_flashcard
 *
 * front_text - string, text for front of card
 * back_text - string, text for  back of card
 * category - string, name of category
 *
 * will throw a 404 if the category isn't found, you have to create that
 * separately
 */
export function api_create_flashcard(front_text, back_text, category) {
    var csrftoken = Cookies.get('csrftoken')
    return axios({
        method: 'post',
        url: top_level_url + 'cards/',
        headers: {'X-CSRFToken': csrftoken},
        withCredentials: true,
        data: {
            front_text,
            back_text,
            category: {
                name: category
            }
        }
    })
}
