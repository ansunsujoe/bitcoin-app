import { LOGIN, LOGINF, LOGOUT, CREATE, START, CREATEF, STARTC, FORGOT, FORGOTF, FORGOTC } from './constants';
import  { login, create, forget } from "../../authenticate"


export const loginUser = (data) => {
    return dispatch => {
        dispatch(loginStarted())
        login(data).then(res => {
            dispatch(loginU(res))
        }).catch(err => {
            dispatch(loginF("UH OH, Please try later"))
        })  
    };
  };


  export const createUser = (data) => {
    return dispatch => {
        dispatch(createStarted())
        create(data).then(res => {
            dispatch(createU(res))
        }).catch(err => {
            dispatch(createF("UH OH, Please try later"))
        })  
    };
  }


  export const forgetPass = (data) => {
    return dispatch => {
        dispatch(forgotStarted())
        forget(data).then(res => {
            dispatch(forgot(res))
        }).catch(err => {
            dispatch(forgotFailed("UH OH, Please try later"))
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

const forgot = (data) => {
    return {
        type : FORGOT,
        payload : data
    }
}

const forgotFailed = (data) => {
    return {
        type : FORGOTF,
        payload : data
    }
}

const forgotStarted = () => {
    return {
        type : FORGOTC
    }
}