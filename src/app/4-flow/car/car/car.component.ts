import { Component, OnInit } from '@angular/core';
import { CarModel } from './models/car.model';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styles: []
})
export class CarComponent implements OnInit {
  public car: CarModel;

  constructor() {}

  public ngOnInit() {
    this.car = { name: 'Roadster', maxSpeed: 120, currentSpeed: 0 };
  }

  public onBrake(drive: number) {
    this.car.currentSpeed -= this.getDelta(drive);
    if (this.car.currentSpeed < 0) this.car.currentSpeed = 0;
  }

  public onThrottle(drive: number) {
    if (this.car.currentSpeed < this.car.maxSpeed) {
      this.car.currentSpeed += this.getDelta(drive);
    }
  }

  private getDelta(drive: number) {
    return drive + (this.car.maxSpeed - this.car.currentSpeed) / 10;
  }
}
