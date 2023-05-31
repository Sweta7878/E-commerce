import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  sellerName:string='no seller';
  menuType:string='';
  searchResult:undefined|product[];
  userName:string=''
  cartItem=0
  constructor(private route:Router,private service:ProductService){}

  ngOnInit(): void {

   this.route.events.subscribe((val:any)=>{
    //console.warn(val.url)
    if(val.url){
   if(localStorage.getItem('seller') && val.url.includes('seller')){
 // console.log("in selller area")  ;
     this.menuType="seller" ;
  if(localStorage.getItem('seller')){
    let sellerStore=localStorage.getItem('seller');
    let sellerData=sellerStore && JSON.parse(sellerStore)[0];
    this.sellerName=sellerData.name;
    }  
}

else if(localStorage.getItem('user') ){
  // if(localStorage.getItem('user') ){
    let userStore=localStorage.getItem('user');
  let userData= userStore && JSON.parse(userStore);
  this.userName=userData.name;
  this.menuType='user';
this.service.getCartListaccordingUserId(userData.id)
//}


    }

    else{
  //console.log("out of  selller area");
  this.menuType="no seller"
}
} 
});
let cartData=localStorage.getItem('localCart');
if(cartData){
  this.cartItem=JSON.parse(cartData).length;
} 
this.service.cartDataEvent.subscribe((res)=>{//this is for without  page-refresh  cart(0) is updated 
  this.cartItem=res.length
})
  }

  redirectTodetails(id:number){
this.route.navigate(['/product-details/'+id])
  }

search(query:KeyboardEvent){
if(query){
  const element=query.target as HTMLInputElement;
  //console.warn(element);
this.service.searchProduct(element.value).subscribe((res)=>{
  if(res.length>5){
    res.length=5
  }
this.searchResult=res
})
}

}
hideSearch(){
  this.searchResult=undefined
}
submitSearch(val:string){
// console.log(val)
this.route.navigate([`/search/${val}`]);
}
  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.service.cartDataEvent.emit([]);//logout thay tyare item 0 krva mate
  }
}
