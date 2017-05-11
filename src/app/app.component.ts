import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <h1>Hello {{name}}</h1>
    <button (click)="clicked()">Click me</button>
    `,
})
export class AppComponent {
    name = 'Angular 4';
    clicked(event: any) {
        alert('Cliked.');
    }
}