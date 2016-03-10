import {Component} from "angular2/core";
import {bootstrap}    from 'angular2/platform/browser'
import {AutoCompComponent} from "angular2-autocomp/components";

@Component({
    selector: 'app',
    directives: [AutoCompComponent],
    template: `
        <div class="wrapper">
            <autoComp [options]="options"></autoComp>
        </div>
    `
})

export class AppComponent {

    public options = {
        minLength: 1,
        data: ['psa', 'mar', 'afas', 'asf', 'arw', 'asdcyx' , 'wepš', 'pero', 'filip', 'flop', 'klop']
    }

}

bootstrap(AppComponent);