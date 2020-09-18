import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { BasketService } from '../services/basket.service';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-produktside',
  templateUrl: './produktside.component.html',
  styleUrls: ['./produktside.component.scss']
})
export class ProduktsideComponent implements OnInit {
  produkt: any;
  token: any;
  group: any;
  subgroup: any;
  added: any;
  currentRate: any;
  rated: any;
  readonly: any;
  addednumber: any;
  brands: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private basketservice: BasketService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const group = this.route.snapshot.paramMap.get('group');
    const subgroup = this.route.snapshot.paramMap.get('subgroup');
    this.http
    .get(`https://api.mediehuset.net/stringsonline/products/${id}`)
    .subscribe(data => {
      this.produkt = data;
      this.currentRate = this.produkt.item.rating;
      console.log(this.produkt)
    });
    this.http
    .get(`https://api.mediehuset.net/stringsonline/brands`)
    .subscribe(data => {
      this.brands = data;
      console.log(this.brands)
    });
    this.token = sessionStorage.getItem('token');
    console.log(this.token)
    this.group = group;
    this.subgroup = subgroup;
    this.added = '';
  }
  addToBasket(id, antal){
    const formData: any = new FormData();
    formData.append('product_id', id);
    formData.append('quantity', antal);
    const token = sessionStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post(`https://api.mediehuset.net/stringsonline/cart`, formData, { headers }).subscribe((res: any) => {
      if (res.status === true) {
          console.log(res.status);
          this.added = 1;
          this.basketservice.getBasket();
          this.addednumber = antal;
      }
    });
  }
  setWidth(id){
    let width = document.getElementById(`price${id}`).offsetWidth;
    return width + 'px';
  }

  async sendRating(id){
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
    await sleep(100);

    const formData: any = new FormData();
    formData.append('product_id', id);
    formData.append('num_stars', this.currentRate);
    const token = sessionStorage.getItem('token');
    console.log(this.currentRate);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post(`https://api.mediehuset.net/stringsonline/ratings`, formData, { headers }).subscribe((res: any) => {
      if (res.status === true) {
          console.log(res.status);
          this.rated = 1;
          this.readonly = true;
      }
    });
  }

}
