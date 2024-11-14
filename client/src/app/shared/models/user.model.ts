import {Abstract} from './abstract.model';
import {FormGroup} from '@angular/forms';

export interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
}

export class UserFilter extends Abstract implements IUser {
  id: number = null;
  email: string = null;
  password: string = null;
  name: string = null;

  buildForm() {
    return new FormGroup({

    })
  }
}
