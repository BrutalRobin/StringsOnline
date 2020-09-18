import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-produktliste',
  templateUrl: './produktliste.component.html',
  styleUrls: ['./produktliste.component.scss']
})
export class ProduktlisteComponent implements OnInit {
  products: any;
  descriptionvar: any;
  token: any;
  added: any;
  produktarray: any;
  bla: any;
  unikarray: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private basketservice: BasketService) {
      this.token = this.basketservice.token;
    }

  ngOnInit(): void {
    const group = this.route.snapshot.paramMap.get('group');
    const subgroup = this.route.snapshot.paramMap.get('subgroup');
    this.http
    .get(`https://api.mediehuset.net/stringsonline/groups/${group}/subgroup/${subgroup}`)
    .subscribe(data => {
      this.products = data;
      this.produktarray = this.products.items.subgroup.products;
      console.log(this.produktarray)
    });
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.token = sessionStorage.getItem('token');
        this.basketservice.getBasket();
        const group = this.route.snapshot.paramMap.get('group');
        const subgroup = this.route.snapshot.paramMap.get('subgroup');
        this.http
        .get(`https://api.mediehuset.net/stringsonline/groups/${group}/subgroup/${subgroup}`)
        .subscribe(data => {
          this.products = data;
          this.produktarray = this.products.items.subgroup.products;
        });
      }
    })
    this.token = sessionStorage.getItem('token');
    this.basketservice.getBasket();

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
  sort(event: any) {
    switch (event.target.value) {
      case "low":
        {
          this.produktarray = this.produktarray.sort((low, high) => low.price - high.price);
          break;
        }

      case "high":
        {
          this.produktarray = this.produktarray.sort((low, high) => high.price - low.price);
          break;
        }
        case "low2":
        {
          this.produktarray = this.produktarray.sort((low, high) => low.rating - high.rating);
          break;
        }

      case "high2":
        {
          this.produktarray = this.produktarray.sort((low, high) => high.rating - low.rating);
          break;
        }
      case "a-z":
        {
          this.produktarray = this.produktarray.sort(function (low, high) {
            if (low.name.toLowerCase() < high.name.toLowerCase()) {
              return -1;
            }
            else if (low.name.toLowerCase() > high.name.toLowerCase()) {
              return 1;
            }
            else {
              return 0;
            }
          })
          break;
        }
        case "z-a":
          {
            this.produktarray = this.produktarray.sort(function (low, high) {
              if (low.name.toLowerCase() < high.name.toLowerCase()) {
                return -1;
              }
              else if (low.name.toLowerCase() > high.name.toLowerCase()) {
                return 1;
              }
              else {
                return 0;
              }
            })
            this.produktarray.reverse()
            break;
          }

      default: {
        this.produktarray = this.produktarray.sort((low, high) => low.id - high.id);
        break;
      }

    }
    return this.produktarray;

  }
  async sort2(event: any){
    if (event.target.value === 'All'){
      const group = this.route.snapshot.paramMap.get('group');
      const subgroup = this.route.snapshot.paramMap.get('subgroup');
      this.http
      .get(`https://api.mediehuset.net/stringsonline/groups/${group}/subgroup/${subgroup}`)
      .subscribe(data => {
        this.bla = data;
        this.produktarray = this.bla.items.subgroup.products;
        console.log(this.produktarray)
      });

    }
    else{
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
    const group = this.route.snapshot.paramMap.get('group');
    const subgroup = this.route.snapshot.paramMap.get('subgroup');
    this.http
    .get(`https://api.mediehuset.net/stringsonline/groups/${group}/subgroup/${subgroup}`)
    .subscribe(data => {
      this.bla = data;
      this.produktarray = this.bla.items.subgroup.products;
      console.log(this.produktarray)
    });
    await sleep(200);
    this.produktarray = this.produktarray.filter(function(produkt) {
      return produkt.brand === event.target.value;
    });
  }
  }

}
