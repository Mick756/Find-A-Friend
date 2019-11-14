import axios from 'axios';

async function getUser() {

    let user = await axios.get('/auth/get/user/' + localStorage.getItem('token'));

    if (user) {
        return user;
    } else
        return false;
}

async function verifyToken(token) {
    return axios.post("https://www.googleapis.com/oauth2/v3/tokeninfo", {id_token: token});
}


export default {
    getUser: function(id) {
        return getUser(id);
    },
    verifyToken: function(token) {
        return verifyToken(token);
    }
}