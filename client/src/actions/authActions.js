
export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_CSRF = 'SET_CSRF'
export const ERROR_MSG = 'ERROR_MSG'
export const SET_ANSWERS = 'SET_ANSWERS'


export const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

export const setCsrfFunc = (cb) => {
    return {
        type: SET_CSRF,
        cb
    }
}


export const removeUser = (user) => {
    return {
        type: REMOVE_USER,
    }
}

export const logout = () => (dispatch, getState) => {
    const fetchWithCSRF = getState().authReducer.csrf;
    fetchWithCSRF(`/api/session/logout`, {
        method: 'POST'
    }).then(() => dispatch(removeUser()));
}

export const login = (email, password) => {
    return async (dispatch, getState) => {
        const fetchWithCSRF = getState().authReducer.csrf;
        const res = await fetchWithCSRF('/api/session/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        })

        if (res.status === 400 || res.status === 401 ) {
            const { errors } = await res.json();
            dispatch(error(errors))
        }
    
        if (res.ok) {
            const { user } = await res.json();
            dispatch(setUser(user));
        }

    }
}


// yongho
export const error = (message) => {
    return { type: ERROR_MSG, message };
}


export const signup = (name, email, password) => {
    return async (dispatch, getState) => {
        const fetchWithCSRF = getState().authReducer.csrf;
        const res = await fetchWithCSRF('/api/session/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        })

        if (res.status === 400  ) {
            const { errors } = await res.json();
            dispatch(error(errors))
        }

        if (res.ok) {
            const { user } = await res.json();
            dispatch(setUser(user))
        }

    }
}

export const patchUser = (formState) => {
    return async (dispatch, getState) => {
        const fetchWithCSRF = getState().authReducer.csrf;
        const res = await fetchWithCSRF(`/api/users/${formState.id}/patch`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formState)
        })

        if (res.status === 400) {
            const { errors } = await res.json();
            dispatch(error(errors))
            return res;
        }

        if (res.ok) {
            const { user, errors } = await res.json();
            dispatch(setUser(user))
            return { res, user, errors };
        }

    }
}


export const setAnswers = (choiceId) => {
    return {
        type: SET_ANSWERS,
        answers: choiceId
    }
}