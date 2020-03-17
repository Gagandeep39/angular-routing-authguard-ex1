import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServersService } from './servers/servers.service';

interface Server{
  id: number;
  name: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServerResolverService implements Resolve<Server>{

  constructor(private route: ActivatedRouteSnapshot, private router: RouterStateSnapshot, private service: ServersService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Server | Observable<Server> | Promise<Server> {
    return this.service.getServer(+route.params['id']);
  }
}
