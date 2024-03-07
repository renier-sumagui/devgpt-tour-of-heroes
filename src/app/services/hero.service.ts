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
    return this.http.get<Hero[]>(this.heroesUrl);

    this.messageService.clear();
    this.messageService.add("HeroService: fetched heroes");
    return heroes;
  }

  getHero(id: number): Observable<any> {
    const hero = HEROES.find(h => h.id === id);
    return of(hero ? {
      success: 1,
      message: "Hero successfully fetched",
      data: { hero }
    } : {
      success: 0,
      message: "Hero not found",
      data: {}
    });

  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);






  }
}
