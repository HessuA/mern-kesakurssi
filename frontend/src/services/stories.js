import axios from "axios";
const baseUrl = "http://localhost:5000/api/stories";

const getStories = (userId) => {
  const request = axios.get(`${baseUrl}/user/${userId}`);
  return request.then((response) => response.data);
};

const newStory = (newObject, config) => {
  const request = axios.post(baseUrl, newObject, config);
  return request.then((response) => response.data);
};

const deleteStory = (storyId, config) => {
  const request = axios.delete(`${baseUrl}/${storyId}`, config);
  return request.then((response) => response.data);
};

const editStory = (storyId, editObject, config) => {
  const request = axios.patch(`${baseUrl}/edit/${storyId}`, editObject, config);
  return request.then((response) => response.data);
};

export default {
  getStories,
  newStory,
  deleteStory,
  editStory,
};
