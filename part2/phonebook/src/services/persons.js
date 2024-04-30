import axios from 'axios';
const url = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(url);
    return request.then(res => res.data);
}

const create = newObject => {
    const request = axios.post(url, newObject);
    return request.then(res => res.data);
}

export default { getAll, create };