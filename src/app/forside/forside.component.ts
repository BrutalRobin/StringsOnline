import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-forside',
  templateUrl: './forside.component.html',
  styleUrls: ['./forside.component.scss']
})
export class ForsideComponent implements OnInit {
  products: any;
  produktarray: any;
  descriptionvar: any;
  token: any;
  added: any;

  constructor(
    private http: HttpClient,
    private basketservice: BasketService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    this.basketservice.getBasket();
    const group = this.route.snapshot.paramMap.get('group');
    const subgroup = this.route.snapshot.paramMap.get('subgroup');
    this.http
    .get(`https://api.mediehuset.net/stringsonline/groups/1/subgroup/2`)
    .subscribe(data => {
      this.products = data;
      this.produktarray = this.products.items.subgroup.products
      this.sort();
      console.log(this.produktarray)
    });
  }
  addToBasket(id){
    const formData: any = new FormData();
    formData.append('product_id', id);
    formData.append('quantity', 1);
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post(`https://api.mediehuset.net/stringsonline/cart`, formData, { headers }).subscribe((res: any) => {
      console.log(res);
      if (res.status === true) {
          console.log(res.status);
          this.basketservice.getBasket();
          this.added = id;
      }
    });
  }
  readlong(id){
    this.descriptionvar = id;
  }
  readless(){
    this.descriptionvar = '';
  }
  setWidth(id){
    let width = document.getElementById(`price${id}`).offsetWidth;
    return width + 'px';
  }
  sort(){
    this.produktarray = this.produktarray.sort((low, high) => high.rating - low.rating);
    console.log(this.produktarray);
    return this.produktarray;
  }

  }
