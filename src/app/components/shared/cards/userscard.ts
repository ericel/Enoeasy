import { 
  Component,
   OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-userscard',
  template: `
 <div class="container-fluid users-box">
  <div class="row gutter-10"> 
    <figure 
          *ngFor="let user of users"
      class="snip1336 shadow-1 col-md-4">
      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg" alt="sample87" />
      <figcaption>
        <img src="{{ user.avatar }}" alt="{{user.name}}" class="profile" />
        <h2>{{user.name}}<span>{{user.job}}</span></h2>
        <p>{{user.bio}}</p>
        <a routerLink="/user/{{ user.uid }}/{{user.name | slugify}}" class="follow">Follow</a>
        <a routerLink="/user/{{ user.uid }}/{{user.name | slugify}}" class="info">More Info</a>
      </figcaption>
    </figure>
</div>
</div>
  `,
  styles: [`
  *:after, *:before {
    content: "";
}

*:after {
    clear: both;
}

.users-box {
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    overflow:hidden;
}
.snip1336 {
  font-family: 'Roboto', Arial, sans-serif;
  position: relative;
  overflow: hidden;
  color: #ffffff;
  text-align: left;
  line-height: 1.4em;
  background-color: #141414;
  border-radius: 4px;
}
@media screen and (max-width: 765px) {
 .snip1336 {
     width: 48%;
    }
}
@media screen and (max-width: 500px) {
 .snip1336 {
     width: 100%;
    }
}
.snip1336:last-child {
    margin-right: 0;
}
.snip1336 * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
}
.snip1336 img {
  max-width: 100%;
  vertical-align: top;
  opacity: 0.85;
}
.snip1336 figcaption {
  width: 100%;
  background-color: #141414;
  padding: 15px;
  position: relative;
}
.snip1336 figcaption:before {
  position: absolute;
  content: '';
  bottom: 100%;
  left: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 55px 0 0 400px;
  border-color: transparent transparent transparent #141414;
}
.snip1336 figcaption a {
  padding: 5px;
  border: 1px solid #ffffff;
  color: #ffffff;
  font-size: 0.7em;
  text-transform: uppercase;
  margin: 10px 0;
  display: inline-block;
  opacity: 0.65;
  width: 47%;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 1px;
}
.snip1336 figcaption a:hover {
  opacity: 1;
}
.snip1336 .profile {
  border-radius: 50%;
  position: absolute;
  bottom: 100%;
  left: 25px;
  z-index: 1;
  max-width: 90px;
  opacity: 1;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}
.snip1336 .follow {
  margin-right: 4%;
  border-color: #2980b9;
  color: #2980b9;
}
.snip1336 h2 {
  margin: 0 0 5px;
  font-weight: 300;
}
.snip1336 h2 span {
  display: block;
  font-size: 0.5em;
  color: #2980b9;
}
.snip1336 p {
  margin: 0 0 10px;
  font-size: 0.8em;
  letter-spacing: 1px;
  opacity: 0.8;
}
img.profile {
  width: 80px;
  height: 80px;
  border-radius: 100%;
}
  `]
})
export class UsersCard implements OnInit {
users: any;
 @Output() checked = new EventEmitter();

  constructor(private _authService: AuthService) { }

  ngOnInit() {
     this._authService._isUsers()
    .subscribe(value => { 
     this.users = value;
     console.log(this.users);
    });
  }

}
