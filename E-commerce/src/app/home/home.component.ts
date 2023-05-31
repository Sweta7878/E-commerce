import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
 


  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProduct : undefined | product[];
  trendyProduct : undefined|product[]
  constructor(private service:ProductService){}



  ngOnInit(): void {
   this.service.productAtHome().subscribe((res)=>{
    //console.log(res);
    this.popularProduct=res;
   });
   this.service.trendyProduct().subscribe((res)=>{
    this.trendyProduct=res
   })
  }

}
