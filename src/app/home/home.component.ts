import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  images = [
    'Lera_Safonova-0',
    'Lera_Safonova-1',
    'Lera_Safonova-2',
    'Lera_Safonova-3',
    'Lera_Safonova-4',
    'Lera_Safonova-5',
    'Lera_Safonova-6',
    'Lera_Safonova-7',
    'Lera_Safonova-8',
    'Lera_Safonova-9',
    'Lera_Safonova-10',
    'Lera_Safonova-11',
    'Lera_Safonova-12',
    'Lera_Safonova-13',
    'Lera_Safonova-14',
    'Lera_Safonova-15',
    'Lera_Safonova-16',
    'Lera_Safonova-17',
    'Lera_Safonova-18',
    'Lera_Safonova-19',
    'Lera_Safonova-20',
    'Lera_Safonova-21',
    'Lera_Safonova-22',
    'Lera_Safonova-23',
    'Lera_Safonova-24',
    'Lera_Safonova-25'
  ];

  constructor() { }

  ngOnInit() {
    this.images = this.shuffle(this.images);
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

}
