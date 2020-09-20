import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  orderURL = 'http://localhost:3000/api/orders';
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
    
  }
