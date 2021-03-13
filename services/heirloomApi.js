import axios from "axios";

const baseUrl = "http://127.0.0.1:5000/";

export const login = async function (username, password) {
  const params = {
    username: username,
    password: password,
  };
  let res = await baseRequest("POST", "auth/login", params);
  return "NEW-TOKEN-WHO-DIS";
};

export const logout = async function () {
  let res = await baseRequest("GET", "auth/logout");
  return res.data;
};

export const getRecipes = async function () {
  let res = await baseRequest("GET", "recipes/get-recipes");
  return res.data;
};

export const createRecipe = async function(body) {
  let res = await baseRequest("POST", "recipes/create", body)
  return res
}

export const baseRequest = async function (httpType, route, params = null) {
  let res;
  const _params = { ...params, validateStatus: () => true };
  switch (httpType) {
    case "GET":
      res = await axios.get(`${baseUrl}/${route}`, _params);
      break;
    case "POST":
      res = await axios.post(`${baseUrl}/${route}`, _params);
      break;
    case "DELETE":
      res = await axios.delete(`${baseUrl}/${route}`, _params);
      break;
    default:
      break;
  }
  console.log(`Status code: ${res.status}`);
  console.log(`Status text: ${res.statusText}`);
  console.log(`Request method: ${res.request.method}`);
  console.log(`Path: ${res.request.path}`);

  console.log(`Date: ${res.headers.date}`);
  console.log(`Data: ${JSON.stringify(res.data)}`);
  return res;
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
