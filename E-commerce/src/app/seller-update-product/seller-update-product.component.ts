import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit{
  productData: undefined | product;
  updateMsg:string|undefined;

constructor(private route : ActivatedRoute, private service:ProductService){}

  ngOnInit(): void {
    let productId=this.route.snapshot.paramMap.get('id');
    console.warn(productId)
   productId && 
    this.service.getProduct(productId).subscribe((res)=>{
    console.warn(res);
      this.productData = res;
    });
    
  }

  submit(data:product){
    console.log(data);
    if(this.productData){
      data.id=this.productData.id
    }
    this.service.updatePro(data).subscribe((res)=>{
      if(res){
        this.updateMsg="Product has been updated"
      }
    })
    
    setTimeout(()=>{
      this.updateMsg=undefined
    }, 3000)
  }
}
