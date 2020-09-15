import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpClientXsrfModule } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usersURL = 'http://localhost:3000/api/users';
  authURL = 'http://localhost:3000/api/auth';
  constructor(public http: HttpClient) { }

  registerUser(firstname,lastname,phone,password){
    const obj={
      firstname: firstname,
      lastname: lastname,
      email: "NULL",
      phone: phone,
      password: password
    }
    return this.http.post(`${this.usersURL}/register`,obj);
  }

  loginUser(phone,password){
    const obj = {
      phone: phone,
      password: password
    }

    return this.http.post(`${this.usersURL}/login`,obj);
  }

  authenticateUser(){
   let token = sessionStorage.getItem('token')
   return this.http.get(`${this.authURL}/jwt`,{headers: new HttpHeaders().set('x-auth-token',token)})
  }
  authenticateVendor(){
    let token = sessionStorage.getItem('token')
    return this.http.get(`${this.authURL}/vendor/jwt`,{headers: new HttpHeaders().set('x-auth-token',token)})
  }
  logout(){
    sessionStorage.removeItem('token');
    return true;
  }
}
