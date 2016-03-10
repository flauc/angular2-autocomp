import {Component} from "angular2/core";
@Component({
    selector: 'autoComp',
    inputs: ['options'],
    template: `
        <div class="autoComp">
            <input [type]="type" [(ngModel)]="theValue" (ngModelChange)="onChange($event)">
            <div class="autoComp-data-wrapper">
                <div class="autoComp-item" *ngFor="#d of foundData">
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
        this.isArray = typeof this.data[0] != 'object';
    }

    // Outputs

    // Inputs
    private options: any;
    private data: any;
    private minLength: number = 2;
    private searchBy: any;

    public type: string = 'text';


    // Locals
    private isArray: boolean;

    public theValue: any;
    public foundData: any = [];

    onChange(event) {
        // Clear the foundData when data changes
        this.foundData = [];
        if(event.length > this.minLength) {
            this.data.forEach(a=> {
                console.log(a.search(event));
                if(a.search(event) > -1) this.foundData.push(a);
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
                default:
                    console.error("You have added an object to the options object that isn't supported.");
                    break;
            }
        })
    }

}