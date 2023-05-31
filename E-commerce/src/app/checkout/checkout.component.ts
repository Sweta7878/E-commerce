import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';

export interface orderesData{
  email:string,
  address:string,
  contact:string
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
totalPrice:number|undefined;
cartData:cart[]|undefined;
orderMsg:string=''
  constructor(private productService:ProductService,private route:Router){}
  ngOnInit(): void {
    this.productService.currentCart().subscribe((res)=>{
      //  console.log(res);
     // this.cartData=res;
      let price=0;
      this.cartData=res;
      res.forEach((item)=>{
        if(item.quantity){
          price=price + (+item.price* +item.quantity);
        }
      });
     this.totalPrice=price+(price/10)+100-(price/10);;
     console.warn(this.totalPrice)
      })
  }
  orderNow(data:orderesData){
//console.warn(data);
let user=localStorage.getItem('user');
      let userId= user && JSON.parse(user).id;
      if(this.totalPrice){
let orderedData:order={
  ...data,
  totalPrice:this.totalPrice,
  userId,
  id:undefined
}
this.cartData?.forEach((item)=>{
  setTimeout(() => {
    item.id && this.productService.deleteCartItem(item.id)
  }, 700);
 
})
this.productService.orders(orderedData).subscribe((res)=>{
  if(res){
    // alert("order Placed");
    this.orderMsg="your order has been Placed"
    setTimeout(()=>{
      this.route.navigate(['/my-order']);
      this.orderMsg=''
    },4000)
  }
})
      }
      
  }
}
