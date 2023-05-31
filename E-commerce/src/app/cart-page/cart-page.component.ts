import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary} from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

cartData:cart[]|undefined;
summary:priceSummary={
  price:0,
  tax:0,
  discount:0,
  delivery:0,
  total:0,
}
  constructor(private productService:ProductService,private route:Router){}
  
  
  ngOnInit(): void {
this.loadDetails();
  }
  checkout(){
this.route.navigate(['/checkout'])
  }
  loadDetails(){
    this.productService.currentCart().subscribe((res)=>{
      //  console.log(res);
      this.cartData=res;
      let price=0;
      res.forEach((item)=>{
        if(item.quantity){
          price=price + (+item.price* +item.quantity);
        }
      });
      this.summary.price=price;
      this.summary.discount=price/10;
      this.summary.tax=price/10;
      this.summary.delivery=100;
      this.summary.total=price+(price/10)+100-(price/10);
      console.log(this.summary);
      if(!this.cartData.length){
this.route.navigate(['/'])
      }
      
      })
  }
  removeFromCart(cartId:number |undefined){
    cartId &&  this.cartData && this.productService.removeToCartusingAPI(cartId).subscribe((res)=>{
      this.loadDetails();
    })
  }
}
