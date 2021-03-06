import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutRoutingModule} from './about.routing.module';
import {AboutComponent} from './about.component';
import {MyselfComponent} from './myself/myself.component';
import {SkillsComponent} from './skills/skills.component';
import {FactsComponent} from './facts/facts.component';
import {WhymeComponent} from './whyme/whyme.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {SharedModule} from '../shared/shared.module';
import { HighlightsComponent } from './highlights/highlights.component';

@NgModule({
  declarations: [
    AboutComponent,
    MyselfComponent,
    SkillsComponent,
    FactsComponent,
    WhymeComponent,
    HighlightsComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    AngularSvgIconModule,
    SharedModule
  ],
  exports: [
    AboutComponent
  ]
})

export class AboutModule {}
