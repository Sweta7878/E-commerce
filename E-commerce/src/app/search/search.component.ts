import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchResults:undefined|product[];
  resultMsg:boolean=true

  constructor(private activeRoute:ActivatedRoute,private service:ProductService){}

  ngOnInit(): void {
  let  query = this.activeRoute.snapshot.paramMap.get('query');
  // console.log(query)
  if(query){
    // this.resultMsg=false;
    this.service.searchProduct(query).subscribe((res)=>{
      this.searchResults=res
    })   
  }
  else{
    this.resultMsg=true
  }
  }

}
