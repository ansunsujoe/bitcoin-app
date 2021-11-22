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
   return mockLogin(data) 
}

export const create = async (data) => {
    return mockCreate(data)
}

export const forget = async (data) => {
    return mockForget(data)
}