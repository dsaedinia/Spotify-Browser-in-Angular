import { Component } from '@angular/core';
import { PredictionEvent } from './prediction-event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  gesture:string;
  image:string;
  constructor() {
    this.image = "../../../assets/spotifylogo.png";
  }

  public goHome()
  {
    document.getElementById("browse").click();
  }

  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();
  }

  public goSpotify()
  {
    document.getElementById("spotify_button").click();
  }
}
