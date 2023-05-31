import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { faCoffee, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{
productList:undefined|product[];
deleteMessage:string|undefined
deleteIcon=faTrash;
updateIcon=faEdit;

constructor(private product:ProductService){


}

  ngOnInit(): void {
 this.addProductList()
  }

    addProductList(){
    this.product.productList().subscribe((res)=>{
    console.log(res);
    this.productList=res;
  })
}

  deleteProduct(id:number){
    console.log("test id",id);
    this.product.deleteProduct(id).subscribe((res)=>{
if(res){
this.deleteMessage="product  is deleted";
this.addProductList()
}
    })
    setTimeout(() => {
      this.deleteMessage=undefined
    }, 3000);
      }
}
