import http from './base-http-service';

const listOrders = () => http.get(`/order/list`).then(response => response.data);



export default {
    listOrders
}