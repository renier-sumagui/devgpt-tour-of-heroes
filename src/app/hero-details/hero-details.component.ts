import { Input, Component } from '@angular/core';
import { Hero } from 'app/hero';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { HeroService } from 'app/services/hero.service';
import { OnInit } from '@angular/core';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.scss'
})
export class HeroDetailsComponent implements OnInit {
  hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    // this.getHero();
    let id = Number(this.route.snapshot.paramMap.get("id"));
    this.heroService.getHero(id)
      .subscribe(response => {
        if (response.success) {
          this.messageService.add(response.message);
          this.hero = response.data.hero;
        } else {
          this.messageService.add(response.message);
        }
      })
  }

  getHero() {
    let id = Number(this.route.snapshot.paramMap.get("id"));
    this.heroService.getHero(id)
      .subscribe(response => {
        console.log("RESPONSE", response);
      });
  }

  goBack() {
    this.location.back();
  }
}
