import axios from 'axios'
 
axios.defaults.baseURL = '/';
 
export const requseLogin = params => {
    return axios.post('/user/login', params);
}

export const pullLearn = params => {
    return axios.post('/api/learn/pull', params);
};