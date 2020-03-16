import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }

    // Asynchrnous fetches parameter
    // Works ven when same componetn(path) is called from within 
    this.route.params.subscribe((data: Params)=>{
      this.user = {
        id: data['id'],
        name: data['name']
      }
    })
  }

  reloadData(){
    this.router.navigate(['users', 12, 'Gagan'])
  }

}
