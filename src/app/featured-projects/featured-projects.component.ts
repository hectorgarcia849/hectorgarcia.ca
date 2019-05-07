import { Component, OnInit } from '@angular/core';
import * as Identicon from 'identicon.js/identicon.js';

// declare var Identicon: any;

@Component({
  selector: 'app-featured-articles',
  templateUrl: './featured-projects.component.html',
  styleUrls: ['./featured-projects.component.css']
})
export class FeaturedArticlesComponent implements OnInit {
  img;
  constructor() { }

  ngOnInit() {
    const data = new Identicon('d3b07384d113edec49eaa6238ad5ff00', 420).toString();
    // console.log(data);
    this.img = `data:image/png;base64,${data}`;
  }
}
