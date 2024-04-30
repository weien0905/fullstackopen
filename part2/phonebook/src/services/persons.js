import axios from 'axios';
const url = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(url);
    return request.then(res => res.data);
}

const create = object => {
    const request = axios.post(url, object);
    return request.then(res => res.data);
}

const update = (id, object) => {
    const request = axios.put(`${url}/${id}`, object);
    return request.then(res => res.data);
}

const remove = id => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(res => res.data)
  }

export default { getAll, create, update, remove };