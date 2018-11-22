import { Injectable } from '@angular/core';
import { Key } from 'protractor';



@Injectable()
export class ErrorService {
  constructor(
  ) {}

    handleError(err: any) {
      return Object.keys(err).map(key => `${key} ${err[key]}`);
    }
}
