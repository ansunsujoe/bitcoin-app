import { combineReducers } from 'redux';


import userReducer from '../Reducers/Users';


const rootReducer = combineReducers({

    user: userReducer,

});

export default rootReducer;