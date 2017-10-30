import {trigger, state, style, transition, animate, keyframes, stagger, query} from '@angular/animations';

// export const titleAnimation = trigger('titleAnimation', [
//   state('start', style({transform: 'scale(1)'})),
//   state('end', style({transform: 'scale(1.2)'})),
//   transition('start <=> end',
//     animate('300ms ease-in',
//       keyframes(
//         [
//           style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
//           style({opacity: 1, transform: 'translateY(35px)',  offset: 0.75}),
//           style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
//         ]
//       )
//     )
//   )
// ]);

export const contactAnimation = trigger('contactAnimation', [
  state('enter', style({opacity: 1, transform: 'translateY(-400%)'})),
  state('exit', style({opacity: 0})),
  transition(':enter', [
    style({opacity: 0}),
    animate('600ms ease-in')
  ]),
  transition('enter => exit', [
    style({opacity: 0.1 }),
    animate('600ms ease-out')
  ])
]);



export const navBarAnimation = trigger('navBarAnimation', [
  state('top', style({transform: 'translateY(0)', opacity: 100})),
  state('middle', style({transform: 'translateY(375px)', opacity: 100})),
  state('bottom', style({transform: 'translateY(700px)', opacity: 100})),
  transition('middle <=> top',
    animate('300ms ease-in')),
  transition('middle <=> bottom',
    animate('300ms ease-in')),
  transition('top <=> bottom',
    animate('500ms ease-in')),
]);

export const titleAnimation = trigger('titleAnimation', [
  state('enter', style({opacity: 100})),
  state('exit', style({opacity: 0})),
  transition(':enter', [
    style({opacity: 0}),
    animate('1600ms ease-in')
  ]),
  transition('enter => exit', [
    style({opacity: 100}),
    animate('600ms ease-in')
  ])
]);

export const welcomeAnimation = trigger('welcomeAnimation', [
  state('enter', style({opacity: 100})),
  state('exit', style({opacity: 0})),
  transition(':enter', [
    style({opacity: 0}),
    animate('1600ms ease-in')
  ]),
  transition('enter => exit', [
    style({opacity: 100}),
    animate('600ms ease-in')
  ])
]);

export const gridAnimation = trigger('gridAnimation', [
  // transition('* => *', [
  //   query(':exit', [
  //     stagger(500,
  //       [animate('300ms ease-in', style({opacity: 0}))])
  //     ]
  //   ),
  //   query(':enter', [
  //     style({ opacity: 0 }),
  //     stagger(500, [
  //       animate('0.5s', style({ opacity: 1 }))])]
  //   )
  // ])
]);

