import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

// Add a Service 3 steps:
// define a class and marked as @Injectable (productionService class)
// register this service class in appComponent for all other components in this module (app.component.ts)
// use this class in constructor for DI (product-list.component.ts)


// Use Http steps:
// setup: add HttpclientModule to import, register HttpClientModule(app.module.ts)
// Service: Send an http Request (ProductService) steps: , URL, import httpClient, DI to constructor, call http.get
// Service: add exception for http request (ProductService)
// Component that uses this  service: subscrible to observable (product-list.component, ngOnInit function)



// service step1: define the service class
@Injectable()
export class ProductService{

    private _productUrl = './api/products/products.json';

    constructor(private _http:HttpClient){}

    getProducts():Observable<IProduct[]>{
        return this._http.get<IProduct[]>(this._productUrl)
            .do(data=>console.log('all:'+JSON.stringify(data)))
            .catch(this.handleError);

    }

    private handleError(err:HttpErrorResponse){
        console.log(err.message);
        return Observable.throw(err.message);
    }
}