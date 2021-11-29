
import { LOGIN, LOGOUT, CREATE, START, LOGINF, CREATEF, STARTC } from './constants';


const INITIAL_STATE = {

    userId: -1,
    loading: false,
    loginFailed: false,
    createloading: false,
    forgotFailed: false,
    error: "",
    createError: "",
    forgotLoading: false,
    forgotError: "",
    forgotSuccess: false
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            const { content } = action.payload
            localStorage.setItem("user", JSON.stringify(content))
            return {

                ...state, userId: action.payload.userId, loading: false, error: "",

            };
        case LOGINF:
            return {
                ...state, error: action.payload, loading: false,

            };

        case LOGOUT:
            localStorage.removeItem("user");
            return {
                ...state, userId: -1,

            };
        case CREATE:
            const val = action.payload.content
            localStorage.setItem("user", JSON.stringify(val))
            return {
                ...state, userId: action.payload.userId, createloading: false, createError: "",

            };

        case CREATEF:
            return {
                ...state, createError: action.payload, createloading: false,

            };

        case START:
            return {
                ...state, loading: true,

            };

        case STARTC:
            return {
                ...state, createloading: true,

            };
        default: return state;

    }

};

export default reducer;