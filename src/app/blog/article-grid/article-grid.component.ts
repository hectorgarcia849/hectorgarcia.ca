import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {craftsmanshipArticles} from './articledata';
import {TabsetComponent} from 'ngx-bootstrap';
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-article-grid',
  templateUrl: './article-grid.component.html',
  styleUrls: ['./article-grid.component.css']
})
export class ArticleGridComponent implements OnInit, AfterViewInit {

  topics = ['software craftsmanship', 'angular framework', 'data science'];
  selectedTopic;
  softwareCraftsmanshipArticles;
  @ViewChild('tabs') tabs: TabsetComponent;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
    this.softwareCraftsmanshipArticles = craftsmanshipArticles;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['topic']) {
        this.setSelectedTopic(params['topic']);
      } else {
        this.setSelectedTopic(this.topics[0]);
      }
    });
  }
  ngAfterViewInit() {
  }
  setSelectedTopic(topic: string) {
    this.selectedTopic = topic;
    const queryParams: Params = Object.assign({}, this.activatedRoute.snapshot.queryParams);
    queryParams['topic'] = topic;
    this.router.navigate(['./articles'], {queryParams});
  }
  isSelectedTopic(topic: string) {
    return this.selectedTopic === topic;
  }
  capitalize(s: string) {
    return s.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  }
}
