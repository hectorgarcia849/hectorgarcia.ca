export class Article {
  constructor(public title: string,
              public content: string,
              public description: string,
              public postDate: string,
              public author: string,
              public excerpt: string,
              public tags: string[]) {
  }
}
