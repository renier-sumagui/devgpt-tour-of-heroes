import { Injectable } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from "app/services/message.service";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = "api/heroes";

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.clear();
    this.messageService.add("HeroService: fetched heroes");
    return heroes;
  }

  getHero(id: number): Observable<any> {
    let response: any = {
      success: 0,
      message: "",
      data: {}
    }

    let hero = HEROES.find(hero => hero.id === id);

    if (hero) {
      response.data.hero =  hero;
      response.success = 1;
      response.message = "Hero successfully fetched";
    } else {
      response.message = "Hero not found";
    }


    return of(response);
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
