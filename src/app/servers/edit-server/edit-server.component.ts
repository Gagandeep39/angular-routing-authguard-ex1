import { Component, OnInit } from "@angular/core";

import { ServersService } from "../servers.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  CanDeactivateGuard,
  CanComponentDeactivate
} from "./can-deactivate-guard.service";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"]
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string };
  serverName = "";
  serverStatus = "";
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    let serverId: number;
    this.route.params.subscribe((params: Params) => {
      serverId = params["id"];
    });
    this.route.queryParams.subscribe((params: Params) => {
      this.allowEdit = params["allowEdit"] == "1" ? true : false;
    });

    this.server = this.serversService.getServer(serverId);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    console.log("allowEdit: " + this.route.snapshot.queryParams["allowEdit"]);
    console.log("Fragment: " + this.route.snapshot.fragment);
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus
    });
    this.changesSaved = true;
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  canDeactivate():
    | boolean
    | import("rxjs").Observable<boolean>
    | Promise<boolean> {

    // If Edit is disabled, then do nothing
    if (!this.allowEdit) return true;
    // If edit is enabled, then check if fields are modified 
    // If modified then show a warning when we click on other component 
    if (
      (this.serverName != this.server.name ||
        this.serverStatus != this.server.status) &&
      !this.changesSaved
    )
      return confirm("Do You want to discard changes?");
    else return true;
  }
}
