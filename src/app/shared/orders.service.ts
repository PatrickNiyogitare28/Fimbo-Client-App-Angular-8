import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  orderURL = 'http://localhost:3000/api/orders';
  foundOrderURL = 'http://localhost:3000/api/foundOrders';
  constructor(private http: HttpClient) { }

  makeOrder(userId,orderName,orderDescription){
    let orderObj = {
       orderName: orderName,
       description: orderDescription,
       user: userId
   }
   const token = sessionStorage.getItem('token');
   return this.http.post(`${this.orderURL}/newOrder`,orderObj,{headers: new HttpHeaders().set('x-auth-token',token)})
  }

  addOrderImage(orderId,image){
    const strOrderId = orderId.toString();
    const formData = new FormData();
    formData.append('file',image);
    return this.http.post(`${this.orderURL}/addOrderImage`,formData,{headers: new HttpHeaders().set('order-id',strOrderId)})
    }

  getUserOrders(userId){
    const token = sessionStorage.getItem('token');
    return this.http.get(`${this.orderURL}/userOrders/${userId}`,{headers: new HttpHeaders().set('x-auth-token',token)})
  }  

  deleteOrder(orderId){
    const token = sessionStorage.getItem('token')
    return this.http.delete(`${this.orderURL}/removeOrder/${orderId}`,{headers: new HttpHeaders().set('x-auth-token',token)})
  }
  fetchAllOrders(){
    return this.http.get(`${this.orderURL}/allOrder`)
  }
  isOrderChecked(vendorId,orderId){
    const token = sessionStorage.getItem('token');
    return this.http.get(`${this.orderURL}/checkedout/${vendorId}/${orderId}`,{headers: new HttpHeaders()
    .set('x-auth-token',token)})
  }
  isOrderFound(ordereId){
    return this.http.get(`${this.foundOrderURL}/${ordereId}`)
  }
  
  }
