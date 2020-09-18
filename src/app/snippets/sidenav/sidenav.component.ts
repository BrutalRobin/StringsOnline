import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private http: HttpClient) { }
  navlinks: any;
  brands: any;

  ngOnInit(): void {
    this.http
    .get(`https://api.mediehuset.net/stringsonline/productgroups`)
    .subscribe(data => {
      this.navlinks = data;
    });
    this.http
    .get(`https://api.mediehuset.net/stringsonline/brands`)
    .subscribe(data => {
      this.brands = data;
    });
  }
}
