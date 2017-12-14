import { Component, OnChanges,Input,EventEmitter,Output } from "@angular/core";


@Component({
    selector:'pm-star',
    templateUrl:'./star.component.html',
    styleUrls:['./star.component.css']
})

export class StarComponent implements OnChanges{
    @Input() rating:number = 4; // get from container as a property binding
    @Input() filterFromProductList:string ;
    starWidth: number ;

    // define event to pass to container
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();
    @Output() varOutput:EventEmitter<number> = new EventEmitter<number>();

    ngOnChanges():void{
        this.starWidth = this.rating*86/5;
        console.log('star component got filter from container: '+ this.filterFromProductList);
    }

    onClick():void{
        console.log('rating: '+ this.rating+ ' was clicked' );
        // send out to container
        this.ratingClicked.emit('rating: '+ this.rating+ ' was clicked' );     
        
    }

    onDoubleClick():void{
        console.log('star component got filter from container: '+ this.filterFromProductList);   
        this.varOutput.emit(Math.random());
    }
}