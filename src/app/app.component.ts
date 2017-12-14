import { Component } from "@angular/core";
import {ProductService} from './products/product.service';

@Component({
  selector: 'pm-root',
  template: `<div> 
  <h1> {{pageTitle}} </h1> 
  <pm-products></pm-products>
  <div>My first Component</div></div>`,
  providers:[// Service Step2: register a service in appComponent for all other components in this module
    ProductService
  ]
})
export class AppComponent{

  pageTitle:string = "Acme Product Management"
}