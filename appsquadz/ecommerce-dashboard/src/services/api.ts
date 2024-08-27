import axios from "axios";
const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const login = async (username: string, password: string) => {
  // Mock login API call
  return new Promise<{ username: string; password: string }>((resolve) => {
    setTimeout(() => {
      resolve({ username, password });
    }, 1000);
  });
};

export const signup = async (
  username: string,
  email: string,
  password: string
) => {
  return new Promise<{ username: string; email: string; password: string }>(
    (resolve) => {
      setTimeout(() => {
        resolve({ username, email, password });
      }, 1000);
    }
  );
};

export const fetchProducts = async (
  page: number = 1,
  limit: number = 10,
  q = ""
) => {
  const response = await api.get(
    `/products/search?limit=${limit}&skip=${(page - 1) * limit}&q=${q}`
  );
  return response.data.products;
};
