import Cookies from 'js-cookie'
import {
    SET_USER,
    SET_CSRF,
    REMOVE_USER,
    ERROR_MSG,
} from "../actions/authActions";

function loadUser() {
    const authToken = Cookies.get("session");
    if (authToken) {
        try {
            const payload = authToken.split(".")[1];
            const decodedPayload = atob(payload);
            const payloadObj = JSON.parse(decodedPayload);
            const { data } = payloadObj;
            return data;
        } catch (e) {
            Cookies.remove("session");
        }
    }
    return {};
}

const initialState = {
    ...loadUser(),
    csrf: fetch,
}

const authReducer = ( state = initialState, action) => {
      switch (action.type) {
        case SET_USER:
            return { ...state, ...action.user }
        case SET_CSRF:
            return { ...state, csrf: action.cb }
        case REMOVE_USER:
            return { csrf: state.csrf }
        case ERROR_MSG:
            return { ...state, error: action.message }
        default:
            return state
    }
};

export default authReducer;