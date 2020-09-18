import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  brand: any;
  descriptionvar: any;
  token: any;
  added: any;

  constructor(    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private basketservice: BasketService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http
    .get(`https://api.mediehuset.net/stringsonline/brands/${id}`)
    .subscribe(data => {
      this.brand = data;
    });
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        const id = this.route.snapshot.paramMap.get('id');
        this.http
        .get(`https://api.mediehuset.net/stringsonline/brands/${id}`)
        .subscribe(data => {
          this.brand = data;
        });
      }
    })
    this.token = sessionStorage.getItem('token');
  }
  addToBasket(id){
    const formData: any = new FormData();
    formData.append('product_id', id);
    formData.append('quantity', 1);
    const token = sessionStorage.getItem('token');
    console.log(token);
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

}
