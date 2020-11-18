import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'Tpdds2020 App';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
