import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

  ngOnInit() {
    let currentId = this.route.snapshot.params['id'];
    // If is to simply fix routing without params i.e to fix below situation
    // Servers component has a <app-edit-server> which takes no param 
    if(currentId==null)
      currentId = 1;
    this.server = this.serversService.getServer(currentId);
  }

}
