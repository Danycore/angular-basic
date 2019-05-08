import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-now',
  templateUrl: './now.component.html',
  styles: []
})
export class NowComponent implements OnInit {

  public now = new Date();

  constructor() { }

  ngOnInit() {
  }

}
