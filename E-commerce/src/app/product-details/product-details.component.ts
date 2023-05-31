import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  productDetails:undefined|product;
   productQuantity:number=1;
   removeCart=false;
   removeCartData :product | undefined;

  constructor(private route:ActivatedRoute,private service:ProductService){}

  ngOnInit(): void {
  let productId = this.route.snapshot.paramMap.get('productid');
  console.warn(productId);
  productId && this.service.getProduct(productId).subscribe((res)=>{
    this.productDetails=res;
    // console.warn(res)
    let cartData=localStorage.getItem('localCart');
    if(productId && cartData){
      let items =JSON.parse(cartData);
      items=items.filter(
        (res:product)=>productId === res.id.toString())
           if(items.length){
            this.removeCart=true;
             }else{
            this.removeCart=false;
             }
    }
    let user=localStorage.getItem('user');
    if(user){//jo user localstorage ma hoy...
      let userId = user && JSON.parse(user).id;
      this.service.getCartListaccordingUserId(userId);

      this.service.cartDataEvent.subscribe((res)=>{
      let item = res.filter((res:product)=>productId?.toString() === res.productId?.toString());
   if(item.length){
  this.removeCartData=item[0];
   this.removeCart=true;
    }
})
    }
  })
  }
  handleQuantity(val:string){
if(this.productQuantity<20 && val==='plus'){
  // this.productQuantity=this.productQuantity+1
  this.productQuantity+=1
}else if(this.productQuantity > 1 && val==='min'){
  this.productQuantity-=1
}
  }
  addToCart(){
    if(this.productDetails){
     this.productDetails.quantity=this.productQuantity ;
     if(!localStorage.getItem('user')){
      console.warn(this.productDetails);
      this.service.localAddToCart(this.productDetails);
      this.removeCart=true
     }
     else{
      // console.log('else')
      let user=localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      // console.warn(userId);
      let cartData:cart={
       ...this.productDetails,
       productId:this.productDetails.id,
       userId
      };
      delete cartData.id,
    //  console.warn(cartData);
   this.service.addProductInCart(cartData).subscribe((res)=>{
  //console.warn(res);
  if(res){
    this.service.getCartListaccordingUserId(userId);
    this.removeCart=true;
//alert('product is added into cart!!!');
  }
});
     }
    }
  }
  
  removeFromCart(productId:number){
    if(!localStorage.getItem('user')){
this.service.removeFromCart(productId);
    }else{
      console.log(this.removeCartData);

     
    
      this.removeCartData && this.service.removeToCartusingAPI(this.removeCartData.id).subscribe((res)=>{
        let user=localStorage.getItem('user');
        let userId=user && JSON.parse(user).id;
        if(res){
          this.service.getCartListaccordingUserId(userId);
        }
      })
   this.removeCart=false;
    }
  }
}
