import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.css']
})
export class CarouselCardComponent implements OnInit {
  @Input() resource:ResourceData;
  name:string;
  category:string;
  id:string;
  imageURL:string;
  url:string;
  expressBaseUrl:string = 'http://localhost:8888';

  constructor() { }

  ngOnInit() {
    this.name = this.resource.name;
    this.category = this.resource.category;
    this.id = this.resource.id;
    this.imageURL = this.resource.imageURL;
    
    if(this.category == 'artist')
    {
      this.url = 'artist/' + this.id; 
    }
    else if(this.category == 'album')
    {
      this.url = 'album/' + this.id; 
    }
    /////tracks separate 
  }

}
