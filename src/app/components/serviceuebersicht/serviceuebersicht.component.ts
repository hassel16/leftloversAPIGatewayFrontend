import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../services/routerService/router.service';
import { Router } from '../../models/router'
import { Serviceinstance } from '../../models/serviceinstance'
import { Servicelist } from '../../models/servicelist';

@Component({
  selector: 'app-serviceuebersicht',
  templateUrl: './serviceuebersicht.component.html',
  styleUrls: ['./serviceuebersicht.component.css']
})
export class ServiceuebersichtComponent implements OnInit {

  constructor(private routerService: RouterService) {
  }

  router: Router;

  getRouter(): void {
    this.routerService.getRouter().
      subscribe(data => {
        this.router = Object.assign(new Router(), data)
        this.testAllServices();
      });
  }
  getList(): Servicelist[] {
    return this.router.domain;
  }

  testAllServices() {
    this.router.domain.forEach(serviceList => {
      serviceList.serviceInstances.forEach(serviceInstance => {
        this.routerService.testServiceInstance(serviceList.serviceName, serviceInstance)
          .subscribe(
            (data) => { serviceInstance.available = true; },
            (error) => { serviceInstance.available = false }
          )
      })
    });
  }

  testServiceInstance(serviceName: String, serviceInstance: Serviceinstance) {
    this.routerService.testServiceInstance(serviceName, serviceInstance)
    .subscribe(
      (data) => { serviceInstance.available = true; },
      (error) => { serviceInstance.available = false }
    )
  }

  onDelete(serviceName: String, serviceInstance: Serviceinstance): void {
    this.routerService.deleteServiceInstance(serviceName, serviceInstance.serviceId).subscribe((data) => {
      this.getRouter();
    });
  }

  ngOnInit() {
    this.getRouter();
  }

}
