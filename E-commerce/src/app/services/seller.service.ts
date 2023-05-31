import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sellerLogin, sellerSignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
isSellerLogin = new BehaviorSubject<boolean>(false);//use for go to page on condition base
isLoggin=new EventEmitter<boolean>(false);

constructor(private http:HttpClient,private route:Router) { }


  sellerSignUp(data:sellerSignUp){
    this.http.post('http://localhost:3000/sellers',data,{observe:'response'}).subscribe((res)=>{
    console.warn(res)
    if(res){
     this.isSellerLogin.next(true);
      //login krya p6i vare gdie login na krvu pde etle ek var login kri local storage ma data store kravi devano 
      localStorage.setItem('seller',JSON.stringify(res.body))
      //login thya p6i j seller-home pr redirect thay ..upr path change krvathi nai...
      this.route.navigate(['seller-home']); 
    }
   })
  }

sellerLogin(data:sellerLogin){
  console.log(data);
  this.http.get<sellerSignUp[]>(`http://localhost:3000/sellers?password=${data.password}&email=${data.email}`
  ,{observe:'response'}).subscribe((res)=>{
    console.warn(res)
  if(res && res.body && res.body.length){
    
    localStorage.setItem('seller',JSON.stringify(res.body))
   //login thya p6i j seller-home pr redirect thay ..upr path change krvathi nai...
   this.route.navigate(['seller-home']);
   console.log("user logged in");
  }else{
    console.log("login is failed!");
    this.isLoggin.emit(true)
  }
  })
}




   reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLogin.next(true);
      this.route.navigate(['seller-home']);
    }
   }
}
