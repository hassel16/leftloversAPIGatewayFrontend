import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Config } from '../../models/config';
import { Router } from '../../models/router';
import { Serviceinstance } from '../../models/serviceinstance';
import { Servicelist } from '../../models/servicelist';

@Injectable()
export class RouterService {

  constructor(public http: HttpClient) {
  }

  testService(serviceName:String){
    let url = `${Config.gatewayAddress}/${serviceName}/health`;
    return this.http.get(url)
  }

  testServiceInstance(serviceName:String, serviceinstance:Serviceinstance){
    let url = `${serviceinstance.serviceUrl}:${serviceinstance.servicePort}/${serviceName}/health`;
    return this.http.get(url)
  }

  testServiceList(serviceList:Servicelist){
    serviceList.serviceInstances.forEach(serviceInstances => {
      let url = `${serviceInstances.serviceUrl}/${serviceList.serviceName}/health`;
      return this.http.get(url)
    });

  }

  getRouter():Observable<any> {
    let url = `${Config.gatewayAddress}/APIGateway/ServiceRegister`;
    return this.http.get(url);
  }

  deleteServiceInstance(serviceName:String,serviceInstanceId:number):Observable<any> {
    let url = `${Config.gatewayAddress}/APIGateway/ServiceRegister/${serviceName}/${serviceInstanceId}?password=leftlovers_wwi16B3`;
   return this.http.delete(url);
  }
}
