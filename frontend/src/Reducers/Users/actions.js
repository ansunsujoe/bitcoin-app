import { LOGIN, LOGINF, LOGOUT, CREATE, START, CREATEF, STARTC} from './constants';
import  { login, create } from "../../authenticate"


export const loginUser = (data) => {
    return dispatch => {
        dispatch(loginStarted())
        login(data).then(res => {
            const { success } = res
            if(success){
                dispatch(loginU(res))
            } else{
                dispatch(loginF("Please try again after sometime"))
            }
            
        }).catch(err => {
            dispatch(loginF("Please try again after sometime"))
        })  
    };
  };


  export const createUser = (data) => {
    return dispatch => {
        dispatch(createStarted())
        create(data).then(res => {
            const { success, message } = res
            if(success){
                dispatch(createU(res))
            } else{
                dispatch(createF(message))
            }
        }).catch(err => {
            dispatch(createF("Please try later"))
        })  
    };
  }


  export const logout = () => {
    return dispatch => {
        dispatch(logoutUser())
    };
  }

const loginU = (data) => {
    return {
        type: LOGIN,
        payload : data
    };

};

const loginF = (data) => {
    return {
        type: LOGINF,
        payload : data
    };

};

const createU = (data) => {

    return {

       type: CREATE,
       payload : data
    };

};

const createF = (data) => {
    return {
        type: CREATEF,
        payload : data
     }; 
}

const logoutUser = () => {
    return {
       type: LOGOUT,
    };
};


const loginStarted = () => {
    return {
       type: START,
    };

};

const createStarted = () => {
    return {
       type: STARTC,
    };

};

