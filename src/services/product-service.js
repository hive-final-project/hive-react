import http from './base-http-service';

const getProduct = (id) => http.get(`/product/${id}`).then(response => response.data);

const getAllProducts = () => http.get('/product/').then(response => response.data)

const newProduct = (product) => http.post('/product/new', product).then(response => response.data);

export default {
    getProduct,
    getAllProducts,
    newProduct
}