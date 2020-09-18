import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  basket: any;
  number: any;
  public searchedValue: string;
  constructor(
    private basketservice: BasketService,
    private route: ActivatedRoute,
    private router: Router,) {
    this.basket = this.basketservice.basket;
  }

  ngOnInit(): void {
    this.number = sessionStorage.getItem('number');
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.basketservice.getBasket();
        this.number = sessionStorage.getItem('number');
      }
    })
  }

}
