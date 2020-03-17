import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  status = false;

  constructor(private router : Router, private authService: AuthService) { }

  ngOnInit() {
  }

  // Dynamic Routing
  loadServers(){
    this.router.navigate(['/servers']);
  }

  loadServersWithParamsQuery(id: number){
    this.router
    .navigate(['servers', id, 'edit'], {queryParams: {allowEdit: true}, fragment: 'loading'})
  }

  logIn(){
    this.authService.logIn();
    this.status = true;
  }

  logOut(){
    this.authService.logOut();
    this.status = false;
  }

}
