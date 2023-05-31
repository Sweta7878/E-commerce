import { Component } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  addProductMessage:string|undefined
  constructor(private service:ProductService,private route:Router){}
  submit(data:product){
//console.log(data)
this.addProductMessage=''
this.service.addProduct(data).subscribe((res:any)=>{
  console.log(res);
  if(res){
    this.addProductMessage="product is sucessful added";
    this.route.navigate(['/seller-home'])
  }
 setTimeout(()=>this.addProductMessage=undefined,3000) ;

})

  }
  
}
