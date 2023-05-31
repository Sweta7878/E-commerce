import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {
  orderData:order[]|undefined;

  constructor(private productService:ProductService){}

  ngOnInit(): void {
    this.getOrderList();
  }
cancelOrder(orderId:number|undefined){
  orderId && this.productService.cancelOrder(orderId).subscribe((res)=>{
    this.getOrderList();
  })
}
getOrderList(){
  this.productService.orderList().subscribe((res)=>{
    this.orderData=res;
    })
}
}
