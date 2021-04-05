import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Hero } from '../../services/hero/hero';
import { HeroService } from '../../services/hero/hero.service';

@Component({
  selector: 'second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.less']
})
export class SecondComponent implements OnInit {
  heroes$: Hero;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: HeroService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: ParamMap) => {
        console.log(params);

        this.service.getHeroes()
          .subscribe((data: Hero) => {
            this.heroes$ = {
              data: data.data,
              msg: data.msg,
              ok: data.ok
            };

            setTimeout(() => {
              this.heroes$.msg = '定时变动!';
            }, 3000);
          });
      }
    );

    this.route.queryParams.subscribe(
      (params: ParamMap) => {
        console.log(params);
      }
    );
  }

  jump() {
    this.router.navigate(['child-b'], { relativeTo: this.route });
  }
}
