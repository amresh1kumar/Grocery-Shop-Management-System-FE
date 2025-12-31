import api from "./api";

export const register = async (userData) => {
   const { data } = await api.post("register/", userData);
   return data;
};

export const login = async (credentials) => {
   const { data } = await api.post("login/", credentials);
   return data;
};


