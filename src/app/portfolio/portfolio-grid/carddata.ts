import {Card} from '../../models/card.model';
const path = '../../../assets/cardImages/';

const h4w = new Card(
  'aHateForWalls',
  'Native Mobile Application',
  `${path}aHateForWalls.png`,
  'A native iOS application based on the atari game \'Break out.\'  ' +
  'This game demonstrates my capacity to build an application from beginning to end using correct software engineering principles.',
  ['objective-c', 'iOS10', 'Advanced Software Design Patterns'],
  'https://github.com/hectorgarcia849/aHateForWalls',
  'https://itunes.apple.com/us/app/ahateforwalls/id1260196755',
  false
);

const wg = new Card(
  'Weather Guardian',
  'Responsive Single Page Application',
  `${path}weatherGuardian.png`,
  'This single page responsive application was built on Angular 4 on the frond-end and node.js with express in the back-end.  It implements a leaflet map that allows the user to select a location or enter one.  If the user selects a position on the map, the coordinates are sent to the backend and is used to retrieve weather data.  Alternatively, if the user enters a location, a reverse geocode request is made through the server, this retrieves coordinates for the specified location, then uses the returned coordinates to make a request for weather data.  The application also allows the user to dynamically add/remove charts to the page, creating a customizable experience. ',
  ['Angular 4', 'Node.js', 'Express', 'TypeScript ES6', 'JavaScript ES6', 'rxjs', 'NGX-Charts', 'REST API'],
  'https://github.com/hectorgarcia849/ng-weather-app',
  'https://weatherguardian.herokuapp.com/',
  false
);

const untrackedchat = new Card(
  'Untracked Chat',
  'Chat Web Application',
  `${path}untrackedChat.png`,
  'A chat application built using JavaScript ES6, node.js and express.  This application allows the user to select a username and create a room.  Users can send messages via sockets.',
  ['JavaScript ES6', 'Node.js', 'Express', 'Socket.io'],
  'https://github.com/hectorgarcia849/node-course-2-chat-app',
  'https://untrackedchat.herokuapp.com/',
  false
);

const pigeonIonic = new Card(
  'Pigeon Mobile Application',
  'Hybrid Mobile Application',
  `${path}pigeonIonic.png`,
  'A hybrid mobile application that uses the ionic framework.  The purpose of this application is to provide a social networking platform missed connections.  It allows users to send pigeons describing an encounter for the entire network to see and chat with follow users.',
  ['Ionic', 'TypeScript ES6', 'Node.js', 'RESTful client', 'Socket.io client', 'Websockets'],
  'https://github.com/hectorgarcia849/pigeon',
  '',
  false
);

const pigeonExpress = new Card(
  'Pigeon RESTful Services',
  'Node.js RESTful Services',
  `${path}pigeonIonic.png`,
  'A RESTful API built with node.js and express.  This server manages pigeons, sends real-time feeds and uses the mongoose api to manage a mongoDB database.  It creates and manages user identities, profiles and generates json web tokens for authentication.',
  ['Node.js', 'Express','JavaScript ES6', 'RESTful server', 'MongoDB', 'Mongoose'],
  'https://github.com/hectorgarcia849/pigeon-node',
  '',
  false

);
const pigeonSocket = new Card(
  'Pigeon Socket Server',
  'Node.js Websocket Server',
  `${path}pigeonIonic.png`,
  'A Node.js server that utilizes Socket.io to manage chat service.  It sends real-time messages between users through an open connection known as a websocket.  This server authenticates users via json web tokens and manages socket events.',
  ['Node.js', 'Socket.io', 'JavaScript ES6', 'MongoDB', 'Mongoose'],
  '',
  '',
  false
);

const geocoupons = new Card(
  'Geocoupons iOS',
  'Native Mobile Application',
  `${path}geocoupons`,
  'This application uses georegions to activate notifications when a user is within a 10 metre proximity of a location. The notification offers a coupon for a hypothetical store. The application offers the coupon whether application is in the foreground or in the background.',
  ['objective-c', 'iOS10', 'Location Services'],
  'https://github.com/hectorgarcia849/iOS-Geocoupons',
  '',
  false
);

const share = new Card(
  'Social Media Share',
  'Native Mobile Application',
  `${path}socialmedia`,
  'This application was developed as part of a course. It uses the social networking services to share messages through Twitter and Facebook. This is a highly secure way to share information while maintaining user privacy. The application never requires the user\'s password or login name.',
  ['objective-c', 'iOS10', 'Social Framework'],
  'https://github.com/hectorgarcia849/iOS-Share_With_SocialFramework',
  '',
  false
  );

const titanic = new Card(
  'Titanic Challenge',
  'Machine Learning',
  `${path}titanic.jpg`,
  'Command line program in python that verbosely trains machine learning algorithms to predict who will survive the titanic given only the passenger list.',
  ['Python', 'Scikit-Learn', 'NumPy'],
  'https://github.com/hectorgarcia849/titanicchallenge',
  '',
  false
);

const hectorgarcia = new Card(
  'HectorGarcia.ca',
  'Single Page Application',
  `https://image.ibb.co/fpvECG/hg_welcome_pg.png" alt="hg_welcome_pg`,
  'Single Page Application ',
  ['Angular 4', 'Node.js', 'Express', 'TypeScript ES6', 'JavaScript ES6', 'rxjs', 'REST API'],
  'https://github.com/hectorgarcia849/hectorgarcia.ca',
  'https://hectorgarcia.ca',
  false
);

export const cardData = [h4w, wg, untrackedchat, pigeonIonic, pigeonExpress, pigeonSocket, hectorgarcia, titanic];
