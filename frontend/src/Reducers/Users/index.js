
import { LOGIN, LOGOUT, CREATE, START, LOGINF, CREATEF, STARTC } from './constants';

const getContentFromLS = localStorage.getItem("user")
let defaultID = -1
let JSONData
if(getContentFromLS){
    JSONData = JSON.parse(getContentFromLS)
    const { user_id } = JSONData
    defaultID = user_id
}
    
const INITIAL_STATE = {

    userId: defaultID,
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

                ...state, userId: content.user_id, loading: false, error: "",

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
                ...state, userId: val.user_id, createloading: false, createError: "",

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