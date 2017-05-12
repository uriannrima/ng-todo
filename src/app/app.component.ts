import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.template.html',
})
export class AppComponent {
    name = 'Angular 4';
    clicked(event: any) {
        alert('Cliked.');
        console.log(event);
    }
}