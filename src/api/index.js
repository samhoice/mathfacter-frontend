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

export function api_create_math_rule(left_min, left_max, right_min, right_max, operation) {
    var csrftoken = Cookies.get('csrftoken')

    var op;

    switch(operation) {
        case "add":
        case "+":
            op = '+'
            break
        case "sub":
        case "-":
            op = '-'
            break
        case "mul":
        case "*":
            op = '*'
            break
        case "div":
        case "/":
            op = '/'
            break
        default:
            // what?
            op = '' // API should return an error
            // maybe throw a promise failure
            break
    }

    return axios({
        method: 'post',
        url: top_level_url + 'rules/',
        headers: {'X-CSRFToken': csrftoken},
        withCredentials: true,
        data: {
            left_min: left_min,
            left: left_max,
            right_min: right_min,
            right: right_max,
            allowed_ops: op,
        }
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
