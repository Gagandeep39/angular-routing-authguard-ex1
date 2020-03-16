import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

  ngOnInit() {

    let serverId : number;
    this.route.params.subscribe((params: Params)=>{
      serverId = params['id'];
    })
    this.route.queryParams.subscribe((params: Params)=>{
      this.allowEdit = params['allowEdit']=='1'? true : false;
    })

    this.server = this.serversService.getServer(serverId);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    console.log("allowEdit: " + this.route.snapshot.queryParams['allowEdit'])
    console.log("Fragment: " + this.route.snapshot.fragment)
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
