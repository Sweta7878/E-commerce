import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import {  sellerLogin, sellerSignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
 constructor(private seller:SellerService,private route:Router){}

showLogin:boolean=true;
authError:string='';

  signup(data:sellerSignUp):void{
//console.warn(data);
this.seller.sellerSignUp(data)
//this.seller.userSignUp(data).subscribe((result)=>{
 //console.warn(result)
//  if(result){
// this.route.navigate(['seller-home'])
//  }
}//);
///don't want to redirect direct as user get signup ..we apply auth guard 

ngOnInit():void{
this.seller.reloadSeller()
}
login(data:sellerSignUp):void{
  this.seller.sellerLogin(data);
  this.seller.isLoggin.subscribe((isLogginError)=>{
if(isLogginError){
this.authError="Email or password is not correct"
}
  })
}
openSignup()
{
this.showLogin=false;
}
openLogin(){
  this.showLogin=true;
}
}

