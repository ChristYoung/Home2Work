import {Injectable} from '@angular/core';

@Injectable()
export class HeroService {

  private _h: string[] = ['ssj', 'tht', 'yfgy', 'dddd'];

  constructor() {
  }

  getHeroes(keyword: string): string[] {
    return this._h.filter(h => h.toLowerCase().includes(keyword.toLowerCase()));
  }
}
