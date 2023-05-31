import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartDataEvent = new EventEmitter<product[] | []>();
 
  constructor(private http:HttpClient) { }
  addProduct(data:product){
return this.http.post('http://localhost:3000/product',data)
  }
  productList(){
    return this.http.get<product[]>('http://localhost:3000/product')
  }
deleteProduct(id:number){
  return this.http.delete(`http://localhost:3000/product/${id}`)
}
 getProduct(id:string){
  return this.http.get<product>(`http://localhost:3000/product/${id}`) 
 }
 updatePro(product:product){
return this.http.put<product>(`http://localhost:3000/product/${product.id}`,product)
 }
 productAtHome(){
  return this.http.get<product[]>('http://localhost:3000/product?_limit=3')
 }
 trendyProduct(){
  return this.http.get<product[]>('http://localhost:3000/product')
}
searchProduct(query:string){
  return this.http.get<product[]>(`http://localhost:3000/product?q=${query}`)
}
localAddToCart(data:product){
  let cartData = [];
  let localCart = localStorage.getItem('localCart');
  if(!localCart){
    localStorage.setItem('localCart',JSON.stringify([data]));
    //first time cart ma kai value add krie to header ma changes nai btavta
    this.cartDataEvent.emit([data])//logout krya p6i add to cart krvathi localstorage mato aave 6 pn header ma cart(0)  j btave 6 anne refresh krya p6i j btave etle 
  }
  else{
      console.log('else')
      cartData=JSON.parse(localCart);
      cartData.push(data);
    localStorage.setItem('localCart',JSON.stringify(cartData));
     }
     this.cartDataEvent.emit(cartData);
}
removeFromCart(productId:number){
  let localCart = localStorage.getItem('localCart');
  if(localCart){
  let items:product[]=JSON.parse(localCart);
  items=items.filter((res:product)=>productId !== res.id)
   // console.log(items);
  localStorage.setItem('localCart',JSON.stringify(items));
  this.cartDataEvent.emit(items) 
}
}
     addProductInCart(data:cart){
   return this.http.post('http://localhost:3000/cart',data)
    }

    getCartListaccordingUserId(userId:number){
  return this.http.get<product[]>('http://localhost:3000/cart?userId='+userId,
  {observe:'response'}).subscribe((res)=>{
    //console.log(res);
    if(res && res.body){
this.cartDataEvent.emit(res.body);
    }
  })
    }

    removeToCartusingAPI(cartId:number){
return this.http.delete('http://localhost:3000/cart/'+cartId);
    }

    currentCart(){
      let userStore=localStorage.getItem('user');
      let userData= userStore && JSON.parse(userStore);
      return this.http.get<cart[]>('http://localhost:3000/cart?userId='+userData.id)
    }

    orders(data:order){
     return this.http.post('http://localhost:3000/orders',data)     
    }
    orderList(){
      let userStore=localStorage.getItem('user');
      let userData= userStore && JSON.parse(userStore);
     return this.http.get<order[]>('http://localhost:3000/orders?userId='+userData.id)

    }
    deleteCartItem(cartId:number){
      return this.http.delete('http://localhost:3000/cart/'+cartId,{observe:'response'}).subscribe((res)=>{
        if(res){
          this.cartDataEvent.emit([])
        }
      })

    }
    cancelOrder(orderId:number){
return this.http.delete('http://localhost:3000/orders/'+orderId);
    }
}
