import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { Router } from  '@angular/router';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-kasse',
  templateUrl: './kasse.component.html',
  styleUrls: ['./kasse.component.scss']
})
export class KasseComponent implements OnInit {
  koebForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private basketservice: BasketService) {
   }
   token: any;
   name: string = '';
   basket: any;
   id: any;
  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    this.koebForm = this.fb.group({
      fornavn: ['', Validators.required],
      efternavn: ['', Validators.required],
      gade: ['', Validators.required],
      postnr: ['', Validators.required],
      by: ['', Validators.required],
      email: ['', Validators.required],
      tele: ['', Validators.required],
      del_gade: ['', Validators.required],
      del_postnr: ['', Validators.required],
      del_by: ['', Validators.required],
    });
  }
 async onSubmit() {
    const token = sessionStorage.getItem('token');
    const formData: any = new FormData();
    formData.append('firstname', this.koebForm.get('fornavn').value);
    formData.append('lastname', this.koebForm.get('efternavn').value);
    formData.append('address', this.koebForm.get('gade').value);
    formData.append('zipcode', this.koebForm.get('postnr').value);
    formData.append('city', this.koebForm.get('by').value);
    formData.append('email', this.koebForm.get('email').value);
    formData.append('status', 1);
    formData.append('delivery_address', this.koebForm.get('del_gade').value);
    formData.append('delivery_zipcode', this.koebForm.get('del_postnr').value);
    formData.append('delivery_city', this.koebForm.get('del_by').value);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if (this.koebForm.get('fornavn').value !== ''
    && this.koebForm.get('efternavn').value !== ''
    && this.koebForm.get('gade').value !== ''
    && this.koebForm.get('postnr').value !== ''
    && this.koebForm.get('by').value !== ''
    && this.koebForm.get('email').value !== ''
    && this.koebForm.get('del_gade').value !== ''
    && this.koebForm.get('del_postnr').value !== ''
    && this.koebForm.get('del_by').value !== '') {
      this.http.post('https://api.mediehuset.net/stringsonline/orders', formData, { headers }).subscribe(
        (res: any) => {
          if (res.status === true) {
            this.basketservice.basket = null;
            this.id = res.order_id;
            this.getbasket();
        }
        else {
            return;
          }
        },
        error => {
          const err = document.getElementsByTagName('form')[0] as unknown as HTMLElement;
          console.log(err);
          if (!document.getElementsByClassName('error')[0]) {
            err.insertAdjacentHTML('afterbegin', `<p class="error">Der er noget der er gået helt galt!</p>`);
          }
        }
      );
    } else {
      const err = document.getElementsByTagName('form')[0] as unknown as HTMLElement;
      if (!document.getElementsByClassName('error')[0]) {
        err.insertAdjacentHTML('afterbegin', `<p class="error">Du skal lige huske og udfylde felterne!</p>`);
      }
    }
  }
  focus() {
    const errMessage = document.getElementsByClassName('error')[0].remove();
  }
  async getbasket(){
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
    await sleep(1000);
    this.basket = this.basketservice.basket
    this.router.navigate(['/Tak/', this.id]);
  }
  log(){
    console.log(this.basket)
    console.log(this.basketservice.savebasket)
    console.log(this.basketservice.token)
    console.log(this.basketservice.basket)
  }

}
