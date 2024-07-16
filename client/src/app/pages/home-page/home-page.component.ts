import { Component, OnInit } from '@angular/core';
import { HandtrackerComponent } from '../handtracker/handtracker.component';
import { PredictionEvent } from 'src/app/prediction-event';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  gesture: String = "";
  constructor() { }

  ngOnInit() {
  }


  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();
  }

  
}
