import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kvitering',
  templateUrl: './kvitering.component.html',
  styleUrls: ['./kvitering.component.scss']
})
export class KviteringComponent implements OnInit {
  products: 5;
  constructor() { }

  ngOnInit(): void {
  }

}
