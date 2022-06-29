// @flow
import axios from 'axios';
function Client() {
    let instance = axios.create({
        baseURL: "http://localhost:5000/",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        }
    });
    return instance;
}

export default Client();