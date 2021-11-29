import { http} from "./http_service";

/****************PRODUCTS *******************/
export function loadBestProducts(){
    return http().get('/best-products');
}
export function loadAllProducts(){
    return http().get('/products');
}
export function loadSearchProducts(data){
    return http().get(`/products?q=${data}`);
}
export function DetailProduct(id){
    return http().get(`/products/${id}`);
}

/**************** KERANJANG *******************/
export function createOrder($data){
    return http().post('/keranjangs',$data);
}
export function createCheckout($data){
    return http().post('/pesanans',$data);
}
export function getKeranjang(){
    return http().get('/keranjangs');
}
export function deleteOrder(id){
    return http().delete(`/keranjangs/${id}`);
}
export function updateUser(id,data){
    return http().post(`/products/${id}`,data);
}