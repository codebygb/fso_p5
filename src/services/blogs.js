import axios from "axios";
const baseUrl = "/api/blogs";
const getToken = () => {
  return JSON.parse(window.localStorage.getItem("loggedBlogappUser")).token;
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const token = getToken();
  console.log("In create, token:", token);
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const remove = async (id) => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};
export { getAll, create, update, remove };
