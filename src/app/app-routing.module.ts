import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "users",
    component: UsersComponent,
    children: [
      { path: ":id/:name", component: UserComponent } // 2 parameter
    ]
  },
  // // { path: 'users/:id', component: UserComponent }, // 1 parameter
  // { path: 'users/:id/:name', component: UserComponent },  // 2 parameter
  {
    path: "servers",
    // canActivate: [AuthGuard], // Will add AuthGuard to Parent 
    canActivateChild: [AuthGuard],  // will add auth guard to childs
    component: ServersComponent,
    children: [
      { path: ":id", component: ServerComponent },
      { path: ":id/edit", component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  },
  { path: 'error-page', component: ErrorPageComponent, data: {message: 'Error Page'} }, //In data we can pass any key value pairs
  { path: "**", component: PageNotFoundComponent } // '**' implies all paths
]; //Parsed from top to bottom

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  // When we use this module in another module, exports tell what  exactly from this module is accessible to the module that imports this module
  exports: [RouterModule]
})
export class AppRoutingModule {}
