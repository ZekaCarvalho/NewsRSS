import axios from 'axios';

export default (urlFeed) => {
    const api = axios.create({
        baseURL: urlFeed
        
    });

    return api;
};