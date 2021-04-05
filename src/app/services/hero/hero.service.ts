import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(private http: HttpClient) { }

  getHeroes() {
    return this.http.get<Hero>('http://www.xuebabiji.club/api/common/getIndex?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjE1OTIwMzM0ODg1IiwiZXhwIjoxNjAyMDU2MTI4fQ.VExi7OkHqcpiitTz1ACL96Wpe4cOWMb7B9u6rVg_UAk');
  }
}
