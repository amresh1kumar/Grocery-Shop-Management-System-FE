import api from "./api";

export const ProductsList = async () => {
   try {
      const res = await api.get("productList/");
      return res;
   } catch (err) {
      console.error("Error fetching:", err);
      throw err;
   }
};
