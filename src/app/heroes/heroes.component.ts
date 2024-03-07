import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from 'app/services/hero.service';
import { OnInit } from '@angular/core';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    let tempHeroes: any;

    this.heroService.getHeroes()
      .subscribe(heroes => tempHeroes = heroes);
  }
}
