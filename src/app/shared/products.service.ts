import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpClientXsrfModule } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsURL = 'http://localhost:3000/api/products';
  productsCategoriesURL = 'http://localhost:3000/api/productsCategories';
  productsCollectionsURL = 'http://localhost:3000/api/productsCollections';
  productsMarksURL = 'http://localhost:3000/api/productsMarks';
  productsSellersURL = 'http://localhost:3000/api/productsSellers';
  productsRatesURL = 'http://localhost:3000/api/productsRates';
  shoppingCartURL = 'http://localhost:3000/api/shoppingCart'
  authURL = 'http://localhost:3000/api/auth'

  constructor(public http: HttpClient) { }

   getProducts(){
     return this.http.get(`${this.productsURL}/allProducts`)
   }
   getProductData(productId){
     return this.http.get(`${this.productsURL}/product/${productId}`)
   }
   getProductsByCategory(category){
     return this.http.get(`${this.productsURL}/productsByCategory/${category}`)
   }

   getProductsCategories(){
     return this.http.get(`${this.productsCategoriesURL}/categories`)
   }

   getProductsCollections(){
     return this.http.get(`${this.productsCollectionsURL}/collections`)
   }
   
   getProductsMarks(){
     return this.http.get(`${this.productsMarksURL}/marks`)
   }

   getProductsSellers(){
     return this.http.get(`${this.productsSellersURL}/sellers`)
   }

   addProduct(productName,seller,category,collection,mark,detail,price,usedStatus){
     const obj = {
      prod_name:productName,
      prod_seller:seller,
      prod_category: category,
      prod_mark:mark,
      prod_collection:collection,
      details:detail,
      price: price,
      usedStatus: usedStatus
     }
     const token = sessionStorage.getItem('token')
     return this.http.post(`${this.productsURL}/addProduct`,obj,{headers: new HttpHeaders().set('x-auth-token',token)})
   }

   addProductImage(productId,image){
    const formData = new FormData();
    formData.append('file',image);
     return this.http.post(`${this.productsURL}/productImage`,formData,{headers: new HttpHeaders().set('product-id',productId)})
   }

   updateProductImage(productId,image){
    const formData = new FormData();
    formData.append('file',image);
     return this.http.post(`${this.productsURL}/updateProductImage`,formData,{headers: new HttpHeaders().set('product-id',productId)})
   }
   
   getProductsByCategories(category){
      return this.http.get(`${this.productsURL}/byCategory/${category}`)
  }

  addCategory(category){
    const obj={
      category_name : category
    }
    const token = sessionStorage.getItem('token')
    return this.http.post(`${this.productsCategoriesURL}/newCategory`,obj,{headers : new HttpHeaders().set('x-auth-token',token)})
  }

  updateCategory(categoryId,categoryName){
    const obj={
      category_name : categoryName
    }
    const token = sessionStorage.getItem('token')
    return this.http.put(`${this.productsCategoriesURL}/updateCategory/${categoryId}`,obj,{headers : new HttpHeaders().set('x-auth-token',token)})
  }

  getProductsByCollection(collection){
    return this.http.get(`${this.productsURL}/byCollection/${collection}`)

  }

  addCollection(collection){
    const obj={
      collection_name : collection
    }
    const token = sessionStorage.getItem('token')
    return this.http.post(`${this.productsCollectionsURL}/newCollection`,obj,{headers : new HttpHeaders().set('x-auth-token',token)})
  }

  updateCollection(collectionId,collectionName){
    const obj={
      collection_name : collectionName
    }
    const token = sessionStorage.getItem('token')
    return this.http.put(`${this.productsCollectionsURL}/updateCollection/${collectionId}`,obj,{headers : new HttpHeaders().set('x-auth-token',token)})
  }


  getProductsByMark(mark){
    return this.http.get(`${this.productsURL}/byMark/${mark}`)

  }

  addMark(mark){
    const obj={
      mark_name : mark
    }
    const token = sessionStorage.getItem('token')
    return this.http.post(`${this.productsMarksURL}/newMark`,obj,{headers : new HttpHeaders().set('x-auth-token',token)})
  }

  updateMark(markId,markName){
    const obj={
      mark_name : markName
    }
    const token = sessionStorage.getItem('token')
    return this.http.put(`${this.productsMarksURL}/updateMark/${markId}`,obj,{headers : new HttpHeaders().set('x-auth-token',token)})
  }

  getProductsBySellers(seller){
    return this.http.get(`${this.productsURL}/bySeller/${seller}`)
  }

  updateProduct(productId,productName,category,collection,mark,price,usedStatus,details,seller){
    const token = sessionStorage.getItem('token')
    const obj = {
      prod_name:productName,
      prod_category: category,
      prod_collection: collection,
      prod_mark: mark,
      prod_seller:seller,
      details: details,
      price: price,
      usedStatus: usedStatus
    }
    // console.log('MY object '+JSON.stringify(obj))
    return this.http.put(`${this.productsURL}/updateProduct/${productId}`,obj,{headers: new HttpHeaders().set('x-auth-token',token)})
  }

  addSeller(sellerId,sellerName,email,watsapp,contact,country,district,sector,town){
    const obj={
       userId: sellerId,
      seller_name: sellerName,
      seller_watsapp_phone: watsapp,
      seller_contact_phone: contact,
      seller_country: country,
      seller_district: district,
      seller_sector: sector,
      seller_email: email,
      seller_town: town
    }
    const token = sessionStorage.getItem('token')
    return this.http.post(`${this.productsSellersURL}/newSeller`,obj,{headers: new HttpHeaders().set('x-auth-token',token)}) 
  }
  updateSeller(sellerId,sellerName,email,watsapp,contact,country,district,sector,town){
    const obj={
      seller_name: sellerName,
      seller_watsapp_phone: watsapp,
      seller_contact_phone: contact,
      seller_country: country,
      seller_district: district,
      seller_sector: sector,
      seller_email: email,
      seller_town: town
    }
  const token = sessionStorage.getItem('token')
  return this.http.put(`${this.productsSellersURL}/updateSeller/${sellerId}`,obj,{headers: new HttpHeaders().set('x-auth-token',token)})  
  }

  delteProduct(productId){
    const token = sessionStorage.getItem('token');
    return this.http.delete(`${this.productsURL}/removeProduct/${productId}`,{headers: new HttpHeaders().set('x-auth-token',token)})
  }

  delteCategory(categoryId){
    const token = sessionStorage.getItem('token');
    return this.http.delete(`${this.productsCategoriesURL}/removeCategory/${categoryId}`,{headers: new HttpHeaders().set('x-auth-token',token)})
  }

  deleteCollection(collectionId){
    const token = sessionStorage.getItem('token');
    return this.http.delete(`${this.productsCollectionsURL}/removeCollection/${collectionId}`,{headers: new HttpHeaders().set('x-auth-token',token)})
  }

  deleteMark(markId){
    const token = sessionStorage.getItem('token');
    return this.http.delete(`${this.productsMarksURL}/removeMark/${markId}`,{headers: new HttpHeaders().set('x-auth-token',token)})
  }

  deleteSeller(sellerId){
    const token = sessionStorage.getItem('token');
    return this.http.delete(`${this.productsSellersURL}/removeSeller/${sellerId}`,{headers: new HttpHeaders().set('x-auth-token',token)})
  }

 rateProduct(productId){
   const body={
     productId: productId
   }
   return this.http.post(`${this.productsRatesURL}/rate`,body)
 }

 unrateProduct(productId){
  const body={
    productId: productId
  }
 
  return this.http.post(`${this.productsRatesURL}/unrate`,body)
 }
 getProductRates(productId){
  return this.http.get(`${this.productsRatesURL}/rates/${productId}`)
}

getRelatedCollectionProducts(productId){
   return this.http.get(`${this.productsURL}/relatedCollectionProducts/${productId}`)
}
addToCart(userId,product,quantity,date,time){
  
   const token = sessionStorage.getItem('token');
   const body={
        customer: userId,
        product: product,
        quantity: quantity,
        date: date,
        time: time
      }
       return this.http.post(`${this.shoppingCartURL}/addProduct`,body,{headers: new HttpHeaders().set('x-auth-token',token)})

}

getCart(userId){
  return this.http.get(`${this.shoppingCartURL}/customerCart/${userId}`)
}

updateProductQuantityInCart(customer,product,quantity){
  const body = {
    customer: customer,
    product: product,
    quantity: quantity
  }
  const token = sessionStorage.getItem('token');
  return this.http.put(`${this.shoppingCartURL}/updateQuantity`,body,{headers: new HttpHeaders().set('x-auth-token',token)})
}

removeProductFromCart(customerId,productId){
  const token = sessionStorage.getItem('token')
  return this.http.delete(`${this.shoppingCartURL}/removeFormCart/${customerId}/${productId}`,{headers: new HttpHeaders().set('x-auth-token',token)})
}


}
