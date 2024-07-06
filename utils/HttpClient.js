import axios from "axios";
const URL = "https://dustin-lic-bb575-default-rtdb.firebaseio.com";

const getProducts = async () => {
  const products = [];
  const response = await axios.get(`${URL}/products.json`);

  for (const key in response.data) {
    products.push({
      id: key,
      descripcion: response.data[key].descripcion,
      marca: response.data[key].marca,
      precio: response.data[key].precio,
      date: new Date(response.data[key].date),
    });
  }
  return products;
};

const addProducts = async (products) => {
  const response = await axios.post(`${URL}/products.json`, products);
  const id = response.data.name;
  return id;
};

const updateProducts = (id, products) => {
  return axios.put(`${URL}/products/${id}.json`, products);
};

const deleteProducts = (id) => {
  return axios.delete(`${URL}/products/${id}.json`);
};

export { getProducts, addProducts, updateProducts, deleteProducts };



