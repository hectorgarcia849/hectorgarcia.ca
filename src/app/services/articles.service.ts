
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Article} from '../models/article.model';
import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {ReplaySubject} from 'rxjs/ReplaySubject';

const NOT_FOUND = -1;

@Injectable()

export class ArticlesService {
  private articles: {topic: string, articles: any[]}[] = [];
  private articlesSubject = new ReplaySubject<any>(1);
  public articles$ = this.articlesSubject.asObservable();
  private topics = [];
  private topicsSubject = new ReplaySubject<string[]>(1);
  public topics$ = this.topicsSubject.asObservable();
  private selectedTopicSubject = new Subject<string>();
  private selectedTopic$ = this.selectedTopicSubject.asObservable();
  private selectedTopicSubscription: Subscription;
  private url = 'http://localhost:8100';
  private errorSubject = new Subject<string>();
  public error$ = this.errorSubject.asObservable();

  constructor (private http: HttpClient) {

    // on start-up:
    // 1) gets all topics from server, if no topics exists, return an empty array.
    // 2) onSelectedTopic emitted, tries to get Articles for that topic
    this.getArticleTopicsFromServer()
      .then(
        (topics) => {
          this.pushTopics(topics);
          this.emitTopics();
        });
    this.selectedTopicSubscription = this.selectedTopic$
      .subscribe(async (selectedTopic) => {
        await this.getArticlesByTopicFromServer(selectedTopic);
        this.emitArticles();

      });



    // api
    // clients merely subscribe and wait.  Don't have to worry about anything.
    // topics$
    // articles$
  }

  getArticleTopicsFromServer() {
    return this.http.get(`${this.url}/services/articles/topics`).toPromise()
      .then((topics: string[]) => {
        return topics;
      });
  }

  postArticle(article: Article) {

    /* Sends http post request to server, receives article back if it is successfully added to DB.
      The returned article is used to update this.articles object and emits an update to subscribers. */

    const body = JSON.stringify(article);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const token = JSON.parse(sessionStorage.getItem('token'));

    this.http.post(`${this.url}/services/articles?token=${token}`, body, {headers})
      .subscribe(
        (response: any) => {

          const articleHasNewTopic = this.topics.indexOf(response.article.topic) === NOT_FOUND;

          if (articleHasNewTopic) {
            this.pushTopics([response.article.topic]);
            this.emitTopics();
            this.articles.push({topic: response.article.topic, articles: []});
          }
          this.articles.find((value: {topic: string, articles: any[]}) => value.topic === response.article.topic).articles.push(response.article);
          this.emitArticles();
        },
        (error) => {
          this.emitErrorMessage(error);
        }
      );
  }

  async getArticlesByTopicFromServer(topic: string) {
    //  Only gets articles by topic if an element with the a topic property matches param passed.

    const articlesTopicIndex = this.articles.findIndex((value: {topic: string, articles: any[]}, index, array) => value.topic === topic);
    if (articlesTopicIndex === NOT_FOUND) {
      const articlesByTopic = await this.http.get(`${this.url}/services/articles/by/topic?topic=${topic}`)
        .toPromise()
        .then(
          (articles: any[]) => {
            if (articles.length > 0) {
              return {topic, articles};
            }
          }
        );
      this.articles.push(articlesByTopic);
    }
    return this.articles;
  }

  private emitArticles() {
    this.articlesSubject.next(this.articles);
  }

  private emitTopics() {
    this.topicsSubject.next(this.topics);
  }

  private pushTopics(topics: string[]) {
    topics.forEach((topic) => this.topics.push(topic));
  }

  emitErrorMessage(status: number) {
    if (status === 400) {
      this.errorSubject.next('Unable to post article at this time.  Please make sure all fields are correctly filled.');
    } else if (status === 404) {
      this.errorSubject.next('Unable to connect to server.  Check your internet connection and try again.');
    } else {
      this.errorSubject.next('An unidentified error has occurred.  Please contact the administrator.');
    }
  }

  emitSelectedTopic(topic: string) {
    this.selectedTopicSubject.next(topic);
  }
}
