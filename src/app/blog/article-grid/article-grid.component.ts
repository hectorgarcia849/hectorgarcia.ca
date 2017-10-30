import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-grid',
  templateUrl: './article-grid.component.html',
  styleUrls: ['./article-grid.component.css']
})
export class ArticleGridComponent implements OnInit {

  topics = ['Agile Development', 'Angular Framework', 'Data Science']

  constructor() { }

  ngOnInit() {
  }

}
