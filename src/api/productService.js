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

export const AddProduct = async (data) => {
   try {
      const res = await api.post("productList/", data);
      return res;
   } catch (err) {
      console.error("Error posting:", err.response?.data || err);
      throw err;
   }
};


export const UpdateProduct = async (id, data) => {
   try {
      const res = await api.put(`productList/${id}/`, data)
      return res
   } catch (err) {
      throw err;
   }
}


export const DeleteProduct = async (id) => {
   try {
      const res = await api.delete(`productList/${id}/`)
      return res
   } catch (err) {
      throw err;
   }

}