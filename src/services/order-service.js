import http from './base-http-service';

const listOrders = () => http.get('/order/list').then(response => response.data);

const newOrder = ( order ) => http.post('/order/new', order).then(response => response.data);

const editOrder = ( id, order ) => http.put(`/order/${id}/edit`, order).then(response => response.data);

const getOrder = ( id ) => http.get(`/order/${id}`).then(response => response.data)

export default {
    listOrders,
    newOrder,
    editOrder,
    getOrder
}