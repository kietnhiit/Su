import { Component } from '@angular/core';
import { FooterComponent} from './shared/layout/footer/footer.component';
import { HeaderComponent} from './shared/layout/header/header.component';
import { UserService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'conduit';
  constructor(
    private userService: UserService
  ){}

  ngOnInit() {
    this.userService.init();
  }
}
