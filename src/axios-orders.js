import axios from 'axios';


const instance = axios.create({

    baseURL: 'https://react-burger-builder-64215.firebaseio.com/'
});


export default instance;