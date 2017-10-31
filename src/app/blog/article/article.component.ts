import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Article} from '../../models/article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() article: Article;
  constructor() { }

  ngOnInit() {
  }

  displayDate(date: string) {
    return moment(date).format('MMMM Do YYYY, h:mm a');
  }

}
