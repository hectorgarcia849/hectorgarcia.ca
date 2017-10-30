/**
 * Created by hecto on 2017-07-22.
 */

export class Slide {
  public caption: string;
  public description: string;
  public imagePath: string;
  constructor(caption: string, description: string, imagePath: string) {
    this.caption = caption;
    this.description = description;
    this.imagePath = imagePath;
  }
}
