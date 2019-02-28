import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styles: []
})
export class DisplayComponent implements OnInit {
  @Input() public model: string;
  @Input() public currentSpeed: number;
  @Input() public topSpeed: number;
  @Input() public units: string;

  private readonly factor = 0.8;

  constructor() {}

  ngOnInit() {}

  public getSpeedClass = () => (this.currentSpeed < this.getThreshold() ? 'primary' : 'secondary');

  private getThreshold = () => this.topSpeed * this.factor;
}
