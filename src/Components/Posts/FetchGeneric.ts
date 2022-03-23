import axios from "axios";

export const FetchAxios = async <T>(url: string) => {
  const { data } = await axios.get<T>(url).catch((err) => {
    throw err;
  });
  return data;
};
