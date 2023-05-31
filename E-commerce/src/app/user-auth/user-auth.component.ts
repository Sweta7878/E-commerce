import { Component, OnInit } from '@angular/core';
import { cart, product, userLogin, userSignUp } from '../data-type';
import { UsersService } from '../services/users.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{
  showLogin:boolean=true;
  isAuthError:string="";
 
  constructor(private service:UsersService,private productService:ProductService){}

  ngOnInit(): void { 
    this.service.userAuthReload()
  }

  signUp(data:userSignUp){
  //  console.log(data)
  this.service.userSignUp(data);
  }
  Login(data:userLogin){
this.service.userLogin(data);
this.service.isLoggedin.subscribe((res)=>{
  console.log("output",res)
  if(!res){
    this.isAuthError="email Or password is incorrect"
  }else{
    //jevu user login krse evo direct data je localstorage ma add thto hto e cart ma add krva mate
  this.localCartToDBcart()
  }
})
  }
  openSignup()
  {
  this.showLogin=false
  }
  openLogin(){
    this.showLogin=true
  }
  localCartToDBcart(){
let data=localStorage.getItem('localCart');
let user=localStorage.getItem('user');
let userId=user && JSON.parse(user).id;

if(data){
  let cartDataList:product[]= JSON.parse(data);
  cartDataList.forEach((element:product,index)=>{
  let cartData:cart={
  ...element,
  productId:element.id,
  userId
};
delete cartData.id
//;//kemk cart ma id automatic aavse jevi api call thse to rakhvani jrur nai
setTimeout(()=>{
  this.productService.addProductInCart(cartData).subscribe((res)=>{
    if(res){
      console.warn("item stored in DB");
    }
    })   
},500);
if(cartDataList.length === index+1){
  localStorage.removeItem('localCart');
}
})
}
setTimeout(()=>{
  this.productService.getCartListaccordingUserId(userId);
},1000)
  }
}
