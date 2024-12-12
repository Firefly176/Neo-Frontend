import axios from "axios";

const API_URL = import.meta.env.API_URL;

const createAxiosInstance = () => {
  const axiosApi = axios.create({
    baseURL: API_URL,
  });

  axiosApi.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  return axiosApi;
};

const axiosApi = createAxiosInstance();

export async function get(url, config = {}) {
  return await axiosApi
    .get(url, {
      ...config,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    })
    .then((response) => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(
      url,
      { ...data },
      {
        ...config,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      }
    )
    .then((response) => response.data);
}
export async function postFormData(url, data) {

  const config = {
    method: "POST",
    body: data,
  };
  
  try {
    const req = await fetch(url, config);
    if (req.ok) {
      const res = await req.json();
      console.log(res);
      if (res.success) {
       return await res.data
      }
    }
  } catch (err) {
    return await err
  }
 
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(
      url,
      { ...data },
      {
        ...config,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      }
    )
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, {
      ...config,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    })
    .then((response) => response.data);
}
