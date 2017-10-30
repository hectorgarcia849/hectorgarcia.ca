import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  logoNames = ['angular', 'ionic', 'ts', 'javascript', 'nodejs', 'express', 'mongodb', 'socket-io', 'python', 'c-lang', 'java', 'r'];
  logoPaths: string[] = [];
  constructor() {
  }

  ngOnInit() {
    this.buildSVGPaths();
  }

  buildSVGPaths(): string[] {
    for (const logoName of this.logoNames) {
      this.logoPaths.push(`../../assets/svg/logos/${logoName}.svg`);
    }
    return this.logoPaths;
  }

}
