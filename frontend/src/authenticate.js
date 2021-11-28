import axios from 'axios';

function mockLogin(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
            userID : 1,
            name : "Vashisht Gupta"
        });
      }, 2000);
    });
}

function mockCreate(data) {
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        resolve({
            userID : 1,
            name : "Vashisht Gupta"
        });
      }, 2000);
    });
}

function mockForget(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject({
            userID : 1,
            name : "Vashisht Gupta"
        });
      }, 2000);
    });
}

export const login  =  (data) => {
  return axios.post('http://localhost:5000/users/login',data)
  .then(res => res.data)
  .catch(function (error) {
    return "Please try again after sometime"
  });
}

export const create = async (data) => {
  return axios.post('http://localhost:5000/users/register',data)
  .then(res => res.data)
  .catch(function (error) {
    return "Please try again after sometime"
  });
}

export const forget = async (data) => {
    return mockForget(data)
}