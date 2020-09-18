import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  basket: any;
  basket2: any;
  token: any;
  number: any;
  savebasket: any;

  constructor(private http: HttpClient,) { }
  theme: any;
  set(token){
    this.token = token
    sessionStorage.setItem('token', this.token);
  }
getBasket(){
  const token = sessionStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  this.http
  .get(`https://api.mediehuset.net/stringsonline/cart`, { headers })
  .subscribe(data => {
    this.basket = data;
    if(this.basket.status === true ){
      this.number = this.basket.cartlines.length;
      sessionStorage.setItem('number', this.number)
    }
    else{
      this.number = '';
      sessionStorage.setItem('number', this.number)
    }
  });
}
saveBasket(){
  const token = sessionStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  this.http
  .get(`https://api.mediehuset.net/stringsonline/cart`, { headers })
  .subscribe(data => {
    this.basket2 = data;
    if(this.basket.status === true ){
      this.savebasket = this.basket2;
      console.log(this.savebasket)
    }
  });
}
}
