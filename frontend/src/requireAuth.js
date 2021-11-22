import React from 'react';
import { connect } from "react-redux"
import Login  from 'layouts/Login';
import { useLocation } from 'react-router-dom'


const RequireAuth = ({ children, userID })=>{
    console.log("again")
    const location = useLocation();
    return (localStorage.getItem("user"))
      ? children 
      : <Login path = {location}/>
}

  const mapStateToProps = state => {
    return {
      userID: state.user.userId,
    }
  }
  

export default connect(mapStateToProps, null)(RequireAuth)