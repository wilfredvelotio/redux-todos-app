import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 2000,
});

export const getAxios = async <T,>(url: string) => {
  try {
    const { data } = await instance.get<T>(url);
    return data;
  } catch (err) {
    throw err;
  }
};

export const postAxios = async <T,>(url: string, payload: T) => {
  try {
    const { data } = await instance.post<T>(url, payload);
    return data;
  } catch (err) {
    throw err;
  }
};

export const putAxios = async <T,>(url: string, payload: T) => {
  try {
    const { data } = await instance.put<T>(url, payload);
    return data;
  } catch (err) {
    throw err;
  }
};

export const deleteAxios = async <T,>(url: string) => {
  try {
    const { data } = await instance.delete<T>(url);
    return data;
  } catch (err) {
    throw err;
  }
};
