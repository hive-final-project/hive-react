import http from './base-http-service';

const listOrders = () => http.get(`/order/list`).then(response => response.data);

const newOrder = ( order ) => http.post('/order/new', order).then(response => response.data);

export default {
    listOrders,
    newOrder
}