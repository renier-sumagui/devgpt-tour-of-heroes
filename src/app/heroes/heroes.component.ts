import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from 'app/services/hero.service';
import { MessageService } from 'app/services/message.service';
import { of } from 'rxjs';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroService: jasmine.SpyObj<HeroService>;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(async(() => {
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes']);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      declarations: [ HeroesComponent ],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;

    heroService.getHeroes.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getHeroes on init', () => {
    expect(heroService.getHeroes.calls.any()).toBe(true, 'getHeroes called');
  });

  it('should set heroes property with the items returned from the server', () => {
    const expectedHeroes = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
    heroService.getHeroes.and.returnValue(of(expectedHeroes));
    component.ngOnInit();

    expect(component.heroes.length).toBe(2);
    expect(component.heroes).toEqual(expectedHeroes);
  });
});
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
      .subscribe(heroes => this.heroes = heroes);
  }
}
