import { userConstants } from "../constants";

let user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? { loggingIn: true, user } : {};

export function authenticationReducer(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_SUCCESS:
            localStorage.setItem('user', JSON.stringify(action.user))
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGOUT:
            localStorage.removeItem('user');
            return {
                loggingIn: false,
                user: {}
            };
        default:
            return state
    }
}

// export const getUser = state => state.authenticationReducer.user;