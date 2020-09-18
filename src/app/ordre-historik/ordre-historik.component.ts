import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { BasketService } from '../services/basket.service';
import * as moment from 'moment';

@Component({
  selector: 'app-ordre-historik',
  templateUrl: './ordre-historik.component.html',
  styleUrls: ['./ordre-historik.component.scss']
})
export class OrdreHistorikComponent implements OnInit {
  token: any;
  orders: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private basketservice: BasketService) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http
    .get(`https://api.mediehuset.net/stringsonline/orders`, { headers })
    .subscribe(data => {
      this.orders = data;
      console.log(this.orders);

    });
  }
  formatTime(time: number) {
    const momentTime = time * 1000;
    moment.locale('da')
    return moment.utc(momentTime).format('LL');
  }
}

