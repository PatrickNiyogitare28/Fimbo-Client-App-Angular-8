import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersURL = 'http://localhost:3000/api/users';
  authURL   =  'http://localhost:3000/api/auth';
  usersAddressURL = 'http://localhost:3000/api/usersAddresses';
  userEmailURL = 'http://localhost:3000/api/emailVerification'
  constructor(public http: HttpClient) { }
  
  getAllUsers(){
    return this.http.get(`${this.usersURL}/allUsers`);
  }

  updateUser(userId,firstname,lastname,email,phone,level){
    console.log("userId: "+userId)
    const obj={
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      level: level
    }

    const token=sessionStorage.getItem('token');
    return this.http.put(`${this.usersURL}/updateUser/${userId}`,obj,{headers: new HttpHeaders().set('x-auth-token',token)})
  }

  deleteUser(userId){
    const token = sessionStorage.getItem('token');
    return this.http.delete(`${this.usersURL}/removeUser/${userId}`,{headers: new HttpHeaders().set('x-auth-token',token)})
  }

  getUserAuthProfile(){

  const token = sessionStorage.getItem('token');
  return this.http.get(`${this.authURL}/jwt`,{headers: new HttpHeaders().set('x-auth-token',token)})
  }

  getUserAddress(userId){
    const token = sessionStorage.getItem('token');
    return this.http.get(`${this.usersAddressURL}/userAddress/${userId}`,{headers: new HttpHeaders().set('x-auth-token',token)})
  }

  verifyUserEmail(userId,userEmail){
    const body = {
       userId : userId,
       email: userEmail
    }
    const token = sessionStorage.getItem('token')
    return this.http.post(`${this.userEmailURL}/verify`,body,{headers: new HttpHeaders().set('x-auth-token',token)})
  }
  verifyUserEmailCode(userId,code){
    const body = {
      userId : userId,
      code: code
   }
   const token = sessionStorage.getItem('token')
   return this.http.post(`${this.userEmailURL}/verifyCode`,body,{headers: new HttpHeaders().set('x-auth-token',token)})
  }
  updateUserEmail(userId,email){
    const body = {
      userId: userId,
      email: email
    }
    const token = sessionStorage.getItem('token')
    return this.http.put(`${this.userEmailURL}/updateEmail`,body,{headers: new HttpHeaders().set('x-auth-token',token)})
  }

  addUserAddress(userId,country,city,street){
   const body = {
     user: userId,
     country: country,
     city: city,
     streetCode: street
   }
   const token = sessionStorage.getItem('token')
   return this.http.post(`${this.usersAddressURL}/addAddress`,body,{headers: new HttpHeaders().set('x-auth-token',token)})
  }

  updateUserAddress(userId,country,city,street){
    const body = {
      user: userId,
      country: country,
      city: city,
      streetCode: street
    }
    const token = sessionStorage.getItem('token')
    return this.http.put(`${this.usersAddressURL}/updateAddress`,body,{headers: new HttpHeaders().set('x-auth-token',token)})
  }
  updateUserProfile(userId,userFirstname,userLastname,phone){
    const body = {
      userId :userId,
      firstname: userFirstname,
      lastname : userLastname,
      phone: phone
    }
    const token = sessionStorage.getItem('token')
    return this.http.put(`${this.usersURL}/updateProfile`,body,{headers: new HttpHeaders().set('x-auth-token',token)})
  }
  updateUserPassword(userId,oldPassword,newPassword){
    const body={
      userId : userId,
      oldPassword: oldPassword,
      newPassword: newPassword
    }
    const token = sessionStorage.getItem('token')
   return this.http.put(`${this.usersURL}/updatePassword`,body,{headers: new HttpHeaders().set('x-auth-token',token)})
  }
  getUserProfile(userId){
    return this.http.get(`${this.usersURL}/${userId}`);
  }
}
