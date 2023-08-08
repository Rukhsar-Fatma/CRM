import axios from 'axios';
import toast from 'react-hot-toast';

const headers = {
  'Content-Type': 'application/json'
};

async function post(endpoint, payload) {
  try {
    const response = await axios({
      method: 'POST',
      url: endpoint,
      headers: headers,
      data: payload
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg)
    throw new Error(error.message);
  }
}

async function get(endpoint) {
  try {
    const response = await axios({
      method: 'GET',
      url: endpoint,
      headers: headers
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg)
    throw new Error(error.message);
  }
}

async function put(endpoint, payload) {
  try {
    const response = await axios({
      method: 'PUT',
      url: endpoint,
      headers: headers,
      data: payload
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg)
    throw new Error(error.message);
  }
}

async function patch(endpoint, payload) {
  try {
    const response = await axios({
      method: 'PATCH',
      url: endpoint,
      headers: headers,
      data: payload
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg)
    throw new Error(error.message);
  }
}

async function del(endpoint) {
  try {
    const response = await axios({
      method: 'DELETE',
      url: endpoint,
      headers: headers
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.msg)
    throw new Error(error.message);
  }
}

const fetchData = {
  post,
  get,
  put,
  patch,
  delete: del // Using `delete` as a function name is not allowed in strict mode, so we use `del` instead
};

export default fetchData;
