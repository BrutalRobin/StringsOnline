import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-tak',
  templateUrl: './tak.component.html',
  styleUrls: ['./tak.component.scss']
})
export class TakComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,){

  }
  basket: any;
  token: any;

 ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  const token = sessionStorage.getItem('token');
  console.log(token);
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  this.http.get(`https://api.mediehuset.net/stringsonline/orders/${id}`, { headers }).subscribe((res: any) => {
    console.log(res);
    if (res.status === true) {
        console.log(res);
        this.basket = res;
        console.log(this.basket)

    }
  });
  }

}
