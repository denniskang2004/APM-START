import { Component } from "@angular/core";
import{IProduct} from './product'
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import {ProductService} from './product.service';


@Component({
    selector:'pm-products', // can be used as a directivate
    templateUrl:'./products-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductionListComponent implements OnInit{
    private title:string = 'Products List';
    private imageWidth:number = 30;
    private imageHight:number = 30;
    private imageMargin:number = 2;
    private showImage:boolean = false; 
    private filteredProducts:IProduct[];
    private errMsg:string;
    //private listFilter:string = 'cart';//replaced by setter/getter



    private _listfilter:string;
    get listFilter(){
        return this._listfilter;
    }
    set listFilter(value:string){
        this._listfilter = value; 
        this.filteredProducts = this.listFilter?this.performFilter(this.listFilter):this.products;
    }

    private products:IProduct [];
    
    // [
    //     {
    //         "productId": 1,
    //         "productName": "Leaf Rake",
    //         "productCode": "GDN-0011",
    //         "releaseDate": "March 19, 2016",
    //         "description": "Leaf rake with 48-inch wooden handle.",
    //         "price": 19.95,
    //         "starRating": 3.2,
    //         "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
    //     },
    //     {
    //         "productId": 2,
    //         "productName": "Garden Cart",
    //         "productCode": "GDN-0023",
    //         "releaseDate": "March 18, 2016",
    //         "description": "15 gallon capacity rolling garden cart",
    //         "price": 32.99,
    //         "starRating": 4.2,
    //         "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
    //     },
    //     {
    //         "productId": 5,
    //         "productName": "Hammer",
    //         "productCode": "TBX-0048",
    //         "releaseDate": "May 21, 2016",
    //         "description": "Curved claw steel hammer",
    //         "price": 8.9,
    //         "starRating": 4.8,
    //         "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
    //     },
    //     {
    //         "productId": 8,
    //         "productName": "Saw",
    //         "productCode": "TBX-0022",
    //         "releaseDate": "May 15, 2016",
    //         "description": "15-inch steel blade hand saw",
    //         "price": 11.55,
    //         "starRating": 3.7,
    //         "imageUrl": "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
    //     },
    //     {
    //         "productId": 10,
    //         "productName": "Video Game Controller",
    //         "productCode": "GMG-0042",
    //         "releaseDate": "October 15, 2015",
    //         "description": "Standard two-button video game controller",
    //         "price": 35.95,
    //         "starRating": 4.6,
    //         "imageUrl": "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
    //     }
    // ];

    // constructore needed // Service step3: dependency injection
    constructor(private _service:ProductService){
    }

    // filter
    performFilter(filterBy:string):IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product:IProduct)=>
    product.productName.toLocaleLowerCase().indexOf(filterBy)!==-1);
    }

    // events
    private toggleImage():void{
        this.showImage = !this.showImage;
    }
    
    ngOnInit():void{
        console.log('ngOnit.....');
        this._service.getProducts() // subscribe observable
            .subscribe(products =>{ // asynchronous call, similar to promise.then 
                this.products = products;
                this.filteredProducts = this.products // assign only when comes back 
            }, 
                        error=> this.errMsg = <any>error); 

        
    }

    // get from nested component
    onRatingClick(msg:string):void{
        this.filteredProducts = this.products;
        this.title = ' Product List: ' + msg;
    }
    // get from nested component
    onRatingDoubleClick(num:number):void{
        this.title = this.title + ":" + num;
    }
}