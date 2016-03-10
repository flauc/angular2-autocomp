import {Component} from "angular2/core";
@Component({
    selector: 'autoComp',
    inputs: ['options'],
    template: `
        <div class="autoComp">
            <input [type]="type" [(ngModel)]="theValue" (ngModelChange)="onChange($event)">
            <div class="autoComp-data-wrapper">
                <div class="autoComp-item" *ngFor="#d of foundData" (click)="onSelect(d)">
                    {{d}}
                </div>
            </div>
        </div>
    `,
    styles: [`
        .autoComp {
            position: relative;
            float: left;
            width: 100%;
        }

        .autoComp input {
            width: 100%;
            float: left;
        }

        .autoComp-data-wrapper {
            position: absolute;
            top: 100%;
            width: 100%;
            height: 200px;
            left: 0;
            opacity: 1;
            background: #f5f5f5;
        }

        .autoComp-item {
            width: 100%;
            float: left;
        }
    `]
})

export class AutoCompComponent {

    ngOnInit() {
        this.attachChanges();
        if(this.initialValue) this.theValue = this.initialValue;
        this.isArray = typeof this.data[0] != 'object';

        console.log('init values: ', this.minLength);
        console.log('init values: ', this.contains);
    }

    // Outputs

    // Inputs
    private options: any;
    private data: any;
    private minLength: number = 2;
    private contains: boolean = false;

    public type: string = 'text';
    public initialValue: any;

    // When working with objects
    private searchBy: any;


    // Locals
    private isArray: boolean;

    public theValue: any;
    public foundData: any = [];

    onChange(event) {
        this.foundData = [];                                        // Clear the foundData when data changes
        this.queryArray(event);                                     // When working with arrays
    }

    onSelect(item) {
        this.foundData = [];
        this.theValue = item;
    }

    queryArray(event) {
        if(event.length >= this.minLength) {
            this.data.forEach(a=> {
                if(this.contains && a.search(event) > -1) this.foundData.push(a);
                else if(!this.contains && a.search(event) == 0) this.foundData.push(a);
            })
        }
    }

    // Attach all the changes received in the options object
    attachChanges() {
        let keys = Object.keys(this.options);
        keys.forEach(a=>{
            switch (a) {
                case 'data':
                    this.data = this.options.data;
                    break;
                case 'minLength':
                    this.minLength = this.options.minLength;
                    break;
                case 'searchBy':
                    this.searchBy = this.options.searchBy;
                    break;
                case 'type':
                    this.type = this.options.type;
                    break;
                case 'contains':
                    this.contains = this.options.contains;
                    break;
                case 'initialValue':
                    this.initialValue = this.options.initialValue;
                    break;
                default:
                    console.error("You have added an object to the options object that isn't supported.");
                    break;
            }
        })
    }
}