import axios from "axios";

export const ProductsData = async () => {
  try {
    const response = await axios.get("/src/Api/ProductsAPI.json");
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};