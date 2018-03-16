import { Component, OnInit,Input } from '@angular/core';
import { Serviceinstance } from '../../models/serviceinstance';

@Component({
  selector: 'app-serviceinstancedetails',
  templateUrl: './serviceinstancedetails.component.html',
  styleUrls: ['./serviceinstancedetails.component.css']
})
export class ServiceinstancedetailsComponent implements OnInit {
  @Input() serviceInstance: Serviceinstance;

  constructor() { }

  ngOnInit() {
  }

}
