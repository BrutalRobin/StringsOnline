import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { BasketService } from '../services/basket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-varekurv',
  templateUrl: './varekurv.component.html',
  styleUrls: ['./varekurv.component.scss']
})
export class VarekurvComponent implements OnInit {
  token: any;
  basket: any;
  number: any;
  prices: any;
  total: any;
  koebForm: FormGroup;
  pay: any;
  items: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private basketservice: BasketService,
    private fb: FormBuilder) { }

  async ngOnInit() {
    this.token = sessionStorage.getItem('token');
    console.log(this.token)
    if (this.token !== null){
      console.log('login')
      this.basketservice.getBasket();
      this.pay = '1';
      const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
      await sleep(1000);
      this.basket = this.basketservice.basket;
      this.prices = this.basket.cartlines
      console.log(this.basket.status)
    }
  }

  setPrice(antal, pris){
    let price = pris * antal;
    return 'DKK:' + ' ' + price;
  }
  async deleteFromBasket(id){
    const token = sessionStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.delete(`https://api.mediehuset.net/stringsonline/cart/${id}`, { headers }).subscribe((res: any) => {
      console.log(res);
      if (res.status === true) {
          console.log(res.status);
          this.basketservice.getBasket();
      }
    });
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
    await sleep(1000);
    this.basket = this.basketservice.basket
  }

  async updateBasket(option, id, product_id: string, antal: string){
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))};
    switch (option) {
      case 'minus':
        {
          if (antal == '1'){
            const token = sessionStorage.getItem('token');
            console.log(token);
            const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
            this.http.delete(`https://api.mediehuset.net/stringsonline/cart/${product_id}`, { headers }).subscribe((res: any) => {
              console.log(res);
              if (res.status === true) {
                  console.log(res.status);
                  this.basketservice.getBasket();
              }
            });

          }
          else{
            let stringToConvert = antal;
            let numberValue = Number(stringToConvert);
            this.number = numberValue - 1;
          }
          break;
        }
        case 'plus':
          {
            let stringToConvert = antal;
            let numberValue = Number(stringToConvert);
            this.number = numberValue + 1;
            console.log(this.number)
            break;
          }
    }
    await sleep(500);
    const token = sessionStorage.getItem('token');
    let value = this.number
    let body = {
      product_id,
      field: 'quantity',
      value
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.patch(`https://api.mediehuset.net/stringsonline/cart`, body, { headers }).subscribe((res: any) => {
      console.log(res);
      if (res.status === true) {
          console.log(res.status);
          this.basketservice.getBasket();
      }
    });
    await sleep(500);
    this.basket = this.basketservice.basket
  }

  totalPrice(){
  this.total = 0;
  this.items = [];
  let cart = this.basket.cartlines;
  for (var i = 0; i < cart.length; i++) {
    let item = cart[i];
    this.items.push({
      product: item.product,
      quantity: item.quantity,
      offerprice: item.offerprice
    });
    if (item.offerprice === '0.00'){
      this.total += item.price * item.quantity;
    }
    else{
      this.total += item.offerprice * item.quantity;
    }
  }
  console.log(this.total)
  return `Beløb DKK  `  + this.total + ` `;
}

async rydKurv(){
  const token = sessionStorage.getItem('token');
  console.log(token);
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  this.http.delete(`https://api.mediehuset.net/stringsonline/cart`, { headers }).subscribe((res: any) => {
    console.log(res);
    if (res.status === true) {
        console.log(res.status);
        this.basketservice.getBasket();
    }
  });
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
  await sleep(1000);
  this.basket = this.basketservice.basket

}
  }


