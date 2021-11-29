
import { LOGIN, LOGOUT, CREATE, START, LOGINF, CREATEF, STARTC, FORGOTC, FORGOT, FORGOTF } from './constants';


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
            localStorage.setItem("user", JSON.stringify(action.payload))
            return {

                ...state, userId: action.payload.userId, loading: false, error: "",

            };
        case LOGINF:
            return {
                ...state, error: action.payload, loading: false,

            };

        case LOGOUT:
            localStorage.removeItem('key');
            return {
                ...state, userId: -1,

            };
        case CREATE:
            localStorage.setItem("user", JSON.stringify(action.payload))
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
        case FORGOTC:
            return {
                ...state, forgotLoading: true,

            };

        case FORGOT:
            return {

                ...state, forgotSuccess : true, forgotLoading : false,

            };
        case FORGOTF:
            return {
                ...state, forgotError: action.payload, forgotLoading: false,

            };
        default: return state;

    }

};

export default reducer;