export class Card {
  constructor(public title: string,
              public subtitle: string,
              public imagePath: string,
              public description: string,
              public techStack: string[],
              public githubURL: string,
              public website: string,
              public isHovering = false) {
  }
}
