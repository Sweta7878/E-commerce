import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { userLogin, userSignUp } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  isLoggedin=new EventEmitter<boolean>(false);

  constructor(private http:HttpClient,private route:Router ) { }
  userSignUp(user:userSignUp){
  return  this.http.post('http://localhost:3000/users',user,{observe:'response'}).subscribe(res=>{
    console.log(res);
    if(res){
      localStorage.setItem('user',JSON.stringify(res.body));
      this.route.navigate(['/'])
    }
  })
  }
  userLogin(user:userLogin){
 console.log(user);
  this.http.get<userSignUp[]>(`http://localhost:3000/users?password=${user.password}&email=${user.email}`
  ,{observe:'response'}).subscribe((res)=>{
    console.warn(res)
  if(res && res.body && res.body.length){   
    localStorage.setItem('user',JSON.stringify(res.body[0]))
   //login thya p6i j seller-home pr redirect thay ..upr path change krvathi nai...
   this.route.navigate(['/']);
   this.isLoggedin.emit(true)
   console.log("user logged in");
  
}
else{
    console.log("login is failed!");
    this.isLoggedin.emit(false)
  }
  })
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/'])
    }
  }
}
