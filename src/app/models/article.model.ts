export class Article {
  constructor(public title: string,
              public content: string,
              public topic: string,
              public excerpt: string,
              public tags: string[],
              public author?: string,
              public postDate?: string,
              public _id?: string,
              public revisedDate?: string) {
  }
}
