import {AfterViewInit, Component, EventEmitter} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {TableComponent} from '../../../shared/libs/lib-angular/components/table/table.component';
import {IColumn} from '../../../shared/libs/lib-angular/interfaces/table.interface';
import {IUser, UserFilter} from '../../../shared/models/user.model';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatSuffix} from '@angular/material/form-field';
import {Observable} from 'rxjs';
import {CustomerFilter} from '../../../shared/models/customer.model';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatTable,
    TableComponent,
    MatIcon,
    MatIconButton,
    MatSuffix
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements AfterViewInit {
  columns: IColumn[] = [
    {
      key: "id",
      title: "Id",
    },
    {
      key: "name",
      title: "Nome",
    },
    {
      key: "email",
      title: "E-mail",
    }
  ];

  filter: UserFilter = new UserFilter();
  form = this.filter.buildForm()

  getDataEmitter: EventEmitter<Observable<any>> = new EventEmitter();

  constructor(protected userService: UserService) {
  }

  ngAfterViewInit() {
    this.getDataEmitter.emit(this.userService.get(this.form.getRawValue() as UserFilter));
  }

  add() {

  }
}
