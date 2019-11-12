import axios from 'axios';

async function getUser() {

    let user = await axios.get('/auth/get/user/' + localStorage.getItem('token'));

    if (user) {
        return user;
    } else
        return false;
}

async function authToken() {

    if (localStorage.getItem('token') !== null) {
        await axios.post('/auth/google_token', {token: localStorage.getItem('token')}).then(response => {
            if (response.data == false) {
                localStorage.removeItem('token');
                return false;
            } else {
                return response.data;
            }
        }).catch(error => {
            return false;
        });
    }

}


export default {
    getUser: function(id) {
        return getUser(id);
    },
    authToken: function() {
        return authToken();
    }
}