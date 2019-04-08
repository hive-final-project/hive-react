import http from './base-http-service';

const getProduct = (id) => http.get(`/product/${id}`).then(response => response.data);

const getAllProducts = () => http.get('/product/').then(response => response.data)

const newProduct = (product) => {
    const data = new FormData();
    Object.keys(product).forEach(prop => data.append(prop, product[prop]));
    return http.post('/product/new', data)
      .then(response => response.data)
};

const deleteProduct = (id) => {
    http.delete(`/product/${id}`).then(response => response.data)
}


export default {
    getProduct,
    getAllProducts,
    newProduct,
    deleteProduct
}