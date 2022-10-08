import axios from "axios";
const baseUrl = "http://localhost:5000/api/users/";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createNew = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const login = (newObject) => {
  const request = axios.post(`${baseUrl}login`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  createNew,
  login,
};
